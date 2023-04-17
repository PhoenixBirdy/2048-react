import { useState, useEffect, useRef } from 'react';

export const useStopAnimation = () => {
  const [width, setWidth] = useState(null);
  const [isAnimate, setIsAnimate] = useState(false);
  const refBoard = useRef();

  useEffect(() => {
    function handleResize() {
      setWidth(refBoard.current.clientWidth);
    }

    window.addEventListener('resize', handleResize);
    setWidth(refBoard.current.clientWidth);
  }, []);

  useEffect(() => {
    setIsAnimate(true);
    const id = setTimeout(() => {
      setIsAnimate(false);
    }, 60);

    return () => {
      clearTimeout(id);
    };
  }, [width]);

  return { isAnimate: isAnimate, refBoard: refBoard };
};
