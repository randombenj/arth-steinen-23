import { Title, Subtitle } from "./Typography";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Box, Button, Divider, Typography } from "@mui/material";

import kantonSchwyz from './sponsoren/kanton-schwyz.png';
import gemeindeArth from './sponsoren/gemeinde-arth.png';
import bezirkSchwyz from './sponsoren/kulturkommission.png';
import kantonArgau from './sponsoren/swisslos-argau.png';
import egstiftung from './sponsoren/erns-goehner-stiftung.jpg'
import szkb from './sponsoren/szkb.png'
import bauplanung from './sponsoren/bauplanung-suter.png'
import victorinox from './sponsoren/victorinox.png'
import riwag from './sponsoren/riwag.png'
import bote from './sponsoren/bote.png'
import bs from './sponsoren/swisslos-bs.jpg'
import bl from './sponsoren/swisslos-bl.jpg'
import lu from './sponsoren/swisslos-lu.png'
import importakustik from './sponsoren/import-akustik.png'
import alfacom from './sponsoren/alfacom.png'

// gaben

import alpamare from './gabensponsoren/alpamare.png'
import antik from './gabensponsoren/antik.jpg'
import avanches from './gabensponsoren/avanches.png'
import baseltattoo from './gabensponsoren/basel-tattoo.png'
import buechlertrommelbau from './gabensponsoren/buechler.png'
import dfb from './gabensponsoren/dfb.png'
import glanzmann from './gabensponsoren/glanzmann.png'
import grevitambour from './gabensponsoren/grevi-tambour.jpg'
import hochybrig from './gabensponsoren/hoch-ybrig.jpg'
import imperial from './gabensponsoren/imperial.jpg'
import migros from './gabensponsoren/migros.png'
import mythen from './gabensponsoren/mythen.jpg'
import oesch from './gabensponsoren/oesch.jpg'
import rigi from './gabensponsoren/rigi.png'
import sgv from './gabensponsoren/sgv.jpg'
import stoos from './gabensponsoren/stoos.jpg'
import swissminiatur from './gabensponsoren/swissminiatur.jpg'
import technorama from './gabensponsoren/technorama.png'
import trommelmanufaktur from './gabensponsoren/trommelmanufaktur.png'
import wasserfallen from './gabensponsoren/wasserfallen.png'
import zoobasel from './gabensponsoren/zoo-basel.png'
import zoozuerich from './gabensponsoren/zoo-zuerich.png'


const LogoDivider = () => (
  <Divider sx={{ width: 40, paddingBottom: 1, marginBottom: 3 }} component="div" />
)


