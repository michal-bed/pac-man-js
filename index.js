import { createGrid, squares, ballCount, grid} from "./level"
import { OBJECT_TYPE } from './setup';
import { randomMovement } from './ghostmoves';
import {move_pacman, pacman} from "./pac_man";
// Classes
import GameBoard from './GameBoard';
// import Pacman from './Pacman';
import Ghost from './Ghost';
// Sounds
import soundDot from './sounds/munch.wav';
import soundPill from './sounds/pill.wav';
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

// Game constants
const POWER_PILL_TIME = 10000; // ms
const GLOBAL_SPEED = 80; // ms
// Initial setup
// let score = 0;
let timer = null;
let gameWin = false;
let superBallActive = false;
let superBallTimer = null;

// --- AUDIO --- //
function playAudio(audio) {
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



function checkCollision(pacman, ghosts) {
  const collidedGhost = ghosts.find((ghost) => pacman.pos === ghost.pos);

  if (collidedGhost) {
    if (pacman.superBall) {
      playAudio(soundGhost);
      gameBoard.removeObject(collidedGhost.pos, [
        OBJECT_TYPE.GHOST,
        OBJECT_TYPE.SCARED,
        collidedGhost.name
      ]);
      collidedGhost.pos = collidedGhost.startPos;
      score += 100;
    } else {
      gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
      gameBoard.rotateDiv(pacman.pos, 0);
      gameOver(pacman, gameGrid);
    }
  }
}



function gameLoop(pacman, ghosts) {
  // 1. Move Pacman
  // gameBoard.moveCharacter(pacman);
  // 2. Check Ghost collision on the old positions
  // checkCollision(pacman, ghosts);
  // 3. Move ghosts
  ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost));
  // 4. Do a new ghost collision check on the new positions
  // checkCollision(pacman, ghosts);
  // 5. Check if Pacman eats a dot
  // if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.DOT)) {
  //   playAudio(soundDot);
  //
  //   gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
  //   // Remove a dot
  //   gameBoard.ballCount--;
  //   // Add Score
  //   score += 10;
  // }
  // 6. Check if Pacman eats a power pill
  // if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {
  //   playAudio(soundPill);
  //
  //   gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);
  //
  //   pacman.powerPill = true;
  //   score += 50;
  //
  //   clearTimeout(powerPillTimer);
  //   powerPillTimer = setTimeout(
  //     () => (pacman.powerPill = false),
  //     POWER_PILL_TIME
  //   );
  // }
  // // 7. Change ghost scare mode depending on powerpill
  // if (pacman.powerPill !== powerPillActive) {
  //   powerPillActive = pacman.powerPill;
  //   ghosts.forEach((ghost) => (ghost.isScared = pacman.powerPill));
  // }
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
  superBallActive = false;
  //score = 0;

  startButton.classList.add('hide');

  createGrid()
  move_pacman(superBallActive)
  document.addEventListener('keydown', () => move_pacman(superBallActive))

 // const pacman = new Pacman(2, 287);
 //  gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);
 //  document.addEventListener('keydown', (e) =>
 //    pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
 //  );

  const ghosts = [
    new Ghost(5, 387, randomMovement, OBJECT_TYPE.BLINKY),
    new Ghost(5, 392, randomMovement, OBJECT_TYPE.PINKY),
    new Ghost(4, 400, randomMovement, OBJECT_TYPE.INKY),
    new Ghost(3, 408, randomMovement, OBJECT_TYPE.CLYDE)
  ];

  // Gameloop
  timer = setInterval(() => gameLoop(null, ghosts), GLOBAL_SPEED);
}

// // Initialize game
// startButton.addEventListener('click', startGame);
