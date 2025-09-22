import { Add, CloudUpload, Delete } from '@mui/icons-material';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  LinearProgress,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography
} from '@mui/material';
import { Octokit } from '@octokit/rest';
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

interface FormData {
  eventName: string;
  primaryColor: string;
  zeitplanFile: File | null;
  wettspielorteFile: File | null;
  githubToken: string;
}

interface ProcessingState {
  step: number;
  message: string;
  error: string | null;
  isProcessing: boolean;
}

interface ExistingEvent {
  name: string;
  primaryColor: string;
}

const STEPS = [
  'Formulardaten validieren',
  'Excel-Dateien verarbeiten',
  'GitHub Repository vorbereiten',
  'Event-Liste aktualisieren',
  'Alle Änderungen atomisch committen'
];

export default function Admin() {
  const [existingEvents, setExistingEvents] = useState<ExistingEvent[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    eventName: '',
    primaryColor: '#3e82c4',
    zeitplanFile: null,
    wettspielorteFile: null,
    githubToken: ''
  });

  const [processing, setProcessing] = useState<ProcessingState>({
    step: 0,
    message: '',
    error: null,
    isProcessing: false
  });

  // Load events when component mounts
  useEffect(() => {
    const loadEventsFromJson = async () => {
      setIsLoadingEvents(true);
      try {
        const response = await fetch('/events.json');
        if (response.ok) {
          const events: ExistingEvent[] = await response.json();
          setExistingEvents(events);
        } else {
          console.error('Failed to load events.json');
        }
      } catch (error) {
        console.error('Error loading events from JSON:', error);
      } finally {
        setIsLoadingEvents(false);
      }
    };

    loadEventsFromJson();
  }, []); // Load events on component mount

  const handleInputChange = (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleFileChange = (field: 'zeitplanFile' | 'wettspielorteFile') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const validateForm = (): string | null => {
    if (!formData.eventName.trim()) return 'Zeitplan-Name ist erforderlich';
    if (!/^[a-z0-9-]+$/.test(formData.eventName)) return 'Zeitplan-Name darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten';
    if (!formData.primaryColor.match(/^#[0-9A-Fa-f]{6}$/)) return 'Ungültiger Hex-Farbcode';
    if (!formData.zeitplanFile) return 'Zeitplan-Datei ist erforderlich';
    if (!formData.wettspielorteFile) return 'Wettspielorte-Datei ist erforderlich';
    if (!formData.githubToken.trim()) return 'GitHub Token ist erforderlich';
    return null;
  };

  const processExcelFile = async (file: File, isZeitplan: boolean): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          if (isZeitplan) {
            // Convert to JSON first, keeping raw values to detect dates
            const json = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true });

            // Convert JSON to CSV with proper date formatting
            const csvLines: string[] = [];
            json.forEach((row: any, rowIndex: number) => {
              if (Array.isArray(row)) {
                // Process each cell in the row
                const processedRow = row.map((cell: any, colIndex: number) => {
                  // Check if this cell might be a date
                  const cellRef = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
                  const cellObj = worksheet[cellRef];

                  // If it's a number and the cell has date formatting or looks like a date serial number
                  if (typeof cell === 'number' && cellObj) {
                    // Check if it's likely a date (Excel dates are typically > 25000 for recent dates)
                    if (cell > 25000 && cell < 100000) {
                      // Convert Excel serial date to JavaScript Date
                      const excelDate = new Date((cell - 25569) * 86400 * 1000);
                      // Format as dd.mm.yyyy
                      const day = String(excelDate.getDate()).padStart(2, '0');
                      const month = String(excelDate.getMonth() + 1).padStart(2, '0');
                      const year = excelDate.getFullYear();
                      return `${day}.${month}.${year}`;
                    }
                  }

                  // Handle potential comma-containing values by quoting them
                  if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"'))) {
                    return `"${cell.replace(/"/g, '""')}"`;
                  }
                  return cell || '';
                });
                csvLines.push(processedRow.join(','));
              }
            });

            resolve(csvLines.join('\n'));
          } else {
            // Convert to JSON for wettspielorte
            const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            const wettspielorte: { [key: string]: string } = {};

            // Assuming first row is headers, skip it
            for (let i = 1; i < json.length; i++) {
              const row = json[i] as any[];
              if (row.length >= 2 && row[0] && row[1]) {
                wettspielorte[row[0]] = row[1];
              }
            }

            resolve(JSON.stringify(wettspielorte, null, 2));
          }
        } catch (error) {
          reject(new Error(`Fehler beim Verarbeiten der Excel-Datei: ${error}`));
        }
      };
      reader.onerror = () => reject(new Error('Fehler beim Lesen der Datei'));
      reader.readAsArrayBuffer(file);
    });
  };

  const getFileInfo = async (octokit: Octokit, path: string): Promise<{ content: string; sha: string } | null> => {
    try {
      const { data: file } = await octokit.rest.repos.getContent({
        owner: 'randombenj',
        repo: 'arth-steinen-23',
        path
      });

      if ('content' in file) {
        return {
          content: atob(file.content.replace(/\s/g, '')), // Use atob instead of Buffer
          sha: file.sha
        };
      }
      return null;
    } catch (error: any) {
      if (error.status === 404) {
        return null; // File doesn't exist
      }
      throw error;
    }
  };

  const deleteEvent = async () => {
    if (!formData.eventName || !formData.githubToken) {
      setProcessing(prev => ({ ...prev, error: 'Zeitplan-Name und GitHub Token sind erforderlich' }));
      return;
    }

    const confirmed = window.confirm(`Möchten Sie den Zeitplan "${formData.eventName}" wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.`);
    if (!confirmed) return;

    setIsDeleting(true);
    setProcessing({
      step: 0,
      message: `Lösche Zeitplan "${formData.eventName}"...`,
      error: null,
      isProcessing: true
    });

    try {
      const octokit = new Octokit({
        auth: formData.githubToken
      });

      // Get current events.json
      setProcessing(prev => ({ ...prev, step: 1, message: 'Lade aktuelle Event-Liste...' }));
      const eventsFileInfo = await getFileInfo(octokit, 'public/events.json');

      if (!eventsFileInfo) {
        throw new Error('events.json nicht gefunden');
      }

      const currentEvents: ExistingEvent[] = JSON.parse(eventsFileInfo.content);
      const eventExists = currentEvents.some(event => event.name === formData.eventName);

      if (!eventExists) {
        throw new Error(`Zeitplan "${formData.eventName}" nicht gefunden`);
      }

      // Get files to delete from the event folder
      setProcessing(prev => ({ ...prev, step: 2, message: 'Ermittele zu löschende Dateien...' }));
      const filesToDelete: string[] = [
        `public/${formData.eventName}/zeitplan.csv`,
        `public/${formData.eventName}/wettspielorte.json`
      ];

      // Get current commit SHA
      setProcessing(prev => ({ ...prev, step: 3, message: 'Bereite atomische Löschung vor...' }));
      const { data: ref } = await octokit.rest.git.getRef({
        owner: 'randombenj',
        repo: 'arth-steinen-23',
        ref: 'heads/master'
      });

      const currentCommitSha = ref.object.sha;

      // Get the current tree
      const { data: currentCommit } = await octokit.rest.git.getCommit({
        owner: 'randombenj',
        repo: 'arth-steinen-23',
        commit_sha: currentCommitSha
      });

      // Get the current tree contents
      const { data: currentTree } = await octokit.rest.git.getTree({
        owner: 'randombenj',
        repo: 'arth-steinen-23',
        tree_sha: currentCommit.tree.sha,
        recursive: 'true'
      });

      // Filter out files to delete and update events.json in one atomic operation
      setProcessing(prev => ({ ...prev, step: 4, message: 'Erstelle neuen Git-Tree ohne Zeitplan-Dateien...' }));

      // Update events.json content
      const updatedEvents = currentEvents.filter(event => event.name !== formData.eventName);
      const updatedEventsContent = JSON.stringify(updatedEvents, null, 2);

      // Create new tree items - exclude deleted files and update events.json
      const newTreeItems = currentTree.tree
        .filter(item => {
          // Exclude files we want to delete
          return !filesToDelete.includes(item.path || '');
        })
        .map(item => ({
          path: item.path!,
          mode: item.mode as any,
          type: item.type as any,
          sha: item.sha!
        }));

      // Add updated events.json with content (not sha)
      newTreeItems.push({
        path: 'public/events.json',
        mode: '100644',
        type: 'blob',
        content: updatedEventsContent
      } as any);

      // Create new tree atomically
      const { data: newTree } = await octokit.rest.git.createTree({
        owner: 'randombenj',
        repo: 'arth-steinen-23',
        tree: newTreeItems
      });

      // Create single atomic commit
      setProcessing(prev => ({ ...prev, step: 5, message: 'Erstelle atomischen Commit...' }));
      const { data: newCommit } = await octokit.rest.git.createCommit({
        owner: 'randombenj',
        repo: 'arth-steinen-23',
        message: `Delete zeitplan ${formData.eventName}`,
        tree: newTree.sha,
        parents: [currentCommitSha]
      });

      // Update the reference
      await octokit.rest.git.updateRef({
        owner: 'randombenj',
        repo: 'arth-steinen-23',
        ref: 'heads/master',
        sha: newCommit.sha
      });

      // Update local state
      setExistingEvents(updatedEvents);

      // Complete
      setProcessing(prev => ({
        ...prev,
        step: 5,
        message: `Zeitplan "${formData.eventName}" erfolgreich gelöscht!`,
        isProcessing: false
      }));

      // Reset form
      setFormData({
        eventName: '',
        primaryColor: '#3e82c4',
        zeitplanFile: null,
        wettspielorteFile: null,
        githubToken: formData.githubToken // Keep the token
      });

    } catch (error: any) {
      setProcessing(prev => ({
        ...prev,
        error: error.message || 'Fehler beim Löschen des Zeitplans',
        isProcessing: false
      }));
    } finally {
      setIsDeleting(false);
    }
  };

  const processForm = async () => {
    const validationError = validateForm();
    if (validationError) {
      setProcessing(prev => ({ ...prev, error: validationError }));
      return;
    }

    setProcessing({
      step: 0,
      message: 'Starte Verarbeitung...',
      error: null,
      isProcessing: true
    });

    try {
      // Step 1: Validate form
      setProcessing(prev => ({ ...prev, step: 1, message: 'Validiere Formulardaten...' }));
      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 2: Process Excel files
      setProcessing(prev => ({ ...prev, step: 2, message: 'Verarbeite Excel-Dateien...' }));
      const csvContent = await processExcelFile(formData.zeitplanFile!, true);
      const jsonContent = await processExcelFile(formData.wettspielorteFile!, false);

      // Step 3: Setup GitHub API and prepare changes
      setProcessing(prev => ({ ...prev, step: 3, message: 'Verbinde mit GitHub und bereite Änderungen vor...' }));
      const octokit = new Octokit({
        auth: formData.githubToken
      });

      // Step 4: Get current repository state for atomic operation
      setProcessing(prev => ({ ...prev, step: 4, message: 'Bereite atomische Aktualisierung vor...' }));

      // Get current commit and tree
      const { data: ref } = await octokit.rest.git.getRef({
        owner: 'randombenj',
        repo: 'arth-steinen-23',
        ref: 'heads/master'
      });

      const currentCommitSha = ref.object.sha;
      const { data: currentCommit } = await octokit.rest.git.getCommit({
        owner: 'randombenj',
        repo: 'arth-steinen-23',
        commit_sha: currentCommitSha
      });

      // Get the current tree contents
      const { data: currentTree } = await octokit.rest.git.getTree({
        owner: 'randombenj',
        repo: 'arth-steinen-23',
        tree_sha: currentCommit.tree.sha,
        recursive: 'true'
      });

      // Get current events.json
      const eventsFileInfo = await getFileInfo(octokit, 'public/events.json');
      if (!eventsFileInfo) {
        throw new Error('events.json nicht gefunden');
      }

      // Update events.json
      const currentEvents: ExistingEvent[] = JSON.parse(eventsFileInfo.content);
      const existingEventIndex = currentEvents.findIndex(event => event.name === formData.eventName);
      const isUpdate = existingEventIndex !== -1;

      if (existingEventIndex !== -1) {
        // Update existing event
        currentEvents[existingEventIndex].primaryColor = formData.primaryColor;
      } else {
        // Add new event
        currentEvents.push({
          name: formData.eventName,
          primaryColor: formData.primaryColor
        });
      }

      // Create new tree items with all changes atomically
      const newTreeItems = currentTree.tree
        .filter(item => {
          // Exclude files we're going to replace
          const pathsToReplace = [
            `public/${formData.eventName}/zeitplan.csv`,
            `public/${formData.eventName}/wettspielorte.json`,
            'public/events.json'
          ];
          return !pathsToReplace.includes(item.path || '');
        })
        .map(item => ({
          path: item.path!,
          mode: item.mode as any,
          type: item.type as any,
          sha: item.sha!
        }));

      // Add all new/updated files atomically
      newTreeItems.push(
        {
          path: `public/${formData.eventName}/zeitplan.csv`,
          mode: '100644',
          type: 'blob',
          content: csvContent
        } as any,
        {
          path: `public/${formData.eventName}/wettspielorte.json`,
          mode: '100644',
          type: 'blob',
          content: jsonContent
        } as any,
        {
          path: 'public/events.json',
          mode: '100644',
          type: 'blob',
          content: JSON.stringify(currentEvents, null, 2)
        } as any
      );

      // Step 5: Create atomic commit with all changes
      setProcessing(prev => ({ ...prev, step: 5, message: 'Erstelle atomischen Commit...' }));

      // Create new tree atomically
      const { data: newTree } = await octokit.rest.git.createTree({
        owner: 'randombenj',
        repo: 'arth-steinen-23',
        tree: newTreeItems
      });

      const commitMessage = isUpdate
        ? `Update zeitplan ${formData.eventName}`
        : `Add new zeitplan ${formData.eventName}`;

      // Create single atomic commit
      const { data: newCommit } = await octokit.rest.git.createCommit({
        owner: 'randombenj',
        repo: 'arth-steinen-23',
        message: commitMessage,
        tree: newTree.sha,
        parents: [currentCommitSha]
      });

      // Update the reference
      await octokit.rest.git.updateRef({
        owner: 'randombenj',
        repo: 'arth-steinen-23',
        ref: 'heads/master',
        sha: newCommit.sha
      });

      // Complete
      setProcessing(prev => ({
        ...prev,
        step: 5,
        message: `Zeitplan erfolgreich ${isUpdate ? 'aktualisiert' : 'erstellt'}!`,
        isProcessing: false
      }));

      // Reset form but keep eventName for the success message
      const completedEventName = formData.eventName;
      setFormData({
        eventName: '',
        primaryColor: '#3e82c4',
        zeitplanFile: null,
        wettspielorteFile: null,
        githubToken: ''
      });

      // Show success message with link after a short delay
      setTimeout(() => {
        setProcessing(prev => ({
          ...prev,
          message: `Zeitplan "${completedEventName}" wurde erfolgreich ${isUpdate ? 'aktualisiert' : 'erstellt'}! Die Änderungen werden in ca. 10 Minuten verfügbar sein.`,
          error: null
        }));
      }, 1000);    } catch (error: any) {
      setProcessing(prev => ({
        ...prev,
        error: error.message || 'Ein unbekannter Fehler ist aufgetreten',
        isProcessing: false
      }));
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 4 }}>
        Zeitplan Administration
      </Typography>

      <Card sx={{ marginBottom: 3 }}>
        <CardHeader
          title="Zeitplan erstellen oder aktualisieren"
          subheader="Lade Excel-Dateien hoch und erstelle automatisch einen neuen Zeitplan"
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                fullWidth
                freeSolo
                options={existingEvents.map(event => event.name)}
                value={formData.eventName}
                onInputChange={(event, newValue) => {
                  setFormData(prev => ({
                    ...prev,
                    eventName: newValue || ''
                  }));
                }}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'string') {
                    // Find the selected event and update color
                    const selectedEvent = existingEvents.find(event => event.name === newValue);
                    setFormData(prev => ({
                      ...prev,
                      eventName: newValue,
                      primaryColor: selectedEvent ? selectedEvent.primaryColor : prev.primaryColor
                    }));
                  }
                }}
                disabled={processing.isProcessing || isDeleting}
                loading={isLoadingEvents}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Zeitplan Name (z.B. lenzburg-25)"
                    helperText="Wähle einen bestehenden Zeitplan oder erstelle einen neuen"
                    error={!!(formData.eventName && !/^[a-z0-9-]+$/.test(formData.eventName))}
                  />
                )}
                renderOption={(props, option) => {
                  const event = existingEvents.find(e => e.name === option);
                  return (
                    <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {event && (
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            backgroundColor: event.primaryColor,
                            borderRadius: '50%',
                            border: '1px solid #ddd'
                          }}
                        />
                      )}
                      {option}
                    </Box>
                  );
                }}
              />
              {/* Delete button for existing events */}
              {formData.eventName && existingEvents.some(event => event.name === formData.eventName) && (
                <Box sx={{ marginTop: 1 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<Delete />}
                    onClick={deleteEvent}
                    disabled={processing.isProcessing || isDeleting || !formData.githubToken}
                  >
                    Zeitplan löschen
                  </Button>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="color"
                label="Primärfarbe"
                value={formData.primaryColor}
                onChange={handleInputChange('primaryColor')}
                disabled={processing.isProcessing || isDeleting}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<CloudUpload />}
                disabled={processing.isProcessing || isDeleting}
                sx={{ height: 56 }}
              >
                Zeitplan Excel hochladen
                <input
                  type="file"
                  hidden
                  accept=".xlsx,.xls"
                  onChange={handleFileChange('zeitplanFile')}
                />
              </Button>
              {formData.zeitplanFile && (
                <Typography variant="caption" color="success.main">
                  ✓ {formData.zeitplanFile.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<CloudUpload />}
                disabled={processing.isProcessing || isDeleting}
                sx={{ height: 56 }}
              >
                Wettspielorte Excel hochladen
                <input
                  type="file"
                  hidden
                  accept=".xlsx,.xls"
                  onChange={handleFileChange('wettspielorteFile')}
                />
              </Button>
              {formData.wettspielorteFile && (
                <Typography variant="caption" color="success.main">
                  ✓ {formData.wettspielorteFile.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="GitHub Personal Access Token"
                value={formData.githubToken}
                onChange={handleInputChange('githubToken')}
                helperText="Benötigt 'repo' Berechtigung für das Repository"
                disabled={processing.isProcessing || isDeleting}
              />
            </Grid>
          </Grid>

          <Box sx={{ marginTop: 3 }}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={processing.isProcessing || isDeleting ? undefined : <Add />}
              onClick={processForm}
              disabled={processing.isProcessing || isDeleting}
            >
              {processing.isProcessing || isDeleting ? 'Verarbeitung läuft...' : 'Zeitplan erstellen/aktualisieren'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {(processing.isProcessing || processing.step > 0) && (
        <Paper sx={{ padding: 3 }}>
          {!isDeleting && (
            <Stepper activeStep={processing.step - 1} sx={{ marginBottom: 2 }}>
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}

          {processing.isProcessing && <LinearProgress sx={{ marginBottom: 2 }} />}

          {processing.message && (
            <Alert
              severity={processing.step === 5 && !processing.isProcessing ? "success" : "info"}
              sx={{ marginBottom: 2 }}
            >
              {processing.message}
              {processing.step === 5 && !processing.isProcessing && processing.message.includes('wurde erfolgreich') && (
                <Box sx={{ marginTop: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    href={`/#/${processing.message.match(/"([^"]+)"/)?.[1] || ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ marginRight: 1 }}
                  >
                    Zeitplan öffnen
                  </Button>
                  <Typography variant="caption" display="block" sx={{ marginTop: 1, color: 'text.secondary' }}>
                    ⏱️ Die Änderungen werden in ca. 10 Minuten bereitgestellt.
                  </Typography>
                </Box>
              )}
            </Alert>
          )}

          {processing.error && (
            <Alert severity="error">
              {processing.error}
            </Alert>
          )}
        </Paper>
      )}

      <Card sx={{ marginTop: 3 }}>
        <CardHeader title="Anleitung" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            1. <strong>Zeitplan Name:</strong> Wähle einen bestehenden Zeitplan aus der Liste oder erstelle einen neuen im Format "ort-jahr" (z.B. lenzburg-25)<br />
            2. <strong>Zeitplan Excel:</strong> Excel-Datei mit Spalten für Datum, Zeit, Teilnehmer, etc.<br />
            3. <strong>Wettspielorte Excel:</strong> Excel-Datei mit Spalten: <b>Abkürzung, Google Maps URL</b><br />
            4. <strong>GitHub Token:</strong> Personal Access Token mit 'repo' Berechtigung für randombenj/arth-steinen-23<br />
            <br />
            Die Anwendung wird automatisch alle notwendigen Dateien erstellen und die Routen konfigurieren.
          </Typography>

          <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1 }}>
            Beispiel: Wettspielorte Excel Format
          </Typography>
          <Box component="img"
               src="/wettspielorte-sample.png"
               alt="Beispiel für Wettspielorte Excel Format"
               sx={{
                 maxWidth: '100%',
                 height: 'auto',
                 border: '1px solid #ddd',
                 borderRadius: 1,
                 marginBottom: 1
               }}
          />
          <br />
          <Typography variant="caption" color="text.secondary">
            Die Excel-Datei sollte genau zwei Spalten haben: "Abkürzung" und "Google Maps URL"
          </Typography>

          <Typography variant="h6" sx={{ marginTop: 3, marginBottom: 1 }}>
            Zeitplan in andere Website einbetten
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
            Um den Zeitplan in eine andere Website einzubetten, verwende den folgenden HTML-Code.
            <strong>Ersetze <code>{"{ZEITPLAN-JAHR}"}</code> durch den Namen deines Zeitplans (z.B. "lenzburg-25"):</strong>
          </Typography>
          <Box
            component="pre"
            sx={{
              backgroundColor: '#f5f5f5',
              padding: 2,
              borderRadius: 1,
              border: '1px solid #ddd',
              fontSize: '0.875rem',
              fontFamily: 'monospace',
              overflow: 'auto',
              whiteSpace: 'pre-wrap'
            }}
          >
{`<iframe id="zeitplan" src="https://arth-steinen-23.ch/#/ZEITPLAN-JAHR"
        style="border: 0px; min-height: 400px; height: 680px;"
        width="100%"></iframe>
<script>
window.addEventListener("message", (event) => {
  if (event.data.startsWith('resize::')) {
    const height = event.data.replace('resize::', '');
    document.getElementById('zeitplan').style.height = \`\${height}px\`;
  }
}, false);
</script>`}
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ marginTop: 1, display: 'block' }}>
            💡 Das Script sorgt dafür, dass die Höhe des iframes automatisch an den Inhalt angepasst wird.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
