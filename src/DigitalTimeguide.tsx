
import { createTheme, ThemeProvider } from '@mui/material';
import { useEffect, useRef } from 'react';
import MyFest from './MyFest';

type DigitalTimeguideProps = {
  name: string
  timetable: string
  competitionVenues: string
  primaryColor?: string
}

function DigitalTimeguide({name, timetable, competitionVenues, primaryColor}: DigitalTimeguideProps) {
  // styling

  const theme = createTheme({
    palette: {
      primary: {
        main: primaryColor || '#8d1e1f'
      },
    },
  });


  const observedElementRef = useRef(null);

  useEffect(() => {
    if (observedElementRef.current) {
      const observer = new ResizeObserver((entries) => {
        // @ts-ignore
        const height = observedElementRef.current.offsetHeight
        // eslint-disable-next-line no-restricted-globals
        parent.postMessage(`resize::${height}`, '*')
      });

      observer.observe(observedElementRef.current);

      // Cleanup function
      return () => {
          observer.disconnect();
      };
    }
  }, []);

  return (
    <div ref={observedElementRef}>
      <ThemeProvider theme={theme}>
        <MyFest name={name} timetable={timetable} competitionVenues={competitionVenues} />
      </ThemeProvider>
    </div>
  );
}

export default DigitalTimeguide;
