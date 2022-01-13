import { OBJECT_TYPE, CLASS_LIST } from './setup';

class GameBoard {
  constructor(ballCount, squares, DOMGrid) {
    this.ballCount = ballCount;
    this.grid = squares;
    this.DOMGrid = DOMGrid;
  }

  showGameStatus(gameWin) {
    // Create and show game win or game over
    const div = document.createElement('div');
    div.classList.add('game-status');
    div.innerHTML = `${gameWin ? 'WIN!' : 'GAME OVER!'}`;
    this.DOMGrid.appendChild(div);
  }

  addObject(pos, classes) {
    if (this.grid[pos].classList.contains('home'))
    {
      let ghostDiv = document.createElement('div');
      ghostDiv.classList.add(...classes, 'escape_home');
      this.grid[pos].appendChild(ghostDiv);
      // console.log('Added ghostDiv');
    }
    else {
      this.grid[pos].classList.add(...classes);
    }
  }

  removeObject(pos, classes) {
    if (this.grid[pos].children[0])
    {
      this.grid[pos].removeChild(this.grid[pos].children[0])
      // console.log('Removed ghostDiv');
    }
    else
    {
      this.grid[pos].classList.remove(...classes);
    }
  }
  // Can have an arrow function here cause of this binding
  objectExist(pos, object) {
    if (!this.grid[pos])
    {
      console.log("pos = " + pos + ", obj = " + object);
    }
    if (this.grid[pos].children[0])
    {
      return this.grid[pos].children[0].classList.contains(object);
    }
    return this.grid[pos].classList.contains(object);
  }

  rotateDiv(pos, deg) {
    this.grid[pos].style.transform = `rotate(${deg}deg)`;
  }

  moveCharacter(character) {
    if (character.shouldMove()) {
      const { nextMovePos, direction } = character.getNextMove(
        this.objectExist.bind(this)
      );
      const { classesToRemove, classesToAdd } = character.makeMove();

      if (character.rotation && nextMovePos !== character.pos) {
        // Rotate
        this.rotateDiv(nextMovePos, character.dir.rotation);
        // Rotate the previous div back
        this.rotateDiv(character.pos, 0);
      }

      this.removeObject(character.pos, classesToRemove);
      this.addObject(nextMovePos, classesToAdd);

      character.setNewPos(nextMovePos, direction);
    }
  }
}

export default GameBoard;
