import { createGrid, squares, ballCount, grid, superBallActive } from "./level"
import { OBJECT_TYPE } from './setup';
import { randomMovement, smarterMovement } from './ghostmoves';
import { move_pacman, pacmanCurrentIndex } from "./pac_man";

// Classes
import GameBoard from './GameBoard';
import Ghost from './Ghost';
// Sounds
// import soundDot from './sounds/munch.wav';
// import soundPill from './sounds/pill.wav';
import soundGameStart from './sounds/game_start.wav';
import soundGameOver from './sounds/death.wav';
import soundGhost from './sounds/eat_ghost.wav';
// Dom Elements
let gameGrid;
let scoreTable;
let startButton;
let gameBoard = null;
document.addEventListener('DOMContentLoaded',  () => {
  gameGrid = document.querySelector('#grid');
  scoreTable = document.querySelector('#score');
  startButton = document.querySelector('#start-button');
  // Initialize game
  startButton.addEventListener('click', startGame);
});

const GLOBAL_SPEED = 80; // ms
// Initial setup
// let score = 0;
let timer = null;
let gameWin = false;
// let superBallActive = false;

// --- AUDIO --- //
export function playAudio(audio) {
  const soundEffect = new Audio(audio);
  soundEffect.play();
}

// --- GAME CONTROLLER --- //
function gameOver(pacman) {
  playAudio(soundGameOver);

  document.removeEventListener('keydown', (e) =>
    pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
  );

  gameBoard.showGameStatus(gameWin);

  clearInterval(timer);
  startButton.classList.remove('hide');
}

let powerPillActive = false;
function change_scare_mode(ghosts) {
  // 7. Change ghost scare mode depending on powerpill
  if (superBallActive !== powerPillActive) {
    powerPillActive = superBallActive;
    ghosts.forEach((ghost) => (ghost.isScared = superBallActive));
  }
}

function checkCollision(pacmanPos, ghosts) {
  const collidedGhost = ghosts.find((ghost) => pacmanPos === ghost.pos);
  if (collidedGhost) {
    if (superBallActive) {
      playAudio(soundGhost);
      gameBoard.removeObject(collidedGhost.pos, [
        OBJECT_TYPE.GHOST,
        OBJECT_TYPE.SCARED,
        collidedGhost.name
      ]);
      collidedGhost.pos = collidedGhost.startPos;
      score += 100;
    } else {
      alert('Game Over');
      clearInterval(timer);
      // gameOver(pacmanPos, gameGrid);
    }
  }
}

function gameLoop(pacman, ghosts) {

  // 3. Move ghosts
  ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost));
  // 4. Do a new ghost collision check on the new positions
  checkCollision(pacmanCurrentIndex, ghosts);
  change_scare_mode(ghosts);
  // // 8. Check if all balls have been eaten
  // if (gameBoard.ballCount === 0) {
  //   gameWin = true;
  //   gameOver(pacman);
  // }
  // // 9. Show new score
  // scoreTable.innerHTML = score;
}

function startGame() {
  playAudio(soundGameStart);

  gameBoard = new GameBoard(ballCount, squares, gameGrid);
  gameWin = false;
  //score = 0;

  startButton.classList.add('hide');

  createGrid()
  const ghosts = [
    new Ghost(5, 387, randomMovement, OBJECT_TYPE.BLINKY),
    new Ghost(5, 366, smarterMovement, OBJECT_TYPE.PINKY), // 5
    new Ghost(4, 400, randomMovement, OBJECT_TYPE.INKY),
    new Ghost(4, 405, smarterMovement, OBJECT_TYPE.CLYDE) // 3, 408
  ];
  // 1. Move Pacman
  // 2. Check Ghost collision on the old positions
  // Gameloop
  
  move_pacman();
  document.addEventListener('keydown', () => { move_pacman(); checkCollision(pacmanCurrentIndex, ghosts);})
  timer = setInterval(() => gameLoop(null, ghosts), GLOBAL_SPEED);
}

// // Initialize game
// startButton.addEventListener('click', startGame);
