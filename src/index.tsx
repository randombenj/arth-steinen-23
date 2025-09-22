import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createHashRouter, RouteObject, RouterProvider } from 'react-router-dom';
import Admin from './Admin';
import DigitalTimeguide from './DigitalTimeguide';

interface EventConfig {
  name: string;
  primaryColor: string;
}

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

function AppRouter() {
  const [events, setEvents] = useState<EventConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch('/events.json');
        if (response.ok) {
          const eventsData: EventConfig[] = await response.json();
          setEvents(eventsData);
        } else {
          console.error('Failed to load events.json');
        }
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Create base routes
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/admin",
      element: <Admin />
    }
  ];

  // Add dynamic routes from events.json
  events.forEach(event => {
    routes.push({
      path: `/${event.name}`,
      element: <DigitalTimeguide
        primaryColor={event.primaryColor}
        name={event.name}
        timetable={`/${event.name}/zeitplan.csv`}
        competitionVenues={`/${event.name}/wettspielorte.json`}
      />
    });
  });

  const router = createHashRouter(routes);

  return <RouterProvider router={router} />;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
