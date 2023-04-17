import React, { useState, useEffect, useRef } from 'react';
import { Tile } from './Tile';
import { initRandomTile, directionParams, onceDrop, counterId } from './utils';
import {
  BOARD_SIZE,
  LEFT,
  RIGHT,
  UP,
  DOWN,
  UP_DIRECTION,
  DOWN_DIRECTION,
  LEFT_DIRECTION,
  RIGHT_DIRECTION,
  NONE,
  NONE_DIRECTION,
} from './constants';

const sorter = array => {
  return array.sort((a, b) => (a.y - b.y) * BOARD_SIZE + a.x - b.x);
};

const boundaryOutCheck = (number, direction, limit) => {
  switch (direction) {
    case LEFT:
    case UP:
      return number >= limit;
    case RIGHT:
    case DOWN:
      return number <= BOARD_SIZE - 1 - limit;
    default:
  }
};

const merge = array => {
  let hasMerge = false;

  const updateMerge = array.reduce((prev, item, _, tiles) => {
    const hasSibling = tiles.filter(
      tile =>
        tile.x === item.x && tile.y === item.y && tile.value === item.value
    );
    if (hasSibling.length === 1) return [...prev, item];

    const hasInStock = !!prev.filter(
      stockTile => stockTile.x === item.x && stockTile.y === item.y
    ).length;
    if (hasSibling.length === 2 && hasInStock === false) {
      hasMerge = true;
      return [...prev, { ...item, value: item.value + item.value }];
    }
    return prev;
  }, []);

  return { hasMerge, updateMerge };
};

const step = ([...tiles], direction) => {
  const { track, shiftX, shiftY } = directionParams(direction);
  const oppositeTrack = track === 'x' ? 'y' : 'x';
  let hasMorphed = false;
  let limitBoundary = [1, 1, 1, 1];

  function stepDirection(prev, item) {
    if (
      boundaryOutCheck(
        item[track],
        direction,
        limitBoundary[item[oppositeTrack]]
      )
    ) {
      const hasNearby = prev.filter(
        nearby => nearby.x === item.x + shiftX && nearby.y === item.y + shiftY
      );
      if (
        hasNearby.length === 0 ||
        (hasNearby.length === 1 && hasNearby[0].value === item.value)
      ) {
        hasMorphed = true;
        return [
          ...prev,
          { ...item, [track]: item[track] + (track === 'x' ? shiftX : shiftY) },
        ];
      }
      limitBoundary[item[oppositeTrack]] += 1;
    }
    return [...prev, item];
  }

  const updateSlide =
    direction === LEFT || direction === UP
      ? tiles.reduce(stepDirection, [])
      : tiles.reduceRight(stepDirection, []);

  return { hasMorphed, updateSlide };
};

const Tiles = ({ resize }) => {
  const [tiles, setTiles] = useState([]);
  const [sliding, setSliding] = useState(NONE_DIRECTION);
  const mergeTiles = useRef(false);
  const drop = useRef(false);
  const refContainer = useRef(null);

  useEffect(() => {
    function transitionEnd() {
      if (sliding.action === NONE && drop.current) {
        drop.current = false;
        setTiles(prevTiles => {
          const tile = initRandomTile(prevTiles);
          const sortedTiles = sorter([...prevTiles, tile]);
          return sortedTiles;
        });
      }
    }

    function handleDirectionEvent(event) {
      switch (event.key) {
        case 'ArrowUp':
          setSliding(UP_DIRECTION);
          break;
        case 'ArrowDown':
          setSliding(DOWN_DIRECTION);
          break;
        case 'ArrowLeft':
          setSliding(LEFT_DIRECTION);
          break;
        case 'ArrowRight':
          setSliding(RIGHT_DIRECTION);
          break;
        default:
        //do nothing
      }

      window.addEventListener('keydown', handleDirectionEvent, {
        once: true,
      });
    }

    window.addEventListener('keydown', handleDirectionEvent, {
      once: true,
    });
    refContainer.current.addEventListener('transitionend', transitionEnd);

    setTiles(prevTiles => {
      //const tile = initRandomTile(prevTiles);
      const tile = { x: 2, y: 3, value: 2, id: counterId(), drop: onceDrop }; //configuration with problem
      const sortedTiles = sorter([...prevTiles, tile]);
      return sortedTiles;
    });

    setTiles(prevTiles => {
      //const tile = initRandomTile(prevTiles);
      const tile = { x: 3, y: 0, value: 4, id: counterId(), drop: onceDrop }; // configuration with problem
      const sortedTiles = sorter([...prevTiles, tile]);
      return sortedTiles;
    });
    return () => {
      window.removeEventListener('keydown', handleDirectionEvent);
      refContainer.current.removeEventListener('transitionend', transitionEnd);
    };
  }, []);

  useEffect(() => {
    if (sliding.action !== NONE) {
      function slide(prevTiles, direction) {
        const { hasMorphed, updateSlide } = step(prevTiles, direction);
        if (hasMorphed) {
          setSliding(prev => ({ ...prev }));
          return sorter([...updateSlide]);
        }
        setSliding(NONE_DIRECTION);
        mergeTiles.current = true;
        return prevTiles;
      }

      if (
        sliding.action === LEFT ||
        sliding.action === RIGHT ||
        sliding.action === UP ||
        sliding.action === DOWN
      ) {
        setTiles(prevTiles => slide(prevTiles, sliding.action));
      }
    }
  }, [tiles, sliding]);

  useEffect(() => {
    if (mergeTiles.current === true) {
      mergeTiles.current = false;
      setTiles(prevTiles => {
        const { hasMerge, updateMerge } = merge(prevTiles);
        drop.current = true;
        if (hasMerge) {
          return sorter([...updateMerge]);
        }
        return prevTiles;
      });
    }
  }, [mergeTiles.current]);

  return (
    <div ref={refContainer}>
      {tiles.map(tile => {
        return <Tile key={tile.id} tile={tile} resize={resize} />;
      })}
    </div>
  );
};

export { Tiles };
