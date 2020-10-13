
const eggImg = new Image();
eggImg.src = '/images/egg.png';

const basketImg = new Image();
basketImg.src = '/images/shopping-basket.png';

const foxLookingLeftImg = new Image();
foxLookingLeftImg.src = '/images/fox-looking-left-transparent.png';

const foxLookingRightImg = new Image();
foxLookingRightImg.src = '/images/fox-looking-right-transparent.png';

const henLookingLeftImg = new Image();
henLookingLeftImg.src = '/images/hen-looking-left.png';

const henLookingRightImg = new Image();
henLookingRightImg.src = '/images/hen-looking-right.png';

const brokenEggBlack = new Image();
brokenEggBlack.src = '/images/broken-egg-black.png';

const sleepingFox = new Image();
sleepingFox.src = '/images/fox-sleeping-transparent.png';

const foxStart = new Image();
foxStart.src = '/images/fox-start-transparent.png';


class FoxCanvas {
    constructor() {
        this.context = document.getElementById('fox-catching-eggs').getContext('2d');
    }

    createBord() {
        this.context.clearRect(0, 0, 800, 600);
    }


    drawInitialPage() {

        const imgScale = 730 / 929;
        this.context.drawImage(foxStart, 260, 60, 350 * imgScale, 350);
        this.context.font = '30px Montserrat';
        this.context.fillStyle = '#2B171F';
        this.context.fillText('WANNA HELP THE FOX TO CATCH SOME EGGS?', 38, 500);
    }

    drawUserName(userName) {
        this.context.font = '32px Montserrat';
        this.context.fillStyle = '#ED494B';
        this.context.fillText(userName, 50, 60);
    }

    drawPerches() {

        const posX = 0;
        const posY = 248;

        this.context.strokeStyle = '#56130A';
        this.context.lineWidth = 3;

        // perch on the left
        this.context.beginPath();
        this.context.moveTo(posX, posY);
        this.context.lineTo(posX + 75, posY);
        this.context.moveTo(posX + 75, posY);
        this.context.lineTo(posX + 250, posY + 122);
        this.context.stroke();
        this.context.closePath();

        // perch on the right
        this.context.beginPath();
        this.context.moveTo(posX + 550, posY + 122);
        this.context.lineTo(posX + 725, posY);
        this.context.moveTo(posX + 725, posY);
        this.context.lineTo(posX + 800, posY);
        this.context.stroke();
        this.context.closePath();
    }

    drawChickens() {
        this.context.drawImage(henLookingRightImg, 5, 130, 120, 120);
        this.context.drawImage(henLookingLeftImg, 675, 130, 120, 120);
    }

    drawGround() {

        this.context.fillStyle = '#FBD9B5';
        this.context.beginPath();
        this.context.moveTo(0, 550);
        this.context.arcTo(400, 450, 800, 550, 750);
        this.context.lineTo(800, 550);
        this.context.fill();
        this.context.closePath();
        this.context.fillRect(0, 550, 800, 50);
    }

    drawLeftChances(numOfChances) {

        /*
        initial code in the basic version of the game, which was getting the number of left chances as paramether
        for loop was checking number of left chances and removing lost chances (eggs) / redrawing number of left chances (eggs)

        for (let i = 0; i < numOfChances; i++) { 
            this.context.drawImage(eggImg, 400 + 50 * i, 30, 40, 40);
        }

        */

        // advanced version 

        for (let i = 0; i < 5; i++) {
            this.context.drawImage(eggImg, 400 + 50 * i, 30, 40, 40);
        }

        // note: keeping numOfChances always equal to 5 will keep 5 white eggs on canvas and cover them with black ones, when they will be drawn

        for (let c = 0; c < 5 - numOfChances; c++) {
            this.context.drawImage(brokenEggBlack, 400 + 50 * c, 30, 40, 40);
        }

    }

