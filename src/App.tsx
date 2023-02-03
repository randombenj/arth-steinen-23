import React from 'react';
import './App.css';

import logo from './logo.png';
import teaser from './teaser.jpg';
import { Container, styled } from '@mui/material';

const Logo = styled('img')({
  width: 200
});

const Teaser = styled('img')({
  overflow: 'hidden',
  borderRadius: 20,
  height: 500,
  marginRight: -20
})

function App() {
  return (
    <Container sx={{marginTop: 20, border: '1px solid red', minHeight: 1000}} maxWidth="lg">
      <Logo src={logo} />
      <Teaser src={teaser} />
    </Container>
  );
}

export default App;
