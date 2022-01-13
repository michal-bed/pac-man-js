import {squares, width, ballCount, score, eatBall} from "./level";
import gameWin from "./sounds/03. You Win!.wav";

let pacmanCurrentIndex = 490
export {move_pacman, pacmanCurrentIndex, pacman}

function move_pacman() {
    squares[pacmanCurrentIndex].classList.remove('pac-man')
    if (ballCount === 1) {
        you_win(pacman)
    }

    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
            return;
        }
        switch (event.key) {
            case "a":
            case "ArrowLeft":
                if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex - 1].classList.contains('pieces_of_wall_horizontally') &&
                    !squares[pacmanCurrentIndex - width].classList.contains('home')) {
                    squares[pacmanCurrentIndex].classList.remove('pac-man')
                    squares[pacmanCurrentIndex].setAttribute('style', 'transform: rotate(0deg);')
                    pacmanCurrentIndex -= 1
                    squares[pacmanCurrentIndex].setAttribute('style', 'transform: rotate(180deg);')
                }
                break;
            case "w":
            case "ArrowUp":
                if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains('pieces_of_wall_horizontally') &&
                    !squares[pacmanCurrentIndex - width].classList.contains('home')) {
                    squares[pacmanCurrentIndex].classList.remove('pac-man')
                    squares[pacmanCurrentIndex].setAttribute('style', 'transform: rotate(0deg)')
                    pacmanCurrentIndex -= width
                    squares[pacmanCurrentIndex].setAttribute('style', 'transform: rotate(270deg)')
                }
                break;

            case "d":
            case "ArrowRight":
                if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex + 1].classList.contains('pieces_of_wall_horizontally') &&
                    !squares[pacmanCurrentIndex + 1].classList.contains('home')) {
                    squares[pacmanCurrentIndex].setAttribute('style', 'transform: rotate(0deg)')
                    squares[pacmanCurrentIndex].classList.remove('pac-man')
                    pacmanCurrentIndex += 1
                }
            
                break;
            case "s":
            case "ArrowDown":
                if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains('pieces_of_wall_horizontally') &&
                    !squares[pacmanCurrentIndex + width].classList.contains('home')) {
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
    eatBall(squares[pacmanCurrentIndex])

    if((pacmanCurrentIndex - 1) === 363) {
        squares[pacmanCurrentIndex].classList.remove('pac-man')
        pacmanCurrentIndex = 391
        squares[pacmanCurrentIndex].classList.add('pac-man')
        eatBall(squares[pacmanCurrentIndex])
    }
    else if ((pacmanCurrentIndex +1) === 392) {
        squares[pacmanCurrentIndex].classList.remove('pac-man')
        pacmanCurrentIndex = 364
        squares[pacmanCurrentIndex].classList.add('pac-man')
        eatBall(squares[pacmanCurrentIndex])
    }
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

function you_win(pacman) {
    playAudio(gameWin);
    document.querySelector(".game_win").classList.remove('hide');
    document.querySelector(".overlay").classList.remove('hide');
    var info = document.getElementById('score2');
    var HTML = `<div>Your Score: ${score}</div>`;
    info.innerHTML = HTML;
}

function playAudio(audio) {
    const soundEffect = new Audio(audio);
    soundEffect.play();
}

