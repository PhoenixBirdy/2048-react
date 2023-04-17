import React from 'react';
import styles from './Cell.module.css';

export const Cell = () => {
  console.log('[Cell]');
  return <div className={styles.cell}></div>;
};
