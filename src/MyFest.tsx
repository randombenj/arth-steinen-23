import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator, timelineOppositeContentClasses } from "@mui/lab";
import { Autocomplete, Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, TextField, Typography } from "@mui/material";
import Papa from 'papaparse';
import { LegacyRef, useEffect, useMemo, useRef, useState } from "react";
import MyFestService, { NameCategoryIndex, ParticipationEntry } from "./my-fest-service";


/**
 * Groups the data by name and club name
 * and returns an index of all searchable names.
 * @param data The data to group and make searchable
 */
const getSearchables = (data: ParticipationEntry[]): NameCategoryIndex => {
  const names: NameCategoryIndex = {}

  data.forEach((entry, i) => {
    if (entry.vorname === undefined || entry.name === undefined) {
      return // invalid entry
    }

    let name = `${entry.vorname.trim()} ${entry.name.trim()} (${entry.kategorie.trim()})`
    if (entry.vorname.trim() === '') {
      name = `${entry.name.trim()} (${entry.kategorie.trim()})`
    }

    if (entry.kategorie.trim().endsWith('F')) {
      return // ignore finale entries
    }

    if (names[name] === undefined) {
      names[name] = []
    }
    names[name].push(entry)
  })

  return names
}

interface AutocompleteOption {
  label: string;
}

interface Wettspielorte {
  [key: string]: string
}

const getAutocompleteOptions = (data: NameCategoryIndex): AutocompleteOption[] => {
  return Object.keys(data).map<AutocompleteOption>((key, i) => ({ label: key, value: i }));
}

const parseTime = (time: string): string => {
  if (time.includes(":")) {
    const [hours, minutes] = time.split(":");
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
  }
  if (time.length === 3) {
    return `${time.substring(0, 1)}:${time.substring(1, 3)}`
  }
  if (time.length === 4) {
    return `${time.substring(0, 2)}:${time.substring(2, 4)}`
  }

  return time;
}

const timeToDateTime = (date: string, time: string): number => {
  let month, day, year
  if (date.includes("/")) {
    [month, day, year] = date.split('/')
  } else {
    [day, month, year] = date.split('.')
  }
  const isoDateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  console.error(isoDateString)

  if (time.includes(":")) {
    const [hours, minutes] = time.split(":")
    console.log(`${isoDateString}T${hours}:${minutes}:00`)

    return new Date(`${isoDateString}T${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`).getTime();
  } else {
    if (time.length === 3) {
      return new Date(`${isoDateString}T0${time.substring(0, 1)}:${time.substring(1, 3)}:00`).getTime();
    }
    if (time.length === 4) {
      return new Date(`${isoDateString}T${time.substring(0, 2)}:${time.substring(2, 4)}:00`).getTime();
    }
  }

  return new Date(`${isoDateString}T${time}`).getTime();
}


