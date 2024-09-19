
import { useEffect, useRef } from 'react';
import MyFest from './MyFest';


function DigitalTimeguide() {
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
      <MyFest />
    </div>
  );
}

export default DigitalTimeguide;
