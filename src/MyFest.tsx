import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Autocomplete, Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, TextField, Typography } from "@mui/material";
import Papa from 'papaparse';
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import MyFestService, { NameCategoryIndex, ParticipationEntry } from "./my-fest-service";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator, timelineOppositeContentClasses } from "@mui/lab";


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

    // if (entry.kategorie.trim().endsWith('F')) {
    //   return // ignore finale entries
    // }

    if (names[name] === undefined) {
      names[name] = []
    }
    names[name].push(entry)
  })

  return names

}

const navigationLookup = {
  'J1': 'https://maps.app.goo.gl/2nHQ9ooQeC3XbBtL7',
  'J2': 'https://maps.app.goo.gl/dt7wWBCFWV31ESSv7',
  'J3': 'https://maps.app.goo.gl/b1V5oZeSp67xYk8a8',
  'J4': 'https://maps.app.goo.gl/vLBxZq5ehsMXmJqY9',
  'J5': 'https://maps.app.goo.gl/np5FoUguJnTcZ1ce6',
  'J6': 'https://maps.app.goo.gl/cuESMrSdRD3bHPzA8',
  'J7': 'https://maps.app.goo.gl/2nHQ9ooQeC3XbBtL7',
  'J8': 'https://maps.app.goo.gl/h2MaLZduUU1hyEEGA',
  'J9': 'https://maps.app.goo.gl/2nHQ9ooQeC3XbBtL7',
  'J10': 'https://maps.app.goo.gl/np5FoUguJnTcZ1ce6',
  'J11': 'https://maps.app.goo.gl/np5FoUguJnTcZ1ce6',
  'J12': 'https://maps.app.goo.gl/np5FoUguJnTcZ1ce6',
  'J14': 'https://maps.app.goo.gl/2nHQ9ooQeC3XbBtL7',
  'J15': 'https://maps.app.goo.gl/czLr1Cz7aYASSqeA8',
  'J16': 'https://maps.app.goo.gl/czLr1Cz7aYASSqeA8'
} as { [key: string]: string }

interface AutocompleteOption {
  label: string;
}

const getAutocompleteOptions = (data: NameCategoryIndex): AutocompleteOption[] => {
  return Object.keys(data).map<AutocompleteOption>((key, i) => ({ label: key, value: i }));
}

type MyFestCategoryProps = {
  name: string
  participation: ParticipationEntry[]
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


function MyFestCategory({ name, participation, ondelete }: MyFestCategoryProps) {
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
                <a href={navigationLookup[entry.platz_abk.trim()]} target="_blank" rel="noreferrer"><strong>{entry.platz_name} ({entry.platz_abk.trim()}) </strong></a> — {entry.jury_platz}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default function MyFest() {
  const groupLookup = ['S1', 'S2', 'S3', 'SP']

  const [data, setData] = useState<NameCategoryIndex | undefined>(undefined)
  const [search, setSearch] = useState<AutocompleteOption[] | undefined>(undefined)

  const [selected, setSelected] = useState<NameCategoryIndex | undefined>(undefined)
  const [key, setKey] = useState(0);

  const inputRef = useRef<LegacyRef<typeof Autocomplete> | undefined>(undefined)

  // const executeScroll = (e: any) => {
  //   e.preventDefault();
  //   // FIXME: the setTimeout is required in chrome due to some bug
  //   // https://github.com/facebook/react/issues/23396#issuecomment-1376887787
  //   // @ts-ignore
  //   setTimeout(() => inputRef.current?.scrollIntoView({ block: 'start' }), 0)
  //   console.log('scroll?')
  // }

  useEffect(() => {
    (async () => {

      // -- load all data from api
      const csv = await (await fetch('/zeitplan.csv')).text()
      const data = Papa.parse<ParticipationEntry>(csv, {
        header: true, delimiter: ","
      }).data

      const searchableData = getSearchables(data)
      setData(searchableData);
      setSearch(getAutocompleteOptions(searchableData).sort())

      // -- load saved data from local storage
      setSelected(MyFestService.getSavedCategories())

    })();
  }, [setData, setSearch, setSelected]);

  return (
    <Box sx={{ marginTop: 4 }}>
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

          MyFestService.saveCagegory({ [value.label]: data[value.label] } as NameCategoryIndex)
          setSelected(MyFestService.getSavedCategories());

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
                ondelete={() => {
                  MyFestService.removeCategory({ [key]: selected[key] } as NameCategoryIndex)
                  setSelected(MyFestService.getSavedCategories())
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
                ondelete={() => {
                  MyFestService.removeCategory({ [key]: selected[key] } as NameCategoryIndex)
                  setSelected(MyFestService.getSavedCategories())
                }}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  )
}
