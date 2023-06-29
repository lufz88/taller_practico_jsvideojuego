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

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

let canvasSize;
let elementsSize;

const playerPosition = {
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
	startGame();
}

function startGame() {
	game.font = elementsSize + 'px Verdana';
	game.textAlign = 'start';

	const map = maps[0];
	const mapRows = map.trim().split('\n');
	const mapRowCols = mapRows.map(row => row.trim().split(''));

	game.clearRect(0, 0, canvasSize, canvasSize);

	mapRowCols.forEach((row, rowIndex) => {
		row.forEach((col, colIndex) => {
			const emoji = emojis[col];
			const posX = elementsSize * colIndex;
			const posY = elementsSize * rowIndex + elementsSize;

			if (playerPosition.x == undefined && col == 'O') {
				playerPosition.x = posX;
				playerPosition.y = posY;
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
	game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function moveUp() {
	if (playerPosition.y - elementsSize <= 0) {
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
