import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { Typography } from '@mui/material';

export default function Umzug() {

  const participants = [
    { number: 1, name: 'TV Arth-Goldau' },
    { number: 2, name: 'TV Steinen' },
    { number: 3, name: 'Jungtambouren Baar - Hünenberg' },
    { number: 4, name: 'Naarebaschi Clique Basel' },
    { number: 5, name: 'TV der Stadt Luzern' },
    { number: 6, name: 'Knaben- und Mädchenmusik Basel' },
    { number: 7, name: 'Tambouren Ennetbürgen' },
    { number: 8, name: 'TV Rothrist' },
    { number: 9, name: 'Tambouren- und Pfeiferschule Region Liestal' },
    { number: 10, name: 'Drumpact' },
    { number: 11, name: 'TV Erlinsbach' },
    { number: 12, name: 'TV Zofingen' },
    { number: 13, name: 'Opti-Mischte Basel' },
    { number: 14, name: 'TV Schwyz' },
    { number: 15, name: 'Barbara Club 1902' },
    { number: 16, name: 'TV Lenzburg' },
    { number: 17, name: 'Fasnachtsclique Junteressli' },
    { number: 18, name: 'TV Solothurn' },
    { number: 19, name: 'Basler Trommelakademie' },
    { number: 20, name: 'Musikgesellschaft Arth' },
    { number: 21, name: 'TV Langenthal' },
    { number: 22, name: 'TV Biberist' },
    { number: 23, name: 'Fasnachtsgesellschaft Olympia 1908' },
    { number: 24, name: 'TV Laupersdorf-Thal' },
    { number: 25, name: 'TV Murten' },
    { number: 26, name: 'Alti Stainlemer 1912 ' },
    { number: 27, name: 'Fasnachtzunft Ryburg' },
    { number: 28, name: 'Basler Bebbi Basel' },
    { number: 29, name: 'TV Oberentfelden Muhen' },
    { number: 30, name: 'Wurlitzer-Clique Zunzgen' },
    { number: 31, name: 'TV Kirchberg' },
    { number: 32, name: 'Tambouren Mümliswil-Ramiswil' },
    { number: 33, name: 'UFS Basel' },
  ]



  return (
    <>
      <Typography sx={{ marginTop: 2, color: '#505050' }}>
        REIHENFOLGE UMZUG
      </Typography>

      <Timeline
        sx={{
          padding: 0,
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.6,
          },
          [`& .MuiTimelineOppositeContent-root`]: {
            width: 100,
            flex: 'none'
          },
          [`& .MuiTypography-root`]: {
            paddingTop: 0,
          }
        }}
      >
        {participants.map((participant, i) => (
          <TimelineItem sx={{ minHeight: 10 }}>
            <TimelineOppositeContent sx={{ paddingLeft: 0 }} color="textSecondary">
              {participant.number}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot variant="outlined" color="primary" sx={{padding: 0}}/>
              {/* {i === (participants.length - 1) || <TimelineConnector sx={{ bgcolor: 'primary.main' }} />} */}
            </TimelineSeparator>
            <TimelineContent sx={{ color: "#505050" }}>
              {participant.name}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

    </>
  );
}
