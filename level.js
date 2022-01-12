const width = 28;
let ballCount = 0;
let grid;
let scoreDisplay;
let createGrid = null;
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
'use strict';

const squares = [];
const BALL = 0;
const WALL = 1;
const SUPER = 3
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
      }
    }
  }
  createBoard()
})

export { width, ballCount, squares, grid, scoreDisplay, createGrid };
class Pacman{
    constructor(position, time=null, direction='', PowerPill=false, speed=0) {
        this.position = position;
        this.time = time;
        this.direction = direction;
        this.Powerpill = PowerPill
        this.speed = speed
    }

}
let pacmanCurrentIndex = 490

squares[pacmanCurrentIndex].classList.add('pac-man')


function move_pacman() {
        squares[pacmanCurrentIndex].classList.remove('pac-man')
        window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
            return;
        }
        switch (event.key) {
            case "a":
            case "ArrowLeft":
                if(pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex - 1].classList.contains('pieces_of_wall_horizontally') &&
                !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')) {
                    squares[pacmanCurrentIndex].classList.remove('pac-man')
                    pacmanCurrentIndex -= 1
                }
                break;
            case "w":
            case "ArrowUp":
                if(pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains('pieces_of_wall_horizontally') &&
                !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')) {
                    squares[pacmanCurrentIndex].classList.remove('pac-man')
                    pacmanCurrentIndex -= width
                }
                break;

            case "d":
            case "ArrowRight":
                if(pacmanCurrentIndex % width < width -1 && !squares[pacmanCurrentIndex + 1].classList.contains('pieces_of_wall_horizontally') &&
                !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')) {
                    squares[pacmanCurrentIndex].classList.remove('pac-man')
                    pacmanCurrentIndex += 1
                }
                break;
            case "s":
            case "ArrowDown":
                if(pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains('pieces_of_wall_horizontally') &&
                !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')) {
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
}

move_pacman()
document.addEventListener('keydown', move_pacman)
