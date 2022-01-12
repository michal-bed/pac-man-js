import { DIRECTIONS, OBJECT_TYPE } from './setup';
import { randomMovement } from './ghostmoves';

class Ghost {
  constructor(speed = 5, startPos, movementFn, name) {
    this.name = name;
    this.movementFn = movementFn
    this.startPos = startPos;
    this.pos = startPos;
    this.dir = DIRECTIONS.ArrowRight;
    this.speed = speed;
    this.timer = 0;
    this.isScared = false;
    this.rotation = false;
  }

  static points = 100;

  shouldMove() {
    if (this.timer === this.speed) {
      this.timer = 0;
      return true;
    }
    this.timer++;
  }

  getNextMove(objectExist) {
    // Call move algorithm here
    const { nextMovePos, direction } = this.movementFn(
      this.pos,
      this.dir,
      objectExist
    );
    return { nextMovePos, direction };
  }

  makeMove() {
    const classesToRemove = [OBJECT_TYPE.GHOST, OBJECT_TYPE.SCARED, this.name];
    let classesToAdd = [OBJECT_TYPE.GHOST, this.name];

    if (this.isScared) classesToAdd = [...classesToAdd, OBJECT_TYPE.SCARED];

    return { classesToRemove, classesToAdd };
  }

  setNewPos(nextMovePos, direction) {
    this.pos = nextMovePos;
    this.dir = direction;
  }
}

export default Ghost;