import {createGrid, squares, ballCount, superBallActive, score} from "./level"
import { OBJECT_TYPE } from './setup';
import { randomMovement, smarterMovement } from './ghostmoves';
import { move_pacman, pacmanCurrentIndex, saveResults } from "./pac_man";
import GameBoard from './GameBoard';
import Ghost from './Ghost';
import soundGameStart from './sounds/game_start.wav';
import soundGhost from './sounds/eat_ghost.wav';
import gameloose from "./sounds/Game_Over.mp3";

let gameGrid;
let scoreTable;
let startButton;
let gameBoard = null;
document.addEventListener('DOMContentLoaded',  () => {
  gameGrid = document.querySelector('#grid');
  scoreTable = document.querySelector('#score');
  startButton = document.querySelector('#start-button');
  startButton.addEventListener('click', startGame);
});

const GLOBAL_SPEED = 80; // ms
let timer = null;
let pacmanMover = null;
let gameWin = false;

// --- AUDIO --- //
export function playAudio(audio) {
  const soundEffect = new Audio(audio);
  soundEffect.play();
}

// --- GAME CONTROLLER --- //
let powerPillActive = false;
function change_scare_mode(ghosts) {
  if (superBallActive !== powerPillActive) {
    powerPillActive = superBallActive;
    ghosts.forEach((ghost) => (ghost.isScared = superBallActive));
  }
}


function gameOver() {
    playAudio(gameloose);
    saveResults()
    document.querySelector(".game_over").classList.remove('hide');
    document.querySelector(".overlay").classList.remove('hide');
    var info = document.getElementById('score1');
    var HTML = `<div>Your Score: ${score}</div>`;
    info.innerHTML = HTML;
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
      document.removeEventListener('keydown', pacmanMover)
      gameOver()
      clearInterval(timer);
    }
  }
}

function gameLoop(pacman, ghosts) {
  ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost));
  checkCollision(pacmanCurrentIndex, ghosts);
  change_scare_mode(ghosts);
}

function startGame() {
  playAudio(soundGameStart);

  gameBoard = new GameBoard(ballCount, squares, gameGrid);
  gameWin = false;

  startButton.classList.add('hide');

  createGrid()
  const ghosts = [
    new Ghost(5, 387, randomMovement, OBJECT_TYPE.BLINKY),
    new Ghost(5, 366, smarterMovement, OBJECT_TYPE.PINKY), // 5
    new Ghost(4, 400, randomMovement, OBJECT_TYPE.INKY),
    new Ghost(4, 405, smarterMovement, OBJECT_TYPE.CLYDE) // 3, 408
  ];


  move_pacman();
  document.addEventListener('keydown', pacmanMover = () => { move_pacman(); checkCollision(pacmanCurrentIndex, ghosts);})
  timer = setInterval(() => gameLoop(null, ghosts), GLOBAL_SPEED);
}

