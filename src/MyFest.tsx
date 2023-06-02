import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Autocomplete, Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, TextField } from "@mui/material";
import Papa from 'papaparse';
import { useEffect, useState } from "react";
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

const getAutocompleteOptions = (data: NameCategoryIndex): AutocompleteOption[] => {
  return Object.keys(data).map<AutocompleteOption>((key, i) => ({ label: key, value: i }));
}

type MyFestCategoryProps = {
  name: string
  participation: ParticipationEntry[]
  ondelete: () => void
}


function MyFestCategory({ name, participation, ondelete }: MyFestCategoryProps) {

  const parseTime = (time: string): string => {
    if (time.length === 3) {
      return `${time.substring(0, 1)}:${time.substring(1, 3)}`
    }
    if (time.length === 4) {
      return `${time.substring(0, 2)}:${time.substring(2, 4)}`
    }

    return time;
  }

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
          {participation.map((entry, i) => (
            <TimelineItem sx={{ minHeight: 20 }}>
              <TimelineOppositeContent sx={{ paddingLeft: 0 }} color="textSecondary">
                {parseTime(entry.zeit)}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot variant="outlined" color="primary" />
                {i === (participation.length - 1) || <TimelineConnector sx={{ bgcolor: 'primary.main' }} />}
              </TimelineSeparator>
              <TimelineContent sx={{ color: "#505050" }}>
                <strong>{entry.platz_name} ({entry.platz_abk.trim()})</strong> — {entry.jury_platz}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default function MyFest() {
  const [data, setData] = useState<NameCategoryIndex | undefined>(undefined)
  const [search, setSearch] = useState<AutocompleteOption[] | undefined>(undefined)

  const [selected, setSelected] = useState<NameCategoryIndex | undefined>(undefined)

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
    <Box sx={{ marginTop: 2 }}>
      {(data && search && selected) && <Autocomplete
        disablePortal
        onChange={(event: any, value: AutocompleteOption | null) => {
          if (value === null) {
            return
          }

          MyFestService.saveCagegory({ [value.label]: data[value.label] } as NameCategoryIndex)
          setSelected(MyFestService.getSavedCategories());
        }}
        id="search"
        options={search}
        sx={{ width: 300 }}
        renderInput={(params: any) => <TextField {...params} label="Suche deinen Namen oder Verein ..." />}
      />}

      <Box sx={{ marginTop: 2 }} />

      <Grid container spacing={2} sx={{ marginTop: 2 }} >

        {selected && Object.keys(selected).sort().map((key, i) => (
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
