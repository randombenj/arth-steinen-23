import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import DigitalTimeguide from './DigitalTimeguide';

const theme = createTheme({
  palette: {
    primary: {
      light: '#a34b4b',
      main: '#8d1e1f',
      dark: '#621515',
      contrastText: '#fefefe',
    },
    secondary: {
      light: '#f73378',
      main: '#f50057',
      dark: '#ab003c',
      contrastText: '#fefefe',
    },
  },
});

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/langenthal-25",
    element: <DigitalTimeguide
      primaryColor='#3e82c4'
      name='langenthal-25'
      timetable='/langenthal-25/zeitplan.csv'
      competitionVenues='/langenthal-25/wettspielorte.json'
    />
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
