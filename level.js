'use strict';

const width = 28;
let ballCount = 0;
let grid;
let scoreDisplay;
let createGrid = null;
import {pacmanCurrentIndex} from "./pac_man";
let ballPoints = 10;
let superPoints = 30;
let score = 0;
let superBallActive = false;
export { width, ballCount, squares, grid, scoreDisplay, createGrid, eatBall, superBallActive};
const layout = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
                1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
                1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
                1,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,1,
                1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
                1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
                1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,
                1,1,1,1,1,1,0,1,1,0,1,1,1,2,2,1,1,1,0,1,1,0,1,1,1,1,1,1,
                1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1,
                0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,
                1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1,
                1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,
                1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
                1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
                1,0,0,0,1,1,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,1,1,0,0,0,1,
                1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
                1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
                1,0,0,0,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,0,0,0,1,
                1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
                1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
              ]


const squares = [];
const BALL = 0;
const WALL = 1;
const SUPER = 3
const GHOST_HOME = 2
document.addEventListener('DOMContentLoaded', createGrid = () => {
  grid = document.querySelector('.grid');
  scoreDisplay = document.getElementById('score')

  function createBoard() {
      grid.innerHTML = '';
      squares.length = 0;
      ballCount = 0;
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement('div')
      grid.appendChild(square)
      squares.push(square)

      if(layout[i] === BALL) {
        squares[i].classList.add('ball')
        ballCount++;
      } else if (layout[i] === WALL) {
        squares[i].classList.add('pieces_of_wall_horizontally')
      } else if (layout[i] === SUPER) {
        squares[i].classList.add('super')
        ballCount++;
      } else if (layout[i] === GHOST_HOME) {
          squares[i].classList.add('home');
      }
    }
  }
  createBoard()
  squares[pacmanCurrentIndex].classList.add('pac-man')
})


// Game constants
const POWER_PILL_TIME = 7000; // ms
let superBallTimer = null;
const eatBall = function (square) {
    if(square.classList.contains('ball')) {
        square.classList.remove('ball');
        score += ballPoints;
        ballCount --;
    } else if (square.classList.contains('super')) {
        square.classList.remove('super');
        score += superPoints;
        ballCount --;
        superBallActive = true;
        clearTimeout(superBallTimer);
        superBallTimer = setTimeout(
        () => (superBallActive = false),
            POWER_PILL_TIME);
    }
    document.getElementById('score').textContent = score;
}


window.onload = function () {
    const startGameButton = document.querySelector('#start-button');
    const menu = document.querySelector('.menu');
    const overlay = document.querySelector('.overlay');
    const hideMenu = function () {
        overlay.classList.add('hide');
        menu.classList.add('hide');
    };
    const credits = document.getElementById('credits');
    const instruction = document.getElementById('instruction');
    const creditsMenu = document.querySelector('#credit-text');
    const instructionMenu = document.querySelector('#instruction-text');
    const menuButtons = document.querySelector('.menu-buttons');
    const backToMenu = document.querySelectorAll('.back-to-menu');

    instruction.addEventListener('click', function () {
        menuButtons.classList.add('hide');
        instructionMenu.classList.remove('hide')
    })

    credits.addEventListener('click', function (){
        menuButtons.classList.add('hide');
        creditsMenu.classList.remove('hide');
    })
    for(let i=0; i<backToMenu.length; i++) {
    backToMenu[i].addEventListener('click', function () {
        console.log("ok")
        menuButtons.classList.remove('hide');
        instructionMenu.classList.add('hide');
        creditsMenu.classList.add('hide');
    })}
    startGameButton.addEventListener('click', hideMenu);
}
