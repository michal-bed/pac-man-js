import { DIRECTIONS, OBJECT_TYPE, BOARD_SIZE } from './setup';
// Create an array from the directions objects key
const keys = Object.keys(DIRECTIONS);

// Primitive random movement.
export function randomMovement(position, direction, objectExist) {
  let dir = direction;
  let nextMovePos = position + dir.movement;

  let count = 0
  while (
    objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
    objectExist(nextMovePos, OBJECT_TYPE.GHOST)
  ) {
    // Get a random key from that array
    const key = keys[Math.floor(Math.random() * keys.length)];
    // Set the new direction
    dir = DIRECTIONS[key];
    // Set the next move
    nextMovePos = position + dir.movement;
    count++;
    // preventing blocking of the ghost when there is no possible move
    if (count > 25) {
      nextMovePos = pos;
      break;
    }
  }

  return { nextMovePos, direction: dir };
}

//get the coordinates of pacman or blinky on the grid with X and Y axis
function getCoordinates(position) {
  return [position % BOARD_SIZE, Math.floor(position / BOARD_SIZE)]
}

export function smarterMovement(ghostPos, direction, objectExist, pacmanPos=null) {
  let dir = direction;
  let nextMovePos = ghostPos + dir.movement;
  // console.log(ghostPos)

  let count = 0;
  while (
  objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
  objectExist(nextMovePos, OBJECT_TYPE.GHOST)
  ) {
    // Get a random key from that array
    const key = keys[Math.floor(Math.random() * keys.length)];
    // Set the new direction
    dir = DIRECTIONS[key];
    // Set the next move
    nextMovePos = ghostPos + dir.movement;
    const [ghostX, ghostY] = getCoordinates(ghostPos);
    const [pacmanX, pacmanY] = getCoordinates(pacmanPos);
    const [ghostNextX, ghostNextY] = getCoordinates(nextMovePos);

    function isXCoordCloser() {
      return Math.abs(ghostNextX - pacmanX) < Math.abs(ghostX - pacmanX);
    }

    function isYCoordCloser() {
      return Math.abs(ghostNextY - pacmanY) < Math.abs(ghostY - pacmanY);
    }

    if (!(isXCoordCloser() || isYCoordCloser())) {
      nextMovePos = ghostPos;
      break;
    }
    count++;
    // preventing blocking of the ghost when there is no possible move
    if (count > 25) {
      nextMovePos = ghostPos;
      break;
    }
  }
}