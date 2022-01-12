'use strict';

const width = 28;
let ballCount = 0;
let grid;
let scoreDisplay;
let createGrid = null;
let ballPoints = 10;
let superPoints = 30;
export { width, ballCount, squares, grid, scoreDisplay, createGrid, move_pacman };
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
      } else if (layout[i] === GHOST_HOME) {
          squares[i].classList.add('home');
      }
    }
  }
  createBoard()
  squares[pacmanCurrentIndex].classList.add('pac-man')
})

class Pacman{
    constructor(position, time=null, direction='', superBall=false, speed=0) {
        this.position = position;
        this.time = time;
        this.direction = direction;
        this.superBall = superBall
        this.speed = speed
    }

}
let pacmanCurrentIndex = 490




function move_pacman(score, superBallActive) {
        squares[pacmanCurrentIndex].classList.remove('pac-man')
        window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
            return;
        }
        switch (event.key) {
            case "a":
            case "ArrowLeft":
                if(pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex - 1].classList.contains('pieces_of_wall_horizontally') &&
                !squares[pacmanCurrentIndex - width].classList.contains('home')) {
                    squares[pacmanCurrentIndex].classList.remove('pac-man')
                    pacmanCurrentIndex -= 1
                }
                break;
            case "w":
            case "ArrowUp":
                if(pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains('pieces_of_wall_horizontally') &&
                !squares[pacmanCurrentIndex - width].classList.contains('home')) {
                    squares[pacmanCurrentIndex].classList.remove('pac-man')
                    pacmanCurrentIndex -= width
                }
                break;

            case "d":
            case "ArrowRight":
                if(pacmanCurrentIndex % width < width -1 && !squares[pacmanCurrentIndex + 1].classList.contains('pieces_of_wall_horizontally') &&
                !squares[pacmanCurrentIndex + 1].classList.contains('home')) {
                    squares[pacmanCurrentIndex].classList.remove('pac-man')
                    pacmanCurrentIndex += 1
                }
                break;
            case "s":
            case "ArrowDown":
                if(pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains('pieces_of_wall_horizontally') &&
                !squares[pacmanCurrentIndex + width].classList.contains('home')) {
                    squares[pacmanCurrentIndex].classList.remove('pac-man')
                    pacmanCurrentIndex += width
                }
                break;

            default:
                return;
        }
        event.preventDefault();
    }, true);
    squares[pacmanCurrentIndex].classList.add('pac-man')
    eatBall(squares[pacmanCurrentIndex], score, superBallActive)
}

const eatBall = function (square, score, superBallActive) {
    if(square.classList.contains('ball')) {
        square.classList.remove('ball');
        score += ballPoints;
        ballCount ++;
    } else if (square.classList.contains('super')) {
        square.classList.remove('super');
        score += superPoints;
        ballCount ++;
        superBallActive = true;
    }
}


window.onload = function () {
    const startGameButton = document.querySelector('#start-button');
    const menu = document.querySelector('.menu');
    const overlay = document.querySelector('.overlay');
    const hideMenu = function () {
        overlay.classList.add('hide');
        menu.classList.add('hide');
    };
    startGameButton.addEventListener('click', hideMenu);
}

