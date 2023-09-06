import { Box, styled } from '@mui/material';
import { Blacker, Title } from './Typography';


const Map = styled('iframe')({
  // marginTop: '-78px',
  border: 0,
});


const List = styled('ul')({
  listStyleType: 'none',
  paddingLeft: 6,
  [`& li`]: {
    textIndent: '-1.1em',
    marginLeft: 15,
    paddingBottom: 5
  }
});

export function LocationsLegend() {
  return (
    <>
        <Box sx={{ marginTop: 4 }} />
        <Title title='SITUATIONSPLAN' fontSize={20} />

        Anfahrt ...

        <List>
          <li>... mit dem ÖV — <a href="https://www.sbb.ch/de/bahnhof-services/am-bahnhof/bahnhoefe/bahnhof.5004.arth-goldau.html" >Bahnhof Arth-Goldau</a>.</li>
          <li>... mit dem Auto — Ausfahrt Arth (nur aus Richtung Luzern/Zürich) oder Goldau.</li>
        </List>

        <Blacker>E3 — Asco Bettwaren</Blacker> kann am Samstag von 10:00 - 14:30 nicht als Einspielort gebraucht werden.
    </>
  );
}

export default function Locations() {
  return (
    <>
      <Map src="https://www.google.com/maps/d/u/1/embed?mid=1BCXcbSCUchfzwHkv8W48Q-UJmncfa9I&hl=en&ehbc=FFFFFF" width="100%" height="720" />
    </>
  );
}
