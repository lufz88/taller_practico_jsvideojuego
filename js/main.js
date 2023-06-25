// Algunos apuntes sobre Canvas

// game.fillRect(0, 0, 100, 100); // crear un rectángulo (x,y,w,h) (inicio en X, inicio en Y, ancho, alto)
// game.clearRect(0, 0, 50, 50); // borra en forma rectangular

// game.font = '25px Verdana'; // se usan como propiedades
// game.fillStyle = 'purple'; // sirve tanto para fuentes como para formas
// game.fillText('Platzi', 25, 25); // llenar con texto, (texto, X, Y)
// game.textAlign = 'left'; // con 'left' el texto iniciará en la posicion X que determinamos, con 'right' terminará en la posición X que determinamos, con 'center' ubicará al texto centrado en relación a la posición que determinamos

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

let canvasSize;
let elementsSize;

function setCanvasSize() {
	if (window.innerHeight > window.innerWidth) {
		canvasSize = window.innerWidth * 0.75;
	} else {
		canvasSize = window.innerHeight * 0.75;
	}

	canvas.setAttribute('width', canvasSize);
	canvas.setAttribute('height', canvasSize);

	elementsSize = canvasSize / 10 - 1.25;
	startGame();
}

function startGame() {
	game.font = elementsSize + 'px Verdana';
	game.textAlign = 'left';
	for (let y = 0; y < 10; y++) {
		for (let i = 0; i < 10; i++) {
			game.fillText(emojis['X'], elementsSize * i, elementsSize * y + elementsSize);
		}
	}
}
