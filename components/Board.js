import React from 'react';
import Cells from './Cells';
import { Tiles } from './Tiles';
import styles from './Board.module.css';
import { useStopAnimation } from './hooks/useStopAnimation';

export const Board = () => {
  const { refBoard, isAnimate } = useStopAnimation();

  return (
    <div className={styles.board} ref={refBoard}>
      <Cells />
      <Tiles resize={isAnimate} />
    </div>
  );
};
