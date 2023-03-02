import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { Typography } from '@mui/material';

export default function FestTimeline() {

  const saturday = [
    { from: new Date(2023, 9, 23, 8, 0), to: new Date(2023, 9, 23, 18, 55), event: 'Einzelwettspiel Tambouren' },
    { from: new Date(2023, 9, 23, 9, 0), to: new Date(2023, 9, 23, 15, 30), event: 'Einzelwettspiel Pfeifer' },
    { from: new Date(2023, 9, 23, 11, 30), to: new Date(2023, 9, 23, 13, 30), event: 'Mittagessen' },
    { from: new Date(2023, 9, 23, 15, 30), to: new Date(2023, 9, 23, 16, 45), event: 'Wettspiel SoloDuo' },
    { from: new Date(2023, 9, 23, 16, 30), to: new Date(2023, 9, 23, 18, 0), event: 'Veteranenehrung' },
    { from: new Date(2023, 9, 23, 17, 0), to: new Date(2023, 9, 23, 19, 0), event: 'Nachtessen' },
    { from: new Date(2023, 9, 23, 18, 0), to: undefined, event: 'Bekanntgabe Finalteilnehmer' },
    { from: new Date(2023, 9, 23, 19, 0), to: new Date(2023, 9, 23, 20, 30), event: 'Top Ten Finale T1' },
    { from: new Date(2023, 9, 23, 19, 0), to: new Date(2023, 9, 23, 22, 0), event: 'freies Gässeln in den Gassen von Arth' },
    { from: new Date(2023, 9, 23, 20, 30), to: new Date(2023, 9, 23, 24, 0), event: 'Start Unterhaltungsabend' }
  ]

  const sunday = [
    { from: new Date(2023, 9, 24, 6, 30), to: new Date(2023, 9, 24, 8, 30), event: 'Morgenessen' },
    { from: new Date(2023, 9, 24, 8, 30), to: new Date(2023, 9, 24, 12, 0), event: 'Sektionswettspiele S1-S3' },
    { from: new Date(2023, 9, 24, 8, 53), to: new Date(2023, 9, 24, 10, 15), event: 'Sektionswettspiele Pfeifer' },
    { from: new Date(2023, 9, 24, 10, 0), to: undefined, event: 'Empfang Ehrengäste' },
    { from: new Date(2023, 9, 24, 11, 30), to: new Date(2023, 9, 24, 13, 15), event: 'Mittagessen und Bankett' },
    { from: new Date(2023, 9, 24, 11, 48), to: new Date(2023, 9, 24, 12, 55), event: 'Sektionswettspiele Tambouren und Pfeifer' },
    { from: new Date(2023, 9, 24, 13, 30), to: undefined, event: 'Bereitstellen für Festumzug' },
    { from: new Date(2023, 9, 24, 14, 0), to: undefined, event: 'Start Festumzug' },
    { from: new Date(2023, 9, 24, 16, 0), to: undefined, event: 'Rangverkündigung' },
    { from: new Date(2023, 9, 24, 16, 30), to: undefined, event: 'Abgabe Sektionspakete mit Ranglisten und Einheitspreisen' },
    { from: new Date(2023, 9, 24, 17, 0), to: undefined, event: 'Festausklang' }
  ]



  return (
    <>
      <Typography sx={{ marginTop: 2, color: '#505050' }}>
        FESTABLAUF SAMSTAG
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
          }
        }}
      >
        {saturday.map((event, i) => (
          <TimelineItem sx={{ minHeight: 45 }}>
            <TimelineOppositeContent sx={{ paddingLeft: 0 }} color="textSecondary">
              {`${event.from.getHours()}:${String(event.from.getMinutes()).padStart(2, '0')}`}{event.to && ` - ${event.to.getHours()}:${String(event.to.getMinutes()).padStart(2, '0')}`}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot variant="outlined" color="primary" />
              {i === (saturday.length - 1) || <TimelineConnector sx={{ bgcolor: 'primary.main' }} />}
            </TimelineSeparator>
            <TimelineContent sx={{ color: "#505050" }}>{event.event}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      <Typography sx={{ marginTop: 2, color: '#505050' }}>
        FESTABLAUF SONNTAG
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
          }
        }}
      >
        {sunday.map((event, i) => (
          <TimelineItem sx={{ minHeight: 45 }}>
            <TimelineOppositeContent sx={{ paddingLeft: 0 }} color="textSecondary">
              {`${event.from.getHours()}:${String(event.from.getMinutes()).padStart(2, '0')}`}{event.to && ` - ${event.to.getHours()}:${String(event.to.getMinutes()).padStart(2, '0')}`}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot variant="outlined" color="primary" />
              {i === (sunday.length - 1) || <TimelineConnector sx={{ bgcolor: 'primary.main' }} />}
            </TimelineSeparator>
            <TimelineContent sx={{ color: "#505050" }}>{event.event}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </>
  );
}
