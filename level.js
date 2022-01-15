'use strict';

const width = 28;
let ballCount = 0;
let grid;
let scoreDisplay;
let createGrid = null;
import {pacmanCurrentIndex} from "./pac_man";
import soundDot from './sounds/munch.wav';
import soundPill from './sounds/pill.wav';

let ballPoints = 10;
let superPoints = 30;
let score = 0;
let superBallActive = false;
export {width, ballCount, squares, grid, scoreDisplay, createGrid, score, eatBall, superBallActive};

const layout = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 2, 2, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
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

            if (layout[i] === BALL) {
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
    if (square.classList.contains('ball')) {
        playAudio(soundDot);
        square.classList.remove('ball');
        score += ballPoints;
        ballCount--;
    } else if (square.classList.contains('super')) {
        playAudio(soundPill);
        square.classList.remove('super');
        score += superPoints;
        ballCount--;
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
    const highScore = document.querySelector('#high-score');
    const highScoreMenu = document.querySelector('.menu-high-score');
    instruction.addEventListener('click', function () {
        menuButtons.classList.add('hide');
        instructionMenu.classList.remove('hide')
    })

    credits.addEventListener('click', function () {
        menuButtons.classList.add('hide');
        creditsMenu.classList.remove('hide');
    })

    highScore.addEventListener('click', function () {
        const highScores = JSON.parse(localStorage.getItem("scores"));
        menuButtons.classList.add('hide');
        highScoreMenu.classList.remove('hide');
        console.log(highScores)
        const scoresList = document.getElementById('top-five-scores')
        if (highScores !== null && highScores.length>0) {
            highScores.sort((a, b) => b.score - a.score)
            highScores.splice(5)
            const highScoreList = document.createElement('ol')
            scoresList.appendChild(highScoreList);
            highScoreList.setAttribute('id', 'high-score-list');
            for (let i=0; i<highScores.length; i++){
                const newListElement = document.createElement("li");
                newListElement.textContent = `${highScores[i].name}    ${highScores[i].score}`
                i=== 0 ? (newListElement.classList.add('score-result'), newListElement.classList.add('first-place')) :
                    newListElement.classList.add('score-result');
                highScoreList.appendChild(newListElement);
            }
        } else if (!document.querySelector('.no-result')){
            let noResults = document.createElement('div');
            let secRow = document.createElement('div');
            let thrRow = document.createElement('div');
            noResults.classList.add('no-result');
            secRow.classList.add('no-result');
            thrRow.classList.add('no-result');
            thrRow.classList.add('good-luck');
            noResults.textContent = "Unfortunately, no one has played this game yet."
            secRow.textContent = 'If you play you will have the first score! 🤓'
            thrRow.textContent = 'Stage is yours!'
            scoresList.appendChild(noResults);
            scoresList.appendChild(secRow);
            scoresList.appendChild(thrRow);
        }
    })
    for (let i = 0; i < backToMenu.length; i++) {
        backToMenu[i].addEventListener('click', function () {
            console.log("ok")
            menuButtons.classList.remove('hide');
            instructionMenu.classList.add('hide');
            creditsMenu.classList.add('hide');
            highScoreMenu.classList.add('hide');
            document.getElementById('high-score-list').remove()

        })
    }

    startGameButton.addEventListener('click', hideMenu);
}

function playAudio(audio) {
    const soundEffect = new Audio(audio);

    soundEffect.play();
}

