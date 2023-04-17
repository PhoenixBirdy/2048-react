import React, { useRef, useEffect } from 'react';
import styles from './Tile.module.css';

export const Tile = ({ tile, resize }) => {
  console.log('[Tile]:', tile);
  const nodeTile = useRef();
  const drop = tile.drop();
  const transitionAnimation = resize ? '' : styles.transaction;

  useEffect(() => {
    function setVariableProperties() {
      const bgLightness = 100 - Math.log2(tile.value) * 9;
      nodeTile.current.style.setProperty('--x', tile.x);
      nodeTile.current.style.setProperty('--y', tile.y);
      nodeTile.current.style.setProperty('--bg-lightness', `${bgLightness}%`);
      nodeTile.current.style.setProperty(
        '--text-lightness',
        `${bgLightness < 50 ? 90 : 10}%`
      );
    }

    setVariableProperties();
  }, [tile]);

  return (
    <div
      ref={nodeTile}
      className={`${styles.tile} ${transitionAnimation} ${
        drop ? styles.drop : null
      }`}
    >
      {tile.value}
    </div>
  );
};
