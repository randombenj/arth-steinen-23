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


const LogoDivider = () => (
  <Divider sx={{ width: 40, paddingBottom: 1, marginBottom: 3 }} component="div" />
)


export default function Sponsoring() {
  return (
    <>
      <Box sx={{ marginTop: 2 }} />
      <Title title='UNTERSTÜTZT DURCH' fontSize={20} />

      Vielen Dank für die Unterstützung!

      <Box sx={{marginTop: 2}} />

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

      <Subtitle>
        MEDIENPATRONAT
      </Subtitle>

      <a href="https://www.bote.ch/" target="_blank" rel="noreferrer">
        <img src={bote} alt="Bote der Urschweiz AG" style={{ width: 200 }} />
      </a>
      <LogoDivider />

      <Subtitle>
        GÖNNER
      </Subtitle>

      <Typography component="div" sx={{ width: 200, 'a': {textDecoration: "none"} }} >
        <a target="_blank" rel="noreferrer" href="https://www.kath-arth-goldau.ch/pfarrei/arth/georgsheim">Stiftung Pfarreiheim St. Georg, Arth</a>
      </Typography>
      <LogoDivider />

      <Typography component="div" sx={{ width: 200, 'a': {textDecoration: "none"} }} >
        <a target="_blank" rel="noreferrer" href="https://pflegezentren-arth.ch/">Stiftung Pflegezentren Gemeinde Arth</a>
      </Typography>
      <LogoDivider />

      <Typography component="div" sx={{ width: 200, 'a': {textDecoration: "none"} }} >
        <a target="_blank" rel="noreferrer" href="https://www.theaterarth.ch/">Theater Arth</a>
      </Typography>
      <LogoDivider />

      <Typography component="div" sx={{ width: 200, 'a': {textDecoration: "none"} }} >
        <a target="_blank" rel="noreferrer" href="https://www.schmidlin.ch/">Wilhelm Schmidlin AG</a>
      </Typography>
      <LogoDivider />

      <Typography component="div" sx={{ width: 200, 'a': {textDecoration: "none"} }} >
        <a target="_blank" rel="noreferrer" href="https://www.kaufmann-ag.ch/">Kaufmann AG</a>
      </Typography>
      <LogoDivider />

      <Typography component="div" sx={{ width: 200, 'a': {textDecoration: "none"} }} >
        <a target="_blank" rel="noreferrer" href="http://www.kennelgoldau.ch/getraenke.html">Kennel Getränke</a>
      </Typography>
      <LogoDivider />

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
