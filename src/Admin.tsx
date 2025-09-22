import { Add, CloudUpload } from '@mui/icons-material';
import {
  Alert,
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
import React, { useState } from 'react';
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

const STEPS = [
  'Formulardaten validieren',
  'Excel-Dateien verarbeiten',
  'GitHub Repository vorbereiten',
  'Route zu index.tsx hinzufügen',
  'Alle Änderungen atomisch committen'
];

export default function Admin() {
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
    if (!formData.eventName.trim()) return 'Event-Name ist erforderlich';
    if (!/^[a-z0-9-]+$/.test(formData.eventName)) return 'Event-Name darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten';
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
            // Convert to CSV
            const csv = XLSX.utils.sheet_to_csv(worksheet);
            resolve(csv);
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

  const updateIndexFile = (currentContent: string, eventName: string, primaryColor: string): string => {
    // Find the router configuration and add new route
    const routerStart = currentContent.indexOf('const router = createHashRouter([');
    const routerEnd = currentContent.indexOf(']);', routerStart);

    if (routerStart === -1 || routerEnd === -1) {
      throw new Error('Router-Konfiguration nicht gefunden');
    }

    const beforeRouter = currentContent.substring(0, routerEnd);
    const afterRouter = currentContent.substring(routerEnd);

    // Check if route already exists
    if (currentContent.includes(`path: "/${eventName}"`)) {
      // Update existing route
      const routeRegex = new RegExp(
        `{\\s*path:\\s*"/${eventName}",[^}]*}`,
        'g'
      );

      const newRoute = `{
    path: "/${eventName}",
    element: <DigitalTimeguide
      primaryColor='${primaryColor}'
      name='${eventName}'
      timetable='/${eventName}/zeitplan.csv'
      competitionVenues='/${eventName}/wettspielorte.json'
    />
  }`;

      return currentContent.replace(routeRegex, newRoute);
    } else {
      // Add new route
      const newRoute = `,
  {
    path: "/${eventName}",
    element: <DigitalTimeguide
      primaryColor='${primaryColor}'
      name='${eventName}'
      timetable='/${eventName}/zeitplan.csv'
      competitionVenues='/${eventName}/wettspielorte.json'
    />
  }`;

      return beforeRouter + newRoute + afterRouter;
    }
  };

  interface FileChange {
    path: string;
    content: string;
    sha?: string;
  }

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

  const createAtomicCommit = async (octokit: Octokit, changes: FileChange[], commitMessage: string): Promise<void> => {
    try {
      // Get the current commit SHA
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

      // Create tree items for all changes
      const treeItems = changes.map(change => ({
        path: change.path,
        mode: '100644' as const,
        type: 'blob' as const,
        content: change.content // GitHub API accepts string content directly
      }));

      // Create new tree
      const { data: newTree } = await octokit.rest.git.createTree({
        owner: 'randombenj',
        repo: 'arth-steinen-23',
        tree: treeItems,
        base_tree: currentCommit.tree.sha
      });

      // Create new commit
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
    } catch (error) {
      throw new Error(`Fehler beim Erstellen des Commits: ${error}`);
    }
  };    const processForm = async () => {
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

      // Prepare all file changes
      const changes: FileChange[] = [
        {
          path: `public/${formData.eventName}/zeitplan.csv`,
          content: csvContent
        },
        {
          path: `public/${formData.eventName}/wettspielorte.json`,
          content: jsonContent
        }
      ];

      // Step 4: Get current index.tsx and prepare update
      setProcessing(prev => ({ ...prev, step: 4, message: 'Aktualisiere Routen...' }));
      const indexFileInfo = await getFileInfo(octokit, 'src/index.tsx');

      if (indexFileInfo) {
        const updatedIndexContent = updateIndexFile(
          indexFileInfo.content,
          formData.eventName,
          formData.primaryColor
        );

        // Only add index.tsx to changes if it actually changed
        if (updatedIndexContent !== indexFileInfo.content) {
          changes.push({
            path: 'src/index.tsx',
            content: updatedIndexContent,
            sha: indexFileInfo.sha
          });
        }
      } else {
        throw new Error('index.tsx nicht gefunden');
      }

      // Step 5: Create atomic commit with all changes
      setProcessing(prev => ({ ...prev, step: 5, message: 'Committe alle Änderungen...' }));
      const isUpdate = indexFileInfo.content.includes(`path: "/${formData.eventName}"`);
      const commitMessage = isUpdate
        ? `Update event ${formData.eventName}`
        : `Add new event ${formData.eventName}`;

      await createAtomicCommit(octokit, changes, commitMessage);

      // Complete
      setProcessing(prev => ({
        ...prev,
        step: 5,
        message: `Event erfolgreich ${isUpdate ? 'aktualisiert' : 'erstellt'}!`,
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
          message: `Event "${completedEventName}" wurde erfolgreich ${isUpdate ? 'aktualisiert' : 'erstellt'}! Die Änderungen werden in ca. 10 Minuten verfügbar sein.`,
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
        Event Administration
      </Typography>

      <Card sx={{ marginBottom: 3 }}>
        <CardHeader
          title="Zeitplan erstellen oder aktualisieren"
          subheader="Lade Excel-Dateien hoch und erstelle automatisch ein neues Event"
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Event Name (z.B. lenzburg-25)"
                value={formData.eventName}
                onChange={handleInputChange('eventName')}
                helperText="Nur Kleinbuchstaben, Zahlen und Bindestriche"
                disabled={processing.isProcessing}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="color"
                label="Primärfarbe"
                value={formData.primaryColor}
                onChange={handleInputChange('primaryColor')}
                disabled={processing.isProcessing}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<CloudUpload />}
                disabled={processing.isProcessing}
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
                disabled={processing.isProcessing}
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
                disabled={processing.isProcessing}
              />
            </Grid>
          </Grid>

          <Box sx={{ marginTop: 3 }}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={processing.isProcessing ? undefined : <Add />}
              onClick={processForm}
              disabled={processing.isProcessing}
            >
              {processing.isProcessing ? 'Verarbeitung läuft...' : 'Event erstellen/aktualisieren'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {(processing.isProcessing || processing.step > 0) && (
        <Paper sx={{ padding: 3 }}>
          <Stepper activeStep={processing.step - 1} sx={{ marginBottom: 2 }}>
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

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
                    Event öffnen
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
            1. <strong>Event Name:</strong> Verwende das Format "ort-jahr" (z.B. lenzburg-25)<br />
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
        </CardContent>
      </Card>
    </Box>
  );
}
