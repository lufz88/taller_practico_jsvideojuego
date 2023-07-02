// Algunos apuntes sobre Canvas

// game.fillRect(0, 0, 100, 100); // crear un rectángulo (x,y,w,h) (inicio en X, inicio en Y, ancho, alto)
// game.clearRect(0, 0, 50, 50); // borra en forma rectangular

// game.font = '25px Verdana'; // se usan como propiedades
// game.fillStyle = 'purple'; // sirve tanto para fuentes como para formas
// game.fillText('Platzi', 25, 25); // llenar con texto, (texto, X, Y)
// game.textAlign = 'left'; // con 'left' el texto iniciará en la posicion X que determinamos, con 'right' terminará en la posición X que determinamos, con 'center' ubicará al texto centrado en relación a la posición que determinamos

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const livesCounter = document.querySelector('#lives');
const timeCounter = document.querySelector('#time');

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;
let bombArr;

let timeStart;
let timePlayed;
let record;
let localStorageRecord = localStorage.getItem('record');

const playerPosition = {
	x: undefined,
	y: undefined,
};

const giftPosition = {
	x: undefined,
	y: undefined,
};

const bombPosition = {
	x: undefined,
	y: undefined,
};

function setCanvasSize() {
	window.innerHeight > window.innerWidth
		? (canvasSize = window.innerWidth * 0.75)
		: (canvasSize = window.innerHeight * 0.75);

	canvas.setAttribute('width', canvasSize);
	canvas.setAttribute('height', canvasSize);

	elementsSize = canvasSize / 10 - 1.25;
	playerPosition.x = undefined;
	startGame();
}

function startGame() {
	game.font = elementsSize + 'px Verdana';
	game.textAlign = 'start';
	showLives();

	const map = maps[level];

	if (!map) {
		gameWin();
		return;
	}

	if (!timeStart) {
		timeStart = Date.now();
		timePlayed = setInterval(showTime, 100);
	}

	const mapRows = map.trim().split('\n');
	const mapRowCols = mapRows.map(row => row.trim().split(''));
	bombArr = [];

	game.clearRect(0, 0, canvasSize, canvasSize);

	mapRowCols.forEach((row, rowIndex) => {
		row.forEach((col, colIndex) => {
			let emoji = emojis[col];
			const posX = elementsSize * colIndex;
			const posY = elementsSize * rowIndex + elementsSize;

			if (playerPosition.x == undefined && col == 'O') {
				playerPosition.x = posX;
				playerPosition.y = posY;
			}

			if (col == 'I') {
				giftPosition.x = posX;
				giftPosition.y = posY;
			}

			if (col == 'X') {
				bombArr.push({ x: posX, y: posY });
			}

			if (posX == bombPosition.x && posY == bombPosition.y) {
				emoji = emojis['BOMB_COLLISION'];
				bombPosition.x = undefined;
				bombPosition.y = undefined;
			}

			game.fillText(emoji, posX, posY);
		});
	});

	movePlayer();
}

btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
window.addEventListener('keydown', moveByKey);

function movePlayer() {
	checkGiftCollision() && levelUp();

	checkBombCollision() && restartLevel();

	game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function moveUp() {
	if (playerPosition.y - elementsSize <= 20) {
		return;
	} else {
		playerPosition.y -= elementsSize;
	}
	startGame();
}

function moveDown() {
	if (playerPosition.y + elementsSize >= canvasSize) {
		return;
	} else {
		playerPosition.y += elementsSize;
	}
	startGame();
}

function moveLeft() {
	if (playerPosition.x <= 0) {
		return;
	} else {
		playerPosition.x -= elementsSize;
	}
	startGame();
}

function moveRight() {
	if (playerPosition.x + elementsSize * 2 >= canvasSize) {
		return;
	} else {
		playerPosition.x += elementsSize;
	}
	startGame();
}

function moveByKey(event) {
	if (event.code == 'ArrowUp') {
		moveUp();
	} else if (event.code == 'ArrowDown') {
		moveDown();
	} else if (event.code == 'ArrowLeft') {
		moveLeft();
	} else if (event.code == 'ArrowRight') {
		moveRight();
	}
}

function checkGiftCollision() {
	playerPosition.x < 0 && (playerPosition.x = 0);
	const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
	const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);

	return giftCollisionX && giftCollisionY;
}

function checkBombCollision() {
	const bombCollision = bombArr.find(bomb => {
		const xCollision = bomb.x.toFixed(3) == playerPosition.x.toFixed(3);
		const yCollision = bomb.y.toFixed(3) == playerPosition.y.toFixed(3);
		if (xCollision && yCollision) {
			bombPosition.x = bomb.x;
			bombPosition.y = bomb.y;
		}

		return xCollision && yCollision;
	});

	return bombCollision;
}

function levelUp() {
	level++;
	startGame();
}

function restartLevel() {
	playerPosition.x = undefined;
	lives--;
	gameOver();
	startGame();
}

function gameOver() {
	if (lives == 0) {
		level = 0;
		lives = 3;
		timeStart = undefined;
		clearInterval(timePlayed);
	}
}

function gameWin() {
	record = ((Date.now() - timeStart) / 1000).toFixed(2) + 's';
	!localStorageRecord && localStorage.setItem('record', record);
	record < localStorageRecord && localStorage.setItem('record', record);
	clearInterval(timePlayed);
}

function showLives() {
	livesCounter.innerText =
		emojis['HEART'].repeat(lives) + emojis['EMPTY_HEART'].repeat(3 - lives);
}

function showTime() {
	timeCounter.innerHTML = ((Date.now() - timeStart) / 1000).toFixed(2) + 's';
}