function MyFestCategory({ name, participation, wettspielorte, ondelete }: {
  name: string
  participation: ParticipationEntry[]
  wettspielorte: Wettspielorte
  ondelete: () => void
}) {
  return (
    <Card sx={{ marginBottom: 2, height: 'calc(100% - 2px)' }}>
      <CardHeader
        sx={{
          [`& .MuiCardHeader-title`]: {
            fontSize: '1.1em',
            fontWeight: 500
          }
        }}
        avatar={
          <Avatar aria-label="recipe">
            {name[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="remove" onClick={ondelete}>
            <DeleteOutlineIcon />
          </IconButton>
        }
        title={name}
        subheader={participation[0].verein}
      />
      <CardContent sx={{ padding: 0, paddingBottom: '12px !important' }}>

        <Timeline
          sx={{
            padding: 0,
            margin: 0,
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2,
              padding: 0,
            },
            [`& .MuiTimelineOppositeContent-root`]: {
              width: 55,
              flex: 'none'
            }
          }}
        >
          {participation.sort((a, b) => timeToDateTime(a.datum, a.zeit) - timeToDateTime(b.datum, b.zeit)).map((entry, i) => (
            <TimelineItem key={i} sx={{ minHeight: 20 }}>
              <TimelineOppositeContent sx={{ paddingLeft: 0 }} color="textSecondary">
                {parseTime(entry.zeit)}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot variant="outlined" color="primary" />
                {i === (participation.length - 1) || <TimelineConnector sx={{ bgcolor: 'primary.main' }} />}
              </TimelineSeparator>
              <TimelineContent sx={{
                  color: "#505050",
                  '& a': {
                    color: 'primary.main',
                  },
                  '& a:hover': {
                    color: 'primary.light',
                  }
                }}>
                <a href={wettspielorte[entry.platz_abk.trim()]} target="_blank" rel="noreferrer"><strong>{entry.platz_name} ({entry.platz_abk.trim()}) </strong></a> — {entry.vortrag || entry.jury_platz}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  )
}

/**
 * Converts a date string (e.g., "06/15/2024") to a full weekday name in German.
 * @param dateString The date to convert.
 */
const getWeekday = (dateString: string): string => {
    let month, day, year
    if (dateString.includes("/")) {
      [month, day, year] = dateString.split('/')
    } else {
      [day, month, year] = dateString.split('.')
    }

    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('de-DE', { weekday: 'long' });
}


type FestDayProps = {
    date: string;
    entries: NameCategoryIndex;
    wettspielorte: Wettspielorte;
    onDelete: (key: string) => void;
}

/**
 * Renders the heading and grid for a single day of the festival.
 */
function FestDay({ date, entries, wettspielorte, onDelete }: FestDayProps) {
    if (Object.keys(entries).length === 0) {
        return null;
    }

    return (
        <Box>
            <Typography sx={{ fontSize: '1.2em', marginTop: 4, color: '#505050' }}>
                {getWeekday(date).toUpperCase()}
                <Box sx={{ width: '60px', borderBottom: '1px solid rgb(228, 228, 228)', marginBottom: 1 }}></Box>
            </Typography>

            <Grid container spacing={2} sx={{ marginTop: 0 }}>
                {Object.keys(entries)
                    .sort((a, b) => timeToDateTime(entries[a][0].datum, entries[a][0].zeit) - timeToDateTime(entries[b][0].datum, entries[b][0].zeit))
                    .map(key => (
                        <Grid item xs={12} md={6} key={key}>
                            <MyFestCategory
                                name={key}
                                participation={entries[key]}
                                wettspielorte={wettspielorte}
                                ondelete={() => onDelete(key)}
                            />
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
}


type MyFestProps = {
  name: string
  timetable: string
  competitionVenues: string
}

export default function MyFest({name, timetable, competitionVenues}: MyFestProps) {
  const [wettspielorte, setWettspielorte] = useState<Wettspielorte | undefined>(undefined)
  const [data, setData] = useState<NameCategoryIndex | undefined>(undefined)
  const [search, setSearch] = useState<AutocompleteOption[] | undefined>(undefined)
  const [selected, setSelected] = useState<NameCategoryIndex | undefined>(undefined)
  const [key, setKey] = useState(0);

  const inputRef = useRef<LegacyRef<typeof Autocomplete> | undefined>(undefined)

  useEffect(() => {
    (async () => {
      // -- load all data from api
      const orte = await (await fetch(competitionVenues)).json() as Wettspielorte
      setWettspielorte(orte)

      const csv = await (await fetch(timetable)).text()
      const parsedData = Papa.parse<ParticipationEntry>(csv, {
        header: true, delimiter: ","
      }).data

      const searchableData = getSearchables(parsedData)
      setData(searchableData);
      setSearch(getAutocompleteOptions(searchableData).sort((a,b) => a.label.localeCompare(b.label)))

      // -- load saved data from local storage
      setSelected(MyFestService.getSavedCategories(name))
    })();
  }, [name, timetable, competitionVenues]);


  // Group selected entries by day using useMemo for performance
  const groupedByDay = useMemo(() => {
    const groups: { [date: string]: NameCategoryIndex } = {};
    if (!selected) {
      return groups;
    }

    for (const key in selected) {
      const entryArray = selected[key];
      if (entryArray && entryArray.length > 0) {
        const date = entryArray[0].datum;
        if (!groups[date]) {
          groups[date] = {};
        }
        groups[date][key] = entryArray;
      }
    }
    return groups;
  }, [selected]);


  const handleDelete = (keyToDelete: string) => {
    if (!selected) return;
    MyFestService.removeCategory(name, { [keyToDelete]: selected[keyToDelete] } as NameCategoryIndex);
    setSelected(MyFestService.getSavedCategories(name));
  }

  // Sort the days chronologically
  const sortedDays = Object.keys(groupedByDay).sort((a, b) => timeToDateTime(a, '00:00') - timeToDateTime(b, '00:00'));

  return (
    <Box>
      {(data && search && selected) && <Autocomplete
        ref={inputRef}
        key={key}
        disablePortal
        componentsProps={{
          popper: {
            modifiers: [
              { name: 'flip', enabled: false },
              { name: 'preventOverflow', enabled: false }
            ]
          }
        }}
        onChange={(event: any, value: AutocompleteOption | null) => {
          if (value === null) {
            return
          }

          MyFestService.saveCagegory(name, { [value.label]: data[value.label] } as NameCategoryIndex)
          setSelected(MyFestService.getSavedCategories(name));

          // FIXME: this is a hack to force the component to re-render
          // and the only way to clear the input field after selecting a value
          // https://stackoverflow.com/a/59845474
          setKey(key + 1);
        }}
        id="search"
        options={search}
        sx={{ width: 300, boxShadow: '3px 4px 16px #959595', backgroundColor: 'white', borderRadius: '5px', scrollMargin: 30 }}
        renderInput={(params: any) => <TextField {...params} label="Suche deinen Namen oder Verein ..." />}
      />}

      {sortedDays.map(date => (
        <FestDay
            key={date}
            date={date}
            entries={groupedByDay[date]}
            wettspielorte={wettspielorte || {}}
            onDelete={handleDelete}
        />
      ))}

      {selected && Object.keys(selected).length === 0 && (
        <Box sx={{ marginTop: 3}}>
            <Typography sx={{
              marginTop: 1,
              color: '#505050',
              fontSize: '1em',
              maxWidth: '350px',
              fontStyle: 'italic'
            }}>
              Suche nach Einzel- oder Sektionsteilnehmern. Beim Klicken auf den Wettspielort wirst du per Maps direkt dorthin geleitet.
              <br />
              <br />
              <strong>Viel Erfolg am Wettspiel!</strong>
            </Typography>
        </Box>
      )}

      <Typography sx={{marginTop: 2, fontSize: 10}}>
        Made with <FavoriteBorderIcon sx={{ marginBottom: -0.1, marginLeft: -0.5, marginRight: -0.5, height: 12 }} /> by Benj Fassbind
      </Typography>
    </Box>
  )
}
