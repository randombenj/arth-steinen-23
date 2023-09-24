import logo from './logo.png';
import teaser from './teaser.jpg';
import teaserGoldau from './teaser-goldau.jpg';
import schlegel from './piccolo_trommelschlegel.png'

import { Alert, Box, Button, Container, styled, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Blacker, Bolder, Subtitle, Title } from './Typography';
import People from './People';
import Sponsoring from './Sponsoring';
import DownloadIcon from '@mui/icons-material/Download';

// @ts-ignore
import festfuehrer from './data/festfuehrer.pdf';
// @ts-ignore
import rangliste from './data/rangliste.pdf'
// @ts-ignore
import jurybericht from './data/jurybericht.pdf'

// import finale from './data/finale.pdf'
import Photos from './Photos';


const Logo = styled('img')({
  width: 200
});

const Schlegel = styled('img')({});


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

        <Button sx={{ marginTop: 1 }} variant="outlined" href='mailto:info@arth-steinen-23.ch'>
          <MailOutlineIcon sx={{ marginRight: 1 }} />
          <Typography sx={{
            fontSize: 16
          }}>Kontakt</Typography>
        </Button>

        <Box sx={{ marginTop: 4 }} />


        <Alert severity="info" sx={{ marginTop: 2 }}>
          Die <Bolder>Rangliste und der Jurybericht</Bolder> können nun heruntergeladen werden:

          <Box sx={{ marginTop: 2 }}/>

          <Button sx={{
            marginTop: 1,
            marginRight: 1,
            color: 'rgb(1, 67, 97)',
            borderColor: 'rgb(1, 67, 97)',
            [`&:hover`]: {
              color: 'rgb(1, 67, 97)',
              borderColor: 'rgb(1, 67, 97)'
            }
          }} variant="outlined" href={rangliste} target='_blank'>
            <DownloadIcon sx={{ marginRight: 2 }} /><Bolder>Rangliste</Bolder>
          </Button>

          <Button sx={{
            marginTop: 1,
            marginRight: 1,
            color: 'rgb(1, 67, 97)',
            borderColor: 'rgb(1, 67, 97)',
            [`&:hover`]: {
              color: 'rgb(1, 67, 97)',
              borderColor: 'rgb(1, 67, 97)'
            }
          }} variant="outlined" href={jurybericht} target='_blank'>
            <DownloadIcon sx={{ marginRight: 2 }} /><Bolder>Jurybericht</Bolder>
          </Button>
        </Alert>

        <Box sx={{ marginTop: 4 }} />
        <Title title='VIELEN DANK!' fontSize={20} />

        <Blacker>ARTH-STEINEN 23</Blacker> ist leider schon wieder vorbei.
        Wir hoffen ihr hattet ein tolles Wochenende und konntet die Zeit mit euren Vereinskollegen geniessen.
        Auf der <a href="https://photos.app.goo.gl/ALqNcc6poSNn7oQc8" target="_blank" rel="noreferrer">Festfotogalerie</a> findet ihr noch einige Impressionen vom Fest.

        Wir bedanken uns recht herzlich bei allen Teilnehmenden für das gelungene Fest.
        <Photos />

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
