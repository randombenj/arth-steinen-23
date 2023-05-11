import * as React from 'react';
import { Divider, List, ListItem, ListItemText, Typography } from '@mui/material';

import vorstand from './arth-steinen-vorstand.png'

export default function People() {

  const committee = [
    { name: 'Marco Fässler', role: 'OK-Präsident', ort: 'Arth' },
    { name: 'Martin Grätzer', role: 'Vizepräsident', ort: 'Steinen' },
    { name: 'Adriana Merz', role: 'Sekretariat', ort: 'Steinen' },
    { name: 'Julian Betschart', role: 'Finanzen', ort: 'Goldau' },
    { name: 'Patrick Suter', role: 'Bau & Logistik', ort: 'Goldau' },
    { name: 'Thomas Marty', role: 'Wettspiel', ort: 'Steinen' },
    { name: 'Markus Marty', role: 'Personal', ort: 'Steinen' },
    { name: 'Benj Fassbind', role: 'Marketing', ort: 'Zug' },
    { name: 'Jan Andermatt', role: 'Gastronomie', ort: 'Oberarth' },
  ]

  return (
    <>
    <img src={vorstand} alt="Victorinox" width="100%"/>


    <List sx={{ width: '100%', maxWidth: 360, padding: 0 }}>
      {committee.map((p) => (
        <>
          <ListItem alignItems="flex-start" sx={{ padding: 0 }}>
            <ListItemText
              sx={{ color: "#505050" }}
              primary={p.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline', color: "#505050" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                    >
                    {p.role}
                  </Typography>
                  {` — ${p.ort}`}
                </React.Fragment>
              }
              />
          </ListItem>
          <Divider sx={{ width: 40, paddingBottom: 0.6 }} component="li" />
        </>
      ))}
    </List>
    </>
  );
}
