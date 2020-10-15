class Basket {
    constructor() {
        this.position = 0;
    }
}

class Egg {
    constructor(perchNum) {
        this.position = 0;
        this.perchNum = perchNum;
    }
}

// which actions happen on the game field
class GameState {
    constructor(userName) {
        this.basket = new Basket();
        this.eggs = [];
        this.score = 0;
        this.leftChances = 5;
        this.speed = 130;
        this.userName = userName;
    }
}

class GameLogic {
    constructor(userName) {
        this.canvas = new FoxCanvas();
        this.startGame(userName);
    }

    startGame(userName) {
        this.state = new GameState(userName);
        this.drawState(); // all canvas draw methods inside one method defined below

        const keyEventHandler = event => this.moveBasket(event.keyCode);
        document.addEventListener("keydown", keyEventHandler);
        this.stopKeyEvents = () => document.removeEventListener("keydown", keyEventHandler); // to stop moving basket and fox after winning

        this.intervalID = setInterval(() => this.progress(), this.state.speed);

        // inside of these function number of points is always 0
        // number of points will change after the function countPoints() it's called 
        // adding here conditions – which speed to apply depending on the number of points – won't change the speed!

        document.getElementById('start-button').setAttribute('disabled', 'disabled');
    }

    drawState() {
        this.canvas.createBord();
        this.canvas.drawUserName(this.state.userName);
        this.canvas.drawPerches();
        this.canvas.drawChickens();
        this.canvas.drawGround();

        //cheat for reseting the chances left
        document.addEventListener("keydown", event => {
            if (event.key === 'h') {
                this.state.leftChances = 5;
            }
        });

        this.canvas.drawLeftChances(this.state.leftChances);
        this.canvas.drawBasket(this.state.basket);
        this.canvas.drawFox(this.state.basket);
        this.state.eggs.forEach(egg => this.canvas.drawEgg(egg));
        // this.state.eggs.forEach(this.canvas.drawEgg);
        document.getElementById('score').innerText = this.state.score;
    }

    progress() {
        this.moveEggs();
        this.countPoints();
        this.updateSpeed();
        this.checkTheWinner();
        this.checkTheLoser();
        this.drawState();
    }

    moveBasket(keyCode) {
        if (keyCode === 37) {
            this.state.basket.position = 0;
        } else if (keyCode === 39) {
            this.state.basket.position = 1;
        }
        this.countPoints();
        this.checkTheWinner();
        this.drawState();
    }


    moveEggs() {
        this.state.eggs.forEach((egg, eggIndex) => {
            egg.position++;

            if (egg.position > 9) {
                this.state.eggs.splice(eggIndex, 1); // to delete the egg which hits the ground
            }
        });

        if (this.state.eggs.length === 0) {
            this.state.eggs.push(new Egg(Math.round(Math.random()))); // to randomly decide where the next egg will appear
        }

        if (this.state.score >= 20 && this.state.eggs.filter(egg => egg.position === 4).length > 0) {
            this.state.eggs.push(new Egg(Math.round(Math.random()))); // 2nd level: 2 eggs falling down in the same moment 
        }

    }

    countPoints() {

        this.state.eggs
            .filter(egg => egg.position === 6) // to filter eggs on the pos 6
            .forEach(egg => {
                if ((this.state.basket.position === 0 && egg.perchNum === 0) || (this.state.basket.position === 1 && egg.perchNum === 1)) {
                    this.state.score++;

                    const eggIndex = this.state.eggs.indexOf(egg);
                    this.state.eggs.splice(eggIndex, 1); // to delete the egg which was catched and should not be visible anymore 
                }
            });


        this.state.eggs
            .filter(egg => egg.position === 8) // to filter eggs on the pos 8
            .forEach(egg => this.state.leftChances--); // to be changed in advanced version

    }

    updateSpeed() {

        if (this.state.score == 7) {
            this.state.speed = 120;
            window.clearInterval(this.intervalID);
            this.intervalID = setInterval(() => this.progress(), this.state.speed);
        } else if (this.state.score == 15) {
            this.state.speed = 110;
            window.clearInterval(this.intervalID);
            this.intervalID = setInterval(() => this.progress(), this.state.speed);
        } else if (this.state.score == 25) {
            this.state.speed = 100;
            window.clearInterval(this.intervalID);
            this.intervalID = setInterval(() => this.progress(), this.state.speed);
        }
    }


    checkTheWinner() {
        if (this.state.score === 50) {
            this.stopKeyEvents();
            window.clearInterval(this.intervalID);
            this.drawState(); // it cac but it doesn't have to be here
            document.getElementById('start-button').removeAttribute('disabled');
            document.getElementById('background-music').pause();
            setTimeout(() => this.canvas.drawWon(), 500); // even if the value for setTimeout would be 0, comp would wait with the execution of this code
        }
    }

    checkTheLoser() {
        if (this.state.leftChances === 0) {
            this.stopKeyEvents();
            window.clearInterval(this.intervalID);
            this.state.eggs = [];
            this.drawState(); // it cac but it doesn't have to be here
            document.getElementById('start-button').removeAttribute('disabled');
            document.getElementById('background-music').pause();
            setTimeout(() => this.canvas.drawGameOver(), 500);
        }
    }

}

window.onload = () => {
    new FoxCanvas().drawInitialPage();
    // document.getElementById('cover-together').hidden = true;
};

document.getElementById('start-button').addEventListener('click', () => document.getElementById('cover-together').hidden = false);

document.getElementById('catch-button').addEventListener('click', () => {
    const userName =  document.getElementById('user-name').value.toUpperCase();
    document.getElementById('cover-together').hidden = true;
    document.getElementById('background-music').play();

    // document.getElementById('background-music').setAttribute('autoplay', 'autoplay'); 
    // this will set the attribute but will not play
    new GameLogic(userName);
});