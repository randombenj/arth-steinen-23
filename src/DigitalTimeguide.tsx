
import { useEffect, useRef } from 'react';
import MyFest from './MyFest';

type DigitalTimeguideProps = {
  name: string
  timetable: string
  competitionVenues: string
}

function DigitalTimeguide({name, timetable, competitionVenues}: DigitalTimeguideProps) {
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
      <MyFest name={name} timetable={timetable} competitionVenues={competitionVenues} />
    </div>
  );
}

export default DigitalTimeguide;