export default function Sponsoring() {

  const gabensponsoren = [
    { name: 'Antik Schreinerei Ulrich Bucher', url: 'https://www.ulrichbucher.ch/', img: antik },
    { name: 'Büchler Trommelbau GmbH', url: 'https://www.trommelbau.ch/', img: buechlertrommelbau },
    { name: 'Imperial Drums GmbH ', url: 'https://www.swissdrums.com/', img: imperial },
    { name: 'Oesch Musikinstrumente AG', url: 'https://www.musikoesch.ch/', img: oesch },
    { name: 'Urs Senn' },
    { name: 'Godi und Rita Weber' },
    { name: 'Walti und Leni Fässler' },
    { name: 'Trommelmanufaktur Ostschweiz', url: 'https://www.trommelmanufaktur.ch/', img: trommelmanufaktur },
    { name: 'Grevi - Tambour', url: 'http://www.grevitambour.ch/ACCUEIL.html', img: grevitambour },
    { name: 'Schlagzeug Shop Glanzmann AG', url: 'https://www.musik-glanzmann.ch/', img: glanzmann },
    { name: 'Victorinox AG', url: 'https://www.victorinox.com/ch/de/', img: victorinox },
    { name: 'Import Akustik GmbH', url: 'https://www.import-akustik.ch/', img: importakustik },
    { name: 'Avenches Tattoo', url: 'https://avenchestattoo.ch/de/', img: avanches },
    { name: 'Basel Tattoo', url: 'https://www.baseltattoo.ch/', img: baseltattoo },
    { name: 'Zoo Basel', url: 'https://www.zoobasel.ch/de/', img: zoobasel },
    { name: 'Zoo Zürich', url: 'https://www.zoo.ch/de', img: zoozuerich },
    { name: 'Stoosbahnen AG', url: 'https://www.stoos.ch/de/', img: stoos },
    { name: 'Rotenfluebahn Mythenregion AG', url: 'https://www.mythenregion.ch/sommer/', img: mythen },
    { name: 'Swissminiatur AG', url: 'https://www.swissminiatur.ch/?lang=de', img: swissminiatur },
    { name: 'Alpamare', url: 'https://www.alpamare.ch/', img: alpamare },
    { name: 'Rigibahnen AG', url: 'https://www.rigi.ch/', img: rigi },
    { name: 'Migros-Kulturprozent', url: 'https://engagement.migros.ch/de', img: migros },
    { name: 'Ferien- und Sportzentrum Hoch-Ybrig AG', url: 'https://www.hoch-ybrig.ch/sommer/', img: hochybrig },
    { name: 'DFB Dampfbahn Furka-Bergstrecke AG', url: 'https://www.dfb.ch/de/', img: dfb },
    { name: 'Swiss Science Center Technorama', url: 'https://www.technorama.ch/de/home', img: technorama },
    { name: 'Schifffahrtsgesellschaft des Vierwaldstättersees (SGV) AG', url: 'https://www.lakelucerne.ch/de/', img: sgv },
    { name: 'Wasserfallen Bergbahnen', url: 'https://www.region-wasserfallen.ch/', img: wasserfallen },
  ]

  return (
    <>
      <Box sx={{ marginTop: 2 }} />
      <Title title='UNTERSTÜTZT DURCH' fontSize={20} />

      Vielen Dank für die Unterstützung!

      <Box sx={{ marginTop: 2 }} />

      <Box sx={{ marginTop: 5 }} />
      <Subtitle>
        GOLDSPONSOREN
      </Subtitle>

      <a href="https://szkb.ch" target="_blank" rel="noreferrer">
        <img src={szkb} alt="Schwyzer Kantonalbank" style={{ width: 200 }} />
      </a>
      <LogoDivider />

      <a href="https://victorinox.com" target="_blank" rel="noreferrer">
        <img src={victorinox} alt="Victorinox" style={{ width: 200 }} />
      </a>
      <LogoDivider />

      <a href="https://www.import-akustik.ch/import-akustik-goldau" target="_blank" rel="noreferrer">
        <img src={importakustik} alt="Import Akustik" style={{ width: 200 }} />
      </a>
      <LogoDivider />

      <Box sx={{ marginTop: 5 }} />
      <Subtitle>
        INSTITUTIONELLE SPONSOREN
      </Subtitle>

      <img src={kantonSchwyz} alt="Kanton Schwyz (Lotteriefonds)" style={{ width: 200 }} />
      <LogoDivider />

      <img src={kantonArgau} alt="Kanton Argau (Lotteriefonds)" style={{ width: 200 }} />
      <LogoDivider />

      <img src={bl} alt="Kanton Basel-Landschaft (Lotteriefonds)" style={{ width: 200 }} />
      <LogoDivider />

      <img src={bs} alt="Kanton Basel-Stadt (Lotteriefonds)" style={{ width: 200 }} />
      <LogoDivider />

      <img src={lu} alt="Kanton Luzern (Lotteriefonds)" style={{ width: 200 }} />
      <LogoDivider />

      <img src={egstiftung} alt="Ernst Göhner Stiftung" style={{ width: 200 }} />
      <LogoDivider />

      <img src={gemeindeArth} alt="Gemeinde Arth" style={{ width: 200 }} />
      <LogoDivider />

      <img src={bezirkSchwyz} alt="Bezirk Schwyz" style={{ width: 200 }} />
      <LogoDivider />

      <Box sx={{ marginTop: 5 }} />
      <Subtitle>
        SPONSOREN
      </Subtitle>

      <a href="https://www.bauplanung-suter.ch/" target="_blank" rel="noreferrer">
        <img src={bauplanung} alt="Bauplanung Suter GmbH" style={{ width: 200 }} />
      </a>
      <LogoDivider />

      <a href="https://www.riwag.ch/" target="_blank" rel="noreferrer">
        <img src={riwag} alt="Riwag Türen" style={{ width: 200 }} />
      </a>
      <LogoDivider />

      <a href="https://www.alfacom.ch/" target="_blank" rel="noreferrer">
        <img src={alfacom} alt="Alfacom" style={{ width: 200 }} />
      </a>
      <LogoDivider />

      <Box sx={{ marginTop: 5 }} />
      <Subtitle>
        MEDIENPATRONAT
      </Subtitle>

      <a href="https://www.bote.ch/" target="_blank" rel="noreferrer">
        <img src={bote} alt="Bote der Urschweiz AG" style={{ width: 200 }} />
      </a>
      <LogoDivider />

      <Box sx={{ marginTop: 5 }} />
      <Subtitle>
        GÖNNER
      </Subtitle>

      <Typography component="div" sx={{ width: 200, 'a': { textDecoration: "none" } }} >
        <a target="_blank" rel="noreferrer" href="https://www.kath-arth-goldau.ch/pfarrei/arth/georgsheim">Stiftung Pfarreiheim St. Georg, Arth</a>
      </Typography>
      <LogoDivider />

      <Typography component="div" sx={{ width: 200, 'a': { textDecoration: "none" } }} >
        <a target="_blank" rel="noreferrer" href="https://pflegezentren-arth.ch/">Stiftung Pflegezentren Gemeinde Arth</a>
      </Typography>
      <LogoDivider />

      <Typography component="div" sx={{ width: 200, 'a': { textDecoration: "none" } }} >
        <a target="_blank" rel="noreferrer" href="https://www.theaterarth.ch/">Theater Arth</a>
      </Typography>
      <LogoDivider />

      <Typography component="div" sx={{ width: 200, 'a': { textDecoration: "none" } }} >
        <a target="_blank" rel="noreferrer" href="https://www.schmidlin.ch/">Wilhelm Schmidlin AG</a>
      </Typography>
      <LogoDivider />

      <Typography component="div" sx={{ width: 200, 'a': { textDecoration: "none" } }} >
        <a target="_blank" rel="noreferrer" href="https://www.kaufmann-ag.ch/">Kaufmann AG</a>
      </Typography>
      <LogoDivider />

      <Typography component="div" sx={{ width: 200, 'a': { textDecoration: "none" } }} >
        <a target="_blank" rel="noreferrer" href="http://www.kennelgoldau.ch/getraenke.html">Kennel Getränke</a>
      </Typography>
      <LogoDivider />

      <Box sx={{ marginTop: 5 }} />
      <Subtitle>
        GABENSPONSOREN
      </Subtitle>

      {gabensponsoren.map((sponsor, index) => (
        <>
          <Typography component="div" sx={{ width: 200, 'a': { textDecoration: "none" } }} >
            {
              sponsor.url ?
                <a target="_blank" rel="noreferrer" href={sponsor.url}>
                  {sponsor.img ? <img src={sponsor.img} alt={sponsor.name} style={{ width: 200 }} /> : sponsor.name}
                </a> :
                sponsor.name
            }
          </Typography>
          <LogoDivider />
        </>
      ))}

      <Box sx={{ marginTop: 3 }} />
      <Button sx={{ marginTop: 1 }} variant="outlined" href='mailto:info@arth-steinen-23.ch'>
        <MailOutlineIcon sx={{ marginRight: 1, fontSize: 16 }} />
        <Typography sx={{
          fontSize: 16
        }}>Jetzt Gönner werden!</Typography>
      </Button>
    </>
  )
}
