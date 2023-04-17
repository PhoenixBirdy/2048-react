import { useState, useEffect, useRef } from 'react';

export const useStopAnimation = () => {
  const [width, setWidth] = useState(null);
  const [isAnimate, setIsAnimate] = useState(false);
  const refBoard = useRef();

  useEffect(() => {
    console.log('[useEffect] custom: []');
    function handleResize() {
      console.log('[useEffect] custom: RESIZE');
      setWidth(refBoard.current.clientWidth);
    }

    window.addEventListener('resize', handleResize);
    setWidth(refBoard.current.clientWidth);
  }, []);

  useEffect(() => {
    console.log('[useEffect] custom: WIDTH');
    setIsAnimate(true);
    const id = setTimeout(() => {
      setIsAnimate(false);
    }, 60);

    return () => {
      console.log('[useEffect] custom: WIDTH CLEAR');
      clearTimeout(id);
    };
  }, [width]);

  return { isAnimate: isAnimate, refBoard: refBoard };
};
