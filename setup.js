const BOARD_SIZE = 20;

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



