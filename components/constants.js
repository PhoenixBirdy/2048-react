const BOARD_SIZE = 4;
const BOARD_CELLS = BOARD_SIZE * BOARD_SIZE;
const INDEXES = Array.from({ length: BOARD_CELLS }, (_, i) => i);

const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const UP = 'UP';
const DOWN = 'DOWN';
const NONE = 'NONE';

const NONE_DIRECTION = { action: NONE };
const LEFT_DIRECTION = { action: LEFT };
const RIGHT_DIRECTION = { action: RIGHT };
const UP_DIRECTION = { action: UP };
const DOWN_DIRECTION = { action: DOWN };

export {
  INDEXES,
  BOARD_SIZE,
  BOARD_CELLS,
  LEFT,
  RIGHT,
  UP,
  DOWN,
  NONE,
  NONE_DIRECTION,
  LEFT_DIRECTION,
  RIGHT_DIRECTION,
  UP_DIRECTION,
  DOWN_DIRECTION,
};
