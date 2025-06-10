import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator, timelineOppositeContentClasses } from "@mui/lab";
import { Autocomplete, Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, TextField, Typography } from "@mui/material";
import Papa from 'papaparse';
import { LegacyRef, useEffect, useRef, useState } from "react";
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

type MyFestCategoryProps = {
  name: string
  participation: ParticipationEntry[]
  wettspielorte: Wettspielorte
  ondelete: () => void
}

const parseTime = (time: string): string => {
  if (time.length === 3) {
    return `${time.substring(0, 1)}:${time.substring(1, 3)}`
  }
  if (time.length === 4) {
    return `${time.substring(0, 2)}:${time.substring(2, 4)}`
  }

  return time;
}

const timeToDateTime = (time: string): number => {
  if (time.length === 3) {
    return Date.parse(`2023-01-01T0${time.substring(0, 1)}:${time.substring(1, 3)}:00.000Z`)
  }
  if (time.length === 4) {
    return Date.parse(`2023-01-01T${time.substring(0, 2)}:${time.substring(2, 4)}:00.000Z`)
  }

  return Date.parse(`2023-01-01T${time}:00.000Z`);
}


function MyFestCategory({ name, participation, wettspielorte, ondelete }: MyFestCategoryProps) {
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
          {participation.sort((a, b) => timeToDateTime(a.zeit) - timeToDateTime(b.zeit)).map((entry, i) => (
            <TimelineItem sx={{ minHeight: 20 }}>
              <TimelineOppositeContent sx={{ paddingLeft: 0 }} color="textSecondary">
                {parseTime(entry.zeit)}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot variant="outlined" color="primary" />
                {i === (participation.length - 1) || <TimelineConnector sx={{ bgcolor: 'primary.main' }} />}
              </TimelineSeparator>
              <TimelineContent sx={{ color: "#505050" }}>
                <a href={wettspielorte[entry.platz_abk.trim()]} target="_blank" rel="noreferrer"><strong>{entry.platz_name} ({entry.platz_abk.trim()}) </strong></a> — {entry.jury_platz}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  )
}

type MyFestProps = {
  name: string
  timetable: string
  competitionVenues: string
}

export default function MyFest({name, timetable, competitionVenues}: MyFestProps) {
  const groupLookup = ['S1', 'S2', 'S3', 'SP']

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
      const data = Papa.parse<ParticipationEntry>(csv, {
        header: true, delimiter: ","
      }).data

      const searchableData = getSearchables(data)
      setData(searchableData);
      setSearch(getAutocompleteOptions(searchableData).sort())

      // -- load saved data from local storage
      setSelected(MyFestService.getSavedCategories(name))

    })();
  }, [setData, setSearch, setSelected, setWettspielorte, name, timetable, competitionVenues]);

  return (
    <Box>
      {(data && search && selected) && <Autocomplete
        ref={inputRef}
        key={key}
        disablePortal
        componentsProps={{
          popper: {
            modifiers: [
              {
                name: 'flip',
                enabled: false
              },
              {
                name: 'preventOverflow',
                enabled: false
              }
            ]
          }
        }}
        // onFocus={executeScroll}
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
        renderInput={(params: any) => <TextField {...params} sx={{ color: 'red' }} label="Suche deinen Namen oder Verein ..." />}
      />}

      {/* -- SAMSTAG */}
      {(selected && Object.keys(selected).filter(s => !groupLookup.includes(selected[s][0].kategorie)).length !== 0) && <Typography sx={{ fontSize: '1.2em', marginTop: 4, color: '#505050' }}>
        SAMSTAG <Box sx={{ width: '60px', borderBottom: '1px solid #8d1e1f40', marginBottom: 1 }}></Box>
      </Typography>}

      <Grid container spacing={2} sx={{ marginTop: 0 }} >

        {selected && Object.keys(selected)
          .filter(s => !groupLookup.includes(selected[s][0].kategorie))
          .sort((a, b) => timeToDateTime(selected[a][0].zeit) - timeToDateTime(selected[b][0].zeit))
          .map((key, i) => (
            <Grid item xs={12} md={6}>
              <MyFestCategory
                name={key}
                participation={selected[key]}
                wettspielorte={wettspielorte || {}}
                ondelete={() => {
                  MyFestService.removeCategory(name, { [key]: selected[key] } as NameCategoryIndex)
                  setSelected(MyFestService.getSavedCategories(name))
                }}
              />
            </Grid>
          ))}
      </Grid>

      {/* -- SONNTAG */}

      {/* <Box sx={{ marginTop: 2 }} /> */}
      {(selected && Object.keys(selected).filter(s => groupLookup.includes(selected[s][0].kategorie)).length !== 0) && <Typography sx={{ fontSize: '1.2em', marginTop: 4, color: '#505050' }}>
        SONNTAG <Box sx={{ width: '60px', borderBottom: '1px solid #8d1e1f40', marginBottom: 1 }}></Box>
      </Typography>}

      <Grid container spacing={2} sx={{ marginTop: 0 }} >

        {selected && Object.keys(selected)
          .filter(s => groupLookup.includes(selected[s][0].kategorie))
          .sort((a, b) => timeToDateTime(selected[a][0].zeit) - timeToDateTime(selected[b][0].zeit))
          .map((key, i) => (
            <Grid item xs={12} md={6}>
              <MyFestCategory
                name={key}
                participation={selected[key]}
                wettspielorte={wettspielorte || {}}
                ondelete={() => {
                  MyFestService.removeCategory(name, { [key]: selected[key] } as NameCategoryIndex)
                  setSelected(MyFestService.getSavedCategories(name))
                }}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  )
}
