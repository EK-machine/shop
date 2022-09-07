import { useState, useLayoutEffect } from 'react';

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      setScreenWidth(innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenWidth;
};

export default useScreenWidth;
