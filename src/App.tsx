import React from 'react';

import logo from './logo.png';
import teaser from './teaser.jpg';
import teaserGoldau from './teaser-goldau.jpg';
import kantonSchwyz from './sponsoren/kanton-schwyz.png';
import gemeindeArth from './sponsoren/gemeinde-arth.png';
import bezirkSchwyz from './sponsoren/kulturkommission.png';
import szkb from './sponsoren/szkb.png';
import victorinox from './sponsoren/victorinox.png';

import schlegel from './piccolo_trommelschlegel.png'

import { Box, Button, Container, Divider, styled, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FestTimeline from './Timeline';
import Title from './Title';
import People from './People';

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
        overflowX: 'hidden',
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

        <Button sx={{ marginTop: 1 }} variant="outlined" href='mailto:info@arth-steinen-23.ch'>
          <MailOutlineIcon sx={{ marginRight: 1 }} />
          <Typography sx={{
            fontSize: 16
          }}>Kontakt</Typography>
        </Button>

        {/* <Box sx={{
          marginTop: 2,
          padding: 2,
          marginRight: -2,
          height: '500px'
        }}>
          TODO: (mein fest)
        </Box> */}



        {/* CONTENT */}
        <Box sx={{ marginTop: 4 }} />
        <Title title='DAS FEST' fontSize={20} />

        J??hrlich sucht der Zentralschweizerische Tambouren- und Pfeiferverband
        (ZTPV) einen Organisator f??r ein Jungtambouren- und Pfeiferfest.
        Dieses Jahr hat sich leider trotz intensiven Bem??hungen des
        Verbandes niemand gemeldet.
        Um nach Corona ein weiteres Jahr ohne Wettspiel
        und somit ohne Ziel f??r die auszubildenden Tambouren- und Pfeifer
        zu verhindern, haben sich die beiden benachbarten Vereine
        Arth-Goldau und Steinen zur gemeinsamen Ausrichtung eines
        Festes entschlossen. Die Konzeption basiert auf dem
        erfolgreichen Fest von 2018 in Arth.
        Steinen steuert durch die hohe Anzahl
        Mitglieder einen entscheidenden Beitrag an Know-How und Helfern bei.
        Aus 10 Kantonen der Deutschschweiz
        (AG, BE, BL, BS, FR, LU, NW, SO, SZ, ZG)
        nehmen ??ber 500 Jungtambouren und -Pfeifer im Alter von
        8-19 Jahren am Wettbewerb teil.


        <FestTimeline />

        <Box sx={{ marginTop: 2 }} />
        <Title title='DIE VERANSTALTER' fontSize={20} />

        Die beiden Tambourenvereine Arth-Goldau und Steinen
        haben als Tr??gervereine f??r diesen Anlass einen
        eigenen Verein mit dem Namen <Typography component="span" sx={{ color: '#505050' }}>??ARTH-STEINEN 2023??</Typography> gegr??ndet.
        Die Zusammenarbeit ??ber Vereinsgrenzen mit einem kurzen Organisationszeitraum hat Signalwirkung.

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

        <Typography sx={{ marginTop: 0.5, marginBottom: 2, color: '#505050' }}>
          TAMBOURENVEREIN ARTH-GOLDAU
        </Typography>

        Der Tambourenverein Arth-Goldau wurde 1993 offiziell gegr??ndet.
        2006 erfolgte erstmals die Teilnahme an einem Eidgen??ssischen.
        In den Folgejahren besuchte der Verein zahlreiche regionale und alle
        eidgen??ssischen Anl??sse (Wettk??mpfe) und kehrte mit besten Rangergebnissen zur??ck.
        2018 organisierte der Verein erstmals ein Zentralschweizerisches Jungtambouren- und Pfeiferfest
        f??r rund 500 Wettspieler in Arth. Punkto Organisation und Festfieber im Dorf Arth setzte das
        Fest neue Massst??be. Derzeit spielen 15 Aktivtambouren im Verein mit,
        14 Musiksch??ler werden ausgebildet.

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
        <Typography sx={{ marginTop: 0.5, marginBottom: 2, color: '#505050' }}>
          TAMBOURENVEREIN STEINEN
        </Typography>

        Der Tambourenverein Steinen wurde im Jahr 1969 gegr??ndet.
        Der Ursprung f??r die damalige Vereinsgr??ndung basierte auf der Tatsache,
        dass es bei der Rekrutierung von Tambouren f??r die Steiner Fasnacht Probleme gab.
        Die Fasnacht spielte nat??rlich nicht nur bei der Entstehung des
        Tambourenvereins eine massgebliche Rolle, sie bildet auch heute noch einen wichtigen
        Bestandteil des Vereinslebens. Steinen hat sich dank konstant starker
        Wettspielresultate bei den Jungtambouren und den Erwachsenen einen
        hervorragenden Ruf in der Trommelszene erarbeitet und z??hlt seit
        Jahren zu den st??rksten Tambourenkorps der Schweiz.
        Letztmals organisierte Steinen 2021 ein ZJTPF.
        Heute trommeln 27 Aktivmitglieder mit und es werden 47 Trommelsch??ler unterrichtet.

        <Box sx={{ marginTop: 1, marginBottom: 2 }}>
          <a href="https://tambouren-steinen.ch" target="_blank" rel="noreferrer">tambouren-steinen.ch</a>
        </Box>

        <Title title='DAS ORGANISATIONSKOMITEE' fontSize={20} />

        <People />

        <Box sx={{ marginTop: 2 }} />
        <Title title='UNTERST??TZT DURCH' fontSize={20} />

        Vielen Dank f??r die Unterst??tzung!

        <Typography sx={{ marginBottom: 2, marginTop: 2, color: '#505050' }}>
          ??FFENTLICHE HAND
        </Typography>

        <img src={kantonSchwyz} alt="Kanton Schwyz (Lotteriefonds)" style={{ width: 200 }} />
        <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

        <img src={gemeindeArth} alt="Gemeinde Arth" style={{ width: 200 }} />
        <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

        <img src={bezirkSchwyz} alt="Bezirk Schwyz" style={{ width: 200 }} />
        <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

        <Typography sx={{ marginBottom: 2, marginTop: 2, color: '#505050' }}>
          GOLDSPONSOREN
        </Typography>

        <img src={szkb} alt="Schwyzer Kantonalbank" style={{ width: 200 }} />
        <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

        <img src={victorinox} alt="Victorinox" style={{ width: 200 }} />
        <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

        <Box sx={{ marginTop: 3 }} />
        <Button sx={{ marginTop: 1 }} variant="outlined" href='mailto:info@arth-steinen-23.ch'>
          <MailOutlineIcon sx={{ marginRight: 1, fontSize: 16 }} />
          <Typography sx={{
            fontSize: 16
          }}>Jetzt G??nner werden!</Typography>
        </Button>


        {/* FOOTER */}

        <Box sx={{ height: 60, marginTop: 6, color: '#c3c3c3' }} >
          Created with <FavoriteBorderIcon sx={{ marginBottom: -0.5, height: 20 }} /> by Benj Fassbind
        </Box>
      </Container>



    </Box>
  );
}

export default App;
