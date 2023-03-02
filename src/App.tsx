import React from 'react';

import logo from './logo.png';
import teaser from './teaser.jpg';
import teaserGoldau from './teaser-goldau.jpg';
import { Box, Container, styled, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FestTimeline from './Timeline';
import Title from './Title';
import People from './People';

const Logo = styled('img')({
  width: 200
});


function App() {
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      backgroundColor: '#fefefe'
    }}>
      <Container maxWidth="md" sx={{
        paddingLeft: 5,
        overflowX: 'hidden',
        marginLeft: {
          lg: 30
        }
      }}>
        <Logo sx={{ marginTop: 5 }} src={logo} />

        <Box />
        <Typography component="span" sx={{
          marginTop: 2,
          display: 'inline-block',
          color: '#505050',
          backgroundColor: "#f7f7f7",
          borderRadius: 1.5,
          padding: 0.5,
          paddingLeft: 1.2,
          paddingRight: 1.2,
          fontSize: 19,
          fontWeight: 200
        }}>
          23. - 24. September 2023
        </Typography>

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

        Jährlich sucht der Zentralschweizerische Tambouren- und Pfeiferverband
        (ZTPV) einen Organisator für ein Jungtambouren- und Pfeiferfest.
        Dieses Jahr hat sich leider trotz intensiven Bemühungen des
        Verbandes niemand gemeldet.
        Um nach Corona ein weiteres Jahr ohne Wettspiel
        und somit ohne Ziel für die auszubildenden Tambouren- und Pfeifer
        zu verhindern, haben sich die beiden benachbarten Vereine
        Arth-Goldau und Steinen zur gemeinsamen Ausrichtung eines
        Festes entschlossen. Die Konzeption basiert auf dem
        erfolgreichen Fest von 2018 in Arth.
        Steinen steuert durch die hohe Anzahl
        Mitglieder einen entscheidenden Beitrag an Know-How und Helfern bei.
        Aus 10 Kantonen der Deutschschweiz
        (AG, BE, BL, BS, FR, LU, NW, SO, SZ, ZG)
        nehmen über 500 Jungtambouren und -Pfeifer im Alter von
        8-19 Jahren am Wettbewerb teil.

        <FestTimeline />

        <Box sx={{ marginTop: 2 }} />
        <Title title='DIE VERANSTALTER' fontSize={20} />

        Die beiden Tambourenvereine Arth-Goldau und Steinen
        haben als Trägervereine für diesen Anlass einen
        eigenen Verein mit dem Namen <Typography component="span" sx={{ color: '#505050' }}>«ARTH-STEINEN 2023»</Typography> gegründet.
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

        <Typography sx={{ marginTop: 0.5, marginBottom: 2, color: '#505050' }}>
          TAMBOURENVEREIN ARTH-GOLDAU
        </Typography>

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
        <Typography sx={{ marginTop: 0.5, marginBottom: 2, color: '#505050' }}>
          TAMBOURENVEREIN STEINEN
        </Typography>

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

        {/* FOOTER */}

        <Box sx={{ height: 60, marginTop: 6, color: '#c3c3c3' }} >
          Created with <FavoriteBorderIcon sx={{marginBottom: -0.5, height: 20}} /> by Benj Fassbind
        </Box>
      </Container>



    </Box>
  );
}

export default App;
