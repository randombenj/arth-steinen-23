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

export default function Sponsoring() {
  return (
    <>
      <Box sx={{ marginTop: 2 }} />
      <Title title='UNTERSTÜTZT DURCH' fontSize={20} />

      Vielen Dank für die Unterstützung!

      <Subtitle>
        GOLDSPONSOREN
      </Subtitle>

      <img src={szkb} alt="Schwyzer Kantonalbank" style={{ width: 200 }} />
      <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

      <img src={victorinox} alt="Victorinox" style={{ width: 200 }} />
      <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

      <Subtitle>
        INSTITUTIONELLE SPONSOREN
      </Subtitle>

      <img src={kantonSchwyz} alt="Kanton Schwyz (Lotteriefonds)" style={{ width: 200 }} />
      <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

      <img src={kantonArgau} alt="Kanton Argau (Lotteriefonds)" style={{ width: 200 }} />
      <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

      <img src={bl} alt="Kanton Basel-Landschaft (Lotteriefonds)" style={{ width: 200 }} />
      <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

      <img src={bs} alt="Kanton Basel-Stadt (Lotteriefonds)" style={{ width: 200 }} />
      <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

      <img src={lu} alt="Kanton Luzern (Lotteriefonds)" style={{ width: 200 }} />
      <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

      <img src={egstiftung} alt="Ernst Göhner Stiftung" style={{ width: 200 }} />
      <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

      <img src={gemeindeArth} alt="Gemeinde Arth" style={{ width: 200 }} />
      <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

      <img src={bezirkSchwyz} alt="Bezirk Schwyz" style={{ width: 200 }} />
      <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

      <Subtitle>
        SPONSOREN
      </Subtitle>

      <img src={bauplanung} alt="Bauplanung Suter GmbH" style={{ width: 200 }} />
      <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

      <img src={riwag} alt="Riwag Türen" style={{ width: 200 }} />
      <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

      <Subtitle>
        MEDIENPATRONAT
      </Subtitle>

      <img src={bote} alt="Bote der Urschweiz AG" style={{ width: 200 }} />
      <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

      <Subtitle>
        GÖNNER
      </Subtitle>

      <Typography component="div" sx={{ width: 200 }} >
        Stiftung Pfarreiheim St. Georg, Arth
      </Typography>
      <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

      <Typography component="div" sx={{ width: 200 }} >
        Stiftung Pflegezentren Gemeinde Arth
      </Typography>
      <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

      <Typography component="div" sx={{ width: 200 }} >
        Theater Arth
      </Typography>
      <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

      <Typography component="div" sx={{ width: 200 }} >
        Wilhelm Schmidlin AG
      </Typography>
      <Divider sx={{ width: 40, paddingBottom: 0.6, marginBottom: 2 }} component="div" />

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
