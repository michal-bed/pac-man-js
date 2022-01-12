
initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)

}

class Pacman{
    constructor(position, time=null, direction='', PowerPill=false, speed=0) {
        this.position = position;
        this.time = time;
        this.direction = direction;
        this.Powerpill = PowerPill
        this.speed = speed
    }

}
let PacmanCurrentIndex = 490

squares[pacmanCurrent]


function get_user_input() {
    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
            return;
        }
        switch (event.key) {
            case "s":
            case "ArrowDown":
                ""
                break;

            case "w":
            case "ArrowUp":
                console.log("MoveUp")
                break;
            case "a":
            case "ArrowLeft":
                return "MoveLeft";

            case "d":
            case "ArrowRight":
                return "MoveRight";

            default:
                return;
        }

        event.preventDefault();
    }, true);
}

get_user_input()