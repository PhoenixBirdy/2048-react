import { BOARD_SIZE, INDEXES, LEFT, RIGHT, UP, DOWN } from './constants';

const directionParams = direction => {
  switch (direction) {
    case LEFT:
      return { track: 'x', shiftX: -1, shiftY: 0 };
    case RIGHT:
      return { track: 'x', shiftX: 1, shiftY: 0 };
    case UP:
      return { track: 'y', shiftX: 0, shiftY: -1 };
    case DOWN:
      return { track: 'y', shiftX: 0, shiftY: 1 };
    default:
  }
};

const drop = (initialDropValue = true) => {
  let dropValue = initialDropValue;
  return () => {
    if (dropValue) {
      setTimeout(() => {
        dropValue = false;
      }, 205);

      return true;
    }
    return dropValue;
  };
};

const onceDrop = drop();

const getRandomValueTwoOrFour = () => (Math.random() <= 0.5 ? 2 : 4);

const id = (initialNumber = 0) => {
  let counter = initialNumber;
  return () => ++counter;
};

const counterId = id();

const setXYV = (number, value = 0) => ({
  x: number % BOARD_SIZE,
  y: Math.floor(number / BOARD_SIZE),
  value,
  drop: onceDrop,
  id: counterId(),
});

const getRandomNumberInRange = range => Math.floor(Math.random() * range);

const getEmptyTilesIndexes = tileArray => {
  const occupiedIndexes = tileArray.map(({ x, y }) => y * BOARD_SIZE + x);

  return INDEXES.filter(index => !occupiedIndexes.includes(index));
};

const initRandomTile = tileArray => {
  const emptyTileIndexes = getEmptyTilesIndexes(tileArray);
  if (emptyTileIndexes.length === 0) {
    return;
  }

  const randomIndex = getRandomNumberInRange(emptyTileIndexes.length);
  const tileIndex = emptyTileIndexes[randomIndex];
  return setXYV(tileIndex, getRandomValueTwoOrFour());
};

export {
  counterId,
  onceDrop,
  directionParams,
  getRandomValueTwoOrFour,
  getRandomNumberInRange,
  getEmptyTilesIndexes,
  initRandomTile,
};
