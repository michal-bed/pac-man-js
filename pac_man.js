import {squares, width, ballCount, score, eatBall} from "./level";
import soundGameOver from "./sounds/death.wav";
import gameWin from "./sounds/03. You Win!.wav";


let pacmanCurrentIndex = 490
export {move_pacman, pacmanCurrentIndex, pacman}

function move_pacman(superBallActive) {
    squares[pacmanCurrentIndex].classList.remove('pac-man')
    if (ballCount === 270) {
        gameOver(pacman)
    }

    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
            return;
        }
        switch (event.key) {
            case "a":
            case "ArrowLeft":
                if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex - 1].classList.contains('pieces_of_wall_horizontally') &&
                    !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')) {
                    squares[pacmanCurrentIndex].classList.remove('pac-man')
                    squares[pacmanCurrentIndex].setAttribute('style', 'transform: rotate(0deg);')
                    pacmanCurrentIndex -= 1
                    squares[pacmanCurrentIndex].setAttribute('style', 'transform: rotate(180deg);')
                }
                if ((pacmanCurrentIndex - 1) === 363) {
                    pacmanCurrentIndex = 391
                }
                break;
            case "w":
            case "ArrowUp":
                if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains('pieces_of_wall_horizontally') &&
                    !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')) {
                    squares[pacmanCurrentIndex].classList.remove('pac-man')
                    squares[pacmanCurrentIndex].setAttribute('style', 'transform: rotate(0deg)')
                    pacmanCurrentIndex -= width
                    squares[pacmanCurrentIndex].setAttribute('style', 'transform: rotate(270deg)')
                }
                break;

            case "d":
            case "ArrowRight":
                if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex + 1].classList.contains('pieces_of_wall_horizontally') &&
                    !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')) {
                    squares[pacmanCurrentIndex].setAttribute('style', 'transform: rotate(0deg)')
                    squares[pacmanCurrentIndex].classList.remove('pac-man')
                    pacmanCurrentIndex += 1
                }
                if ((pacmanCurrentIndex + 1) === 392) {
                    pacmanCurrentIndex = 364
                }
                break;
            case "s":
            case "ArrowDown":
                if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains('pieces_of_wall_horizontally') &&
                    !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')) {
                    squares[pacmanCurrentIndex].classList.remove('pac-man')
                    squares[pacmanCurrentIndex].setAttribute('style', 'transform: rotate(0deg)')
                    pacmanCurrentIndex += width
                    squares[pacmanCurrentIndex].setAttribute('style', 'transform: rotate(90deg)')
                }
                break;

            default:
                return;
        }

        event.preventDefault();
    }, true);
    squares[pacmanCurrentIndex].classList.add('pac-man')
    eatBall(squares[pacmanCurrentIndex], superBallActive)
}

class pacman {
    constructor(position = 490, time = null, direction = '', superBall = false, speed = 0) {
        this.position = position;
        this.time = time;
        this.direction = direction;
        this.superBall = superBall
        this.speed = speed
    }

}

function gameOver(pacman) {
    playAudio(gameWin);
    document.querySelector(".game_over").classList.remove('hide');

}

function playAudio(audio) {
    const soundEffect = new Audio(audio);
    soundEffect.play();
}