    drawEgg(egg) {

        const eggPosition = egg.position;
        const perchNum = egg.perchNum;

        const eggPosX = 85;
        const eggPosY = 231;

        const eggWidth = 30;
        const eggHeight = 30;

        // perchNum0 on the left
        if (eggPosition === 0 && perchNum === 0) {
            this.context.drawImage(eggImg, eggPosX, eggPosY, eggWidth, eggHeight);
        }
        else if (eggPosition === 1 && perchNum === 0) {
            this.context.drawImage(eggImg, eggPosX + 30, eggPosY + 21, eggWidth, eggHeight);
        }
        else if (eggPosition === 2 && perchNum === 0) {
            this.context.drawImage(eggImg, eggPosX + 60, eggPosY + 42, eggWidth, eggHeight);
        }
        else if (eggPosition === 3 && perchNum === 0) {
            this.context.drawImage(eggImg, eggPosX + 90, eggPosY + 63, eggWidth, eggHeight);
        }
        else if (eggPosition === 4 && perchNum === 0) {
            this.context.drawImage(eggImg, eggPosX + 120, eggPosY + 84, eggWidth, eggHeight);
        }
        else if (eggPosition === 5 && perchNum === 0) {
            this.context.drawImage(eggImg, eggPosX + 150, eggPosY + 105, eggWidth, eggHeight);
        }
        else if (eggPosition === 6 && perchNum === 0) {
            this.context.drawImage(eggImg, eggPosX + 170, eggPosY + 146, eggWidth, eggHeight);
        }
        else if (eggPosition === 7 && perchNum === 0) {
            this.context.drawImage(eggImg, eggPosX + 170, eggPosY + 235, eggWidth, eggHeight);
        }
        else if (eggPosition === 8 && perchNum === 0) {
            this.context.drawImage(eggImg, eggPosX + 170, eggPosY + 285, eggWidth, eggHeight);
        }

        // perchNum1 on the right
        else if (eggPosition === 0 && perchNum === 1) {
            this.context.drawImage(eggImg, eggPosX + 600, eggPosY, eggWidth, eggHeight);
        }
        else if (eggPosition === 1 && perchNum === 1) {
            this.context.drawImage(eggImg, eggPosX + 570, eggPosY + 21, eggWidth, eggHeight);
        }
        else if (eggPosition === 2 && perchNum === 1) {
            this.context.drawImage(eggImg, eggPosX + 540, eggPosY + 42, eggWidth, eggHeight);
        }
        else if (eggPosition === 3 && perchNum === 1) {
            this.context.drawImage(eggImg, eggPosX + 510, eggPosY + 63, eggWidth, eggHeight);
        }
        else if (eggPosition === 4 && perchNum === 1) {
            this.context.drawImage(eggImg, eggPosX + 480, eggPosY + 84, eggWidth, eggHeight);
        }
        else if (eggPosition === 5 && perchNum === 1) {
            this.context.drawImage(eggImg, eggPosX + 450, eggPosY + 105, eggWidth, eggHeight);
        }
        else if (eggPosition === 6 && perchNum === 1) {
            this.context.drawImage(eggImg, eggPosX + 430, eggPosY + 146, eggWidth, eggHeight);
        }
        else if (eggPosition === 7 && perchNum === 1) {
            this.context.drawImage(eggImg, eggPosX + 430, eggPosY + 235, eggWidth, eggHeight);
        }
        else if (eggPosition === 8 && perchNum === 1) {
            this.context.drawImage(eggImg, eggPosX + 430, eggPosY + 285, eggWidth, eggHeight);
        }

    }

    drawBasket(basket) {

        const basketPosition = basket.position;

        if (basketPosition === 0) {
            this.context.drawImage(basketImg, 260, 360, 80, 80); // x axis  = pos 6

        } else if (basketPosition === 1) {
            this.context.drawImage(basketImg, 460, 360, 80, 80); // x axis  = pos 6  
        }
    }

    drawFox(basket) {

        const basketPosition = basket.position;

        const imgScale = 841 / 875;

        if (basketPosition === 0) {
            this.context.drawImage(foxLookingLeftImg, 280, 250, 250 * imgScale, 250);

        } else if (basketPosition === 1) {
            this.context.drawImage(foxLookingRightImg, 280, 250, 250 * imgScale, 250);
        }
    }


    drawWon() {
        this.context.clearRect(0, 0, 800, 600);
        const imgScale = 903 / 467;
        this.context.drawImage(sleepingFox, 200, 150, 200 * imgScale, 200);
        this.context.font = '45px Montserrat';
        this.context.textAlign = 'center';
        this.context.fillStyle = '#2B171F';
        this.context.fillText('GREAT JOB!', 400, 450);
    }

    drawGameOver() {
        this.context.clearRect(0, 0, 800, 600);
        this.context.drawImage(henLookingLeftImg, 350, 140, 300, 300);
        this.context.font = '50px Montserrat';
        this.context.fillStyle = '#2B171F';
        this.context.fillText('GAME', 180, 300);
        this.context.fillText('OVER!', 180, 365);
    }


}


