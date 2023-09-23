import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography, styled } from '@mui/material';
import { Blacker } from './Typography';

import freitagTeaser from './teaser-freitag.png'
import festTeaser from './teaser-fest.png'


const PhotosLink = styled('a')({
  textDecoration: 'none',
  color: '#060606'
});


export default function Photos() {
  return (
    <>
      <Typography sx={{ fontSize: '1.2em', marginTop: 4, color: '#505050' }}>
        BILDER VOM FEST <Box sx={{ width: '60px', borderBottom: '1px solid #8d1e1f40', marginBottom: 1 }}></Box>
      </Typography>

      <Grid container spacing={2} sx={{ marginTop: 0 }} >

        {/* FESTWOCHENENDE */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardActionArea>
              <PhotosLink href="https://photos.app.goo.gl/Yw1tkYTCQv7YTtVb8" target="_blank" rel="noreferrer">
                <CardMedia
                  component="img"
                  image={festTeaser}
                  alt="Festwochenende"
                />
                <CardContent sx={{ padding: '8px !important' }}>
                  <Typography gutterBottom sx={{
                    textDecoration: 'none',
                    color: '#060606',
                    fontSize: '1.4em',
                    [`> span`]: {
                      fontSize: '1em',
                    }
                  }}>
                    Festwochenende <Blacker>(Samstag / Sonntag)</Blacker>
                  </Typography>
                </CardContent>
              </PhotosLink>
            </CardActionArea>
          </Card>
        </Grid>


        {/* AUF UND ABBAU */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardActionArea>
              <PhotosLink href="https://photos.app.goo.gl/ALqNcc6poSNn7oQc8" target="_blank" rel="noreferrer">
                <CardMedia
                  component="img"
                  image={freitagTeaser}
                  alt="Fest auf und Abau"
                />
                <CardContent sx={{ padding: '8px !important' }}>
                  <Typography gutterBottom sx={{
                    textDecoration: 'none',
                    color: '#060606',
                    fontSize: '1.4em',
                    [`> span`]: {
                      fontSize: '1em',
                    }
                  }}>
                    Auf- und Abbau <Blacker>(Freitag / Montag)</Blacker>
                  </Typography>
                </CardContent>
              </PhotosLink>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
