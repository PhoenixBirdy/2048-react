import React, { memo } from 'react';
import { Cell } from './Cell';
import { BOARD_CELLS } from './constants';

const Cells = () => {
  console.log('[Cells]');
  return (
    <>
      {Array.from({ length: BOARD_CELLS }).map((_, index) => (
        <Cell key={`cell-${index}`} />
      ))}
    </>
  );
};

export default memo(Cells);
