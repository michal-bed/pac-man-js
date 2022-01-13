import { width } from './level'
export const BOARD_SIZE = 28;

export const DIRECTIONS = {
  ArrowLeft: {
    code: 37,
    movement: -1,
    rotation: 180
  },
  ArrowUp: {
    code: 38,
    movement: -width,
    rotation: 270
  },
  ArrowRight: {
    code: 39,
    movement: 1,
    rotation: 0
  },
  ArrowDown: {
    code: 40,
    movement: width,
    rotation: 90
  }
};

export const OBJECT_TYPE = {
  BLANK: 'blank',
  WALL: 'pieces_of_wall_horizontally',
  PILL: 'pill',
  BLINKY: 'blinky',
  PINKY: 'pinky',
  INKY: 'inky',
  CLYDE: 'clyde',
  BALL: 'ball',
  PACMAN: 'pacman',
  GHOST: 'ghost',
  SCARED: 'scared',
};

// Lookup array for classes
export const CLASS_LIST = [
  OBJECT_TYPE.BLANK,
  OBJECT_TYPE.WALL,
  OBJECT_TYPE.BALL,
  OBJECT_TYPE.BLINKY,
  OBJECT_TYPE.PINKY,
  OBJECT_TYPE.INKY,
  OBJECT_TYPE.CLYDE,
  OBJECT_TYPE.PILL,
  OBJECT_TYPE.PACMAN,
];

export const MOVEMENT = {
    MoveUp: {
        code: 87,
        movement: -BOARD_SIZE,
        direction: 'up'
    },
    MoveDown: {
      code: 83,
      movement: BOARD_SIZE,
      direction: 'down'
    },
    MoveLeft: {
        code: 65,
        movement: -1,
        direction: 'left'
    },
    MoveRight: {
        code: 68,
        movement: 1,
        direction: 'right'
    }
}

