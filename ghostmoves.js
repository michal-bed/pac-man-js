import { DIRECTIONS, OBJECT_TYPE, BOARD_SIZE } from './setup';
import { pacmanCurrentIndex } from './pac_man';
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
      nextMovePos = position;
      break;
    }
  }

  return { nextMovePos, direction: dir };
}

//get the coordinates of pacman or blinky on the grid with X and Y axis
function getCoordinates(position) {
   // console.log(position % BOARD_SIZE);
  return [position % BOARD_SIZE, Math.floor(position / BOARD_SIZE)]
}

function isXCoordCloser(ghostPos, nextMovePos, pacmanPos, objectExist) {
  const [ghostX, ghostY] = getCoordinates(ghostPos);
  if (objectExist(ghostPos, 'escape_home'))
    pacmanPos = 322// fake position to help escape home
  const [pacmanX, pacmanY] = getCoordinates(pacmanPos);
  const [ghostNextX, ghostNextY] = getCoordinates(nextMovePos);
  // console.log(pacmanPos);
  console.log([pacmanX, pacmanY]);
  console.log([ghostX, ghostY]);
  // console.log(Math.abs(ghostNextX - pacmanX) < Math.abs(ghostX - pacmanX))
  return Math.abs(ghostNextX - pacmanX) < Math.abs(ghostX - pacmanX);
}

function isYCoordCloser(ghostPos, nextMovePos, pacmanPos, objectExist) {
  const [ghostX, ghostY] = getCoordinates(ghostPos);
  if (objectExist(ghostPos, 'escape_home'))
    pacmanPos = 322 // fake position to help escape home
  const [pacmanX, pacmanY] = getCoordinates(pacmanPos);
  const [ghostNextX, ghostNextY] = getCoordinates(nextMovePos);
  return Math.abs(ghostNextY - pacmanY) < Math.abs(ghostY - pacmanY);
}

function isXCoordEqual(ghostPos, nextMovePos, pacmanPos) {
  const [ghostX, ghostY] = getCoordinates(ghostPos);
  const [pacmanX, pacmanY] = getCoordinates(pacmanPos);
  const [ghostNextX, ghostNextY] = getCoordinates(nextMovePos);
  return Math.abs(ghostNextX - pacmanX) === Math.abs(ghostX - pacmanX);
}

function isYCoordEqual(ghostPos, nextMovePos, pacmanPos) {
  const [ghostX, ghostY] = getCoordinates(ghostPos);
  const [pacmanX, pacmanY] = getCoordinates(pacmanPos);
  const [ghostNextX, ghostNextY] = getCoordinates(nextMovePos);
  return Math.abs(ghostNextY - pacmanY) === Math.abs(ghostY - pacmanY);
}

function shuffle(arr)
{
  let array = [...arr];
  for (let i = array.length - 1; i > 0; i--)
  {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function getRandomNextPos(ghostPos, objectExist, pacmanPos)
{
  let nextMovePos
  let shuffled_keys = shuffle(keys);
  let isGettingCloser = false;

  for (let key of shuffled_keys)
  {
    nextMovePos = ghostPos + DIRECTIONS[key].movement;
    if(!nextMovePos)
    {
      console.log(ghostPos+ " + " + DIRECTIONS[key].movement + ", key = " + key);
      conole.log(DIRECTIONS["ArrowUp"]);
    }
    if (!(objectExist(nextMovePos, OBJECT_TYPE.WALL) || objectExist(nextMovePos, OBJECT_TYPE.GHOST)))
    {
      // isGettingCloser = (isXCoordCloser(ghostPos, nextMovePos, pacmanPos) ||
      //   isYCoordCloser(ghostPos, nextMovePos, pacmanPos));
      // if (isGettingCloser)
        return nextMovePos
    }
  }
  return null;
}

export function smarterMovementInit(ghostPos, direction, objectExist, pacmanPos=pacmanCurrentIndex) {
  let dir = direction;
  let nextMovePos = ghostPos + dir.movement;
  let count = 0;
  let isGettingCloser = false;
  let foundPacman = false;

  do {
    dir = direction;
    nextMovePos = ghostPos + dir.movement;
    isGettingCloser = (isXCoordCloser(ghostPos, nextMovePos, pacmanPos) ||
        isYCoordCloser(ghostPos, nextMovePos, pacmanPos));
    if (!isGettingCloser)
    {
      do {
        // Get a random key from that array
        const key = keys[Math.floor(Math.random() * keys.length)];
        // Set the new direction
        direction = DIRECTIONS[key]
      } while(direction === dir)
      // continue;
    }
    else if (!objectExist(nextMovePos, OBJECT_TYPE.WALL) && !objectExist(nextMovePos, OBJECT_TYPE.GHOST))
    {
      console.log(`Getting closer [${nextMovePos}`)
      return { nextMovePos, direction: dir };
    }

    count++;
    // preventing blocking of the ghost when there is no possible move
    if (count > 100) { // 25
      let nextPos = getRandomNextPos(ghostPos, objectExist);
      if (nextPos === null)
      {
        nextPos = ghostPos;
      }
      // dir = direction;
      return { nextMovePos: nextPos, direction: dir };
    }
  } while((objectExist(nextMovePos, OBJECT_TYPE.WALL)) || objectExist(nextMovePos, OBJECT_TYPE.GHOST));
  // while(!isGettingCloser || objectExist(nextMovePos, OBJECT_TYPE.WALL))
  return { nextMovePos, direction: dir };
}

export function smarterMovement(ghostPos, direction, objectExist, pacmanPos=pacmanCurrentIndex) {
  let dir;
  let isGettingCloser = false;
  let foundPacman = false;
  let count = 0;
  while (true)
  {
    let nextMovePos = getRandomNextPos(ghostPos, objectExist, pacmanPos);
    if (nextMovePos === null)
    {
      nextMovePos = ghostPos;
      dir = direction;
      return { nextMovePos, direction: dir };
    }
    else {
      isGettingCloser = (isXCoordCloser(ghostPos, nextMovePos, pacmanPos, objectExist) ||
          isYCoordCloser(ghostPos, nextMovePos, pacmanPos, objectExist));
      foundPacman = (ghostPos === pacmanPos);
      if(foundPacman)
      {
        nextMovePos = ghostPos;
        dir = direction;
        return { nextMovePos, direction: dir };
      }
      else if (isGettingCloser)
        return { nextMovePos, direction: dir };
      else count++;
      if (count > 100)
        return { nextMovePos, direction: dir };
    }
  }
}
