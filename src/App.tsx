import logo from './logo.png';
import teaser from './teaser.jpg';
import teaserGoldau from './teaser-goldau.jpg';
import schlegel from './piccolo_trommelschlegel.png'

import { Alert, Box, Button, Container, styled, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FestTimeline from './Timeline';
import { Blacker, Bolder, Subtitle, Title } from './Typography';
import People from './People';
import Sponsoring from './Sponsoring';
import Umzug from './Umzug';
import Locations, { LocationsLegend } from './Locations';
// import MyFest from './MyFest';

// @ts-ignore
import festfuehrer from './data/festfuehrer.pdf';
// @ts-ignore
import unterkunft from './data/unterkunft-id.pdf'
import MyFest from './MyFest';


const Logo = styled('img')({
  width: 200
});

const Schlegel = styled('img')({});

const List = styled('ul')({
  listStyleType: 'none',
  paddingLeft: 6,
  [`& li`]: {
    textIndent: '-1.1em',
    marginLeft: 15,
    paddingBottom: 5
  }
});

function App() {
  return (
    <Box sx={{
      width: '100%',
      height: '100%'
    }}>

      <Schlegel src={schlegel} sx={{
        position: 'fixed',
        right: '20%',
        top: 200,
        zIndex: -1,
        opacity: 0.4,
        transform: 'rotate(10deg)'
      }} />

      <Container maxWidth="md" sx={{
        paddingLeft: 5,
        marginLeft: {
          lg: 30
        }
      }}>
        <Logo sx={{ marginTop: 5, marginBottom: 2 }} src={logo} />

        <Box />
        <Button sx={{ marginTop: 1, marginRight: 2 }} variant="outlined" disabled>
          <Typography sx={{
            color: '#505050',
            fontSize: 18
          }}>23. - 24. September 2023</Typography>
        </Button>

        <Button sx={{ marginTop: 1, marginRight: 2 }} variant="outlined" href={festfuehrer} target='_blank'>
          <Typography sx={{
            fontSize: 16,
            fontWeight: 600
          }}>Festführer</Typography>
        </Button>

        <Button sx={{ marginTop: 1, marginRight: 2 }} variant="outlined" href='https://www.ztpv.ch/portfolio/zjtpf-arth-steinen-2023/' target='_blank'>
          <Typography sx={{
            fontSize: 16,
            fontWeight: 600
          }}>Zeitplan</Typography>
        </Button>

        <Button sx={{ marginTop: 1, marginRight: 2 }} variant="outlined" href={unterkunft} target='_blank'>
          <Typography sx={{
            fontSize: 16,
            fontWeight: 600
          }}>Unterkunft / Instrumentendepot</Typography>
        </Button>

        <Button sx={{ marginTop: 1 }} variant="outlined" href='mailto:info@arth-steinen-23.ch'>
          <MailOutlineIcon sx={{ marginRight: 1 }} />
          <Typography sx={{
            fontSize: 16
          }}>Kontakt</Typography>
        </Button>

        <Alert severity="info" sx={{ marginTop: 2 }}>
          Der ZTPV hat am 18. September 2023 entschieden ein <Bolder>Finalwettspiel P2</Bolder> durchzuführen.
          Als Veranstalter stellen wir kurzfristig die Juryplätze des T2 nach deren Finalwettspiel zur Verfügung.
        </Alert>

        <Box sx={{ marginTop: 4 }} />
        <Title title='DIGITALER FESTFÜHRER' fontSize={20} />
        <Box sx={{ marginTop: 2 }} />

        <MyFest />

        <Box sx={{ marginTop: 4 }} />
        <Title title='DAS FEST' fontSize={20} />

        Am Samstag, 23.9.2023 und Sonntag 24.9.2023 findet das
        Zentralschweizerische Jungtambouren- und Pfeiferfest in Arth statt. Die
        beiden Tambourenvereine Arth-Goldau und Steinen organisieren dieses
        Fest gemeinsam und haben für diesen Anlass einen eigenen Verein mit
        dem Namen <Blacker>«ARTH-STEINEN 2023»</Blacker> gegründet. Die Zusammenarbeit
        über Vereinsgrenzen mit einem kurzen Organisationszeitraum hat
        Signalwirkung.

        Es haben sich rund 600 Jungtrommler und -pfeifer aus 40 Vereinen von
        zehn Kantonen angemeldet.

        <Box sx={{ marginTop: 2 }} />
        Ein paar generelle Informationen zum Fest ...

        <List>
          <li>... bei Fragen hilft unser <Blacker>Infopoint</Blacker> bei der Turnhalle Zwygarten gerne weiter. Dieser ist ab <Blacker>7:30 Uhr</Blacker> geöffnet.</li>
          <li>... <Blacker>Individuell angepasste Gehörschütze</Blacker> können beim Import Akustik Stand gegossen werden.</li>
          <li>... die Instrumentendepot sind am <Blacker>Samstag von 7:00 Uhr - 23:00 Uhr</Blacker> und am  <Blacker>Sonntag von 6:30 Uhr - 17:00 Uhr</Blacker> geöffnet.</li>
          <li>... die Unterkunft kann ab <Blacker>Samstag, 15:00 Uhr</Blacker> bezogen werden und muss bis <Blacker>Sonntag, 9:30 Uhr</Blacker> geräumt sein. <br /><a target="_blank" href={unterkunft} rel="noreferrer"><Bolder>🛈</Bolder> Unterkunftseinteilung</a></li>
          <li>
            ... die Unterkunft ist in <a href="https://goo.gl/maps/8fG2i2E6JkDCwwiy7" target="_blank" rel="noreferrer">Oberarth</a>, zirka 2 km vom Festgelände entfernt. Sie sind entweder mit dem
            Bus in 5 Minuten oder zu Fuss in ca. 20 Minuten erreichbar.</li>
        </List>

        <LocationsLegend />
      </Container>

        <Box sx={{
          marginLeft: '308px',
          marginTop: '16px',
          marginBottom: '-60px',
          height: '60px',
          backgroundColor: 'white',
          zIndex: 1,
          position: 'relative'
        }} />

        <Locations />

      <Container maxWidth="md" sx={{
        paddingLeft: 5,
        overflowX: 'hidden',
        marginLeft: {
          lg: 30
        }
      }}>
        {/* CONTENT */}


        <FestTimeline />

        <Umzug />

        <Box sx={{ marginTop: 2 }} />
        <Title title='DIE VERANSTALTER' fontSize={20} />

        Die beiden Tambourenvereine Arth-Goldau und Steinen
        haben als Trägervereine für diesen Anlass einen
        eigenen Verein mit dem Namen <Blacker>«ARTH-STEINEN 2023»</Blacker> gegründet.
        Die Zusammenarbeit über Vereinsgrenzen mit einem kurzen Organisationszeitraum hat Signalwirkung.

        <Box sx={{
          borderRadius: 2,
          marginTop: 3,
          height: 250,
          marginRight: { xs: -4, md: 0 },
          backgroundImage: `url(${teaserGoldau})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center'
        }} />

        <Subtitle>
          TAMBOURENVEREIN ARTH-GOLDAU
        </Subtitle>

        Der Tambourenverein Arth-Goldau wurde 1993 offiziell gegründet.
        2006 erfolgte erstmals die Teilnahme an einem Eidgenössischen.
        In den Folgejahren besuchte der Verein zahlreiche regionale und alle
        eidgenössischen Anlässe (Wettkämpfe) und kehrte mit besten Rangergebnissen zurück.
        2018 organisierte der Verein erstmals ein Zentralschweizerisches Jungtambouren- und Pfeiferfest
        für rund 500 Wettspieler in Arth. Punkto Organisation und Festfieber im Dorf Arth setzte das
        Fest neue Massstäbe. Derzeit spielen 15 Aktivtambouren im Verein mit,
        14 Musikschüler werden ausgebildet.

        <Box sx={{ marginTop: 1 }}>
          <a href="http://tambourenarthgoldau.ch" target="_blank" rel="noreferrer">tambourenarthgoldau.ch</a>
        </Box>

        <Box sx={{
          borderRadius: 2,
          marginTop: 3,
          height: 250,
          marginRight: { xs: -4, md: 0 },
          backgroundImage: `url(${teaser})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center'
        }} />
        <Subtitle>
          TAMBOURENVEREIN STEINEN
        </Subtitle>

        Der Tambourenverein Steinen wurde im Jahr 1969 gegründet.
        Der Ursprung für die damalige Vereinsgründung basierte auf der Tatsache,
        dass es bei der Rekrutierung von Tambouren für die Steiner Fasnacht Probleme gab.
        Die Fasnacht spielte natürlich nicht nur bei der Entstehung des
        Tambourenvereins eine massgebliche Rolle, sie bildet auch heute noch einen wichtigen
        Bestandteil des Vereinslebens. Steinen hat sich dank konstant starker
        Wettspielresultate bei den Jungtambouren und den Erwachsenen einen
        hervorragenden Ruf in der Trommelszene erarbeitet und zählt seit
        Jahren zu den stärksten Tambourenkorps der Schweiz.
        Letztmals organisierte Steinen 2021 ein ZJTPF.
        Heute trommeln 27 Aktivmitglieder mit und es werden 47 Trommelschüler unterrichtet.

        <Box sx={{ marginTop: 1, marginBottom: 2 }}>
          <a href="https://tambouren-steinen.ch" target="_blank" rel="noreferrer">tambouren-steinen.ch</a>
        </Box>

        <Title title='DAS ORGANISATIONSKOMITEE' fontSize={20} />

        <People />

        <Sponsoring />

        {/* FOOTER */}

        <Box sx={{ height: 60, marginTop: 6, color: '#c3c3c3' }} >
          Created with <FavoriteBorderIcon sx={{ marginBottom: -0.5, height: 20 }} /> by <a href="https://github.com/randombenj/arth-steinen-23">Benj Fassbind</a>
        </Box>
      </Container>



    </Box>
  );
}

export default App;
