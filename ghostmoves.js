import { DIRECTIONS, OBJECT_TYPE } from './setup';

// Primitive random movement.
export function randomMovement(position, direction, objectExist) {
  let dir = direction;
  let nextMovePos = position + dir.movement;
  // Create an array from the diretions objects keys
  const keys = Object.keys(DIRECTIONS);

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
