//this file contains the main setup and main functions of the program

/*global variables*/
var input;
var input = document.createElement('input');
input.type = 'file';

var moveResolutionConstant = 3;
var moveResolution = moveResolutionConstant;

//controller
var mouseX;
var mouseY;

//actual field setup
var field = new Field();
var ball = new Ball(field.startPosition.x, field.startPosition.y);
var winningMoves = [];
var settled = true;

//other
const THREAD_AMT = Math.max(1, navigator.hardwareConcurrency - 2); // leave some threads for the rest of us
let workersCompleted = 0;
const workers = [];
for (let i = 0; i < THREAD_AMT; i++) {
	var worker = new Worker('worker.js');
	worker.onmessage = handleWorkerMessage;
	workers.push(worker);
}
let startTime;

function handleWorkerMessage(event) {
	var workerHoleInOnes = event.data;
	winningMoves = winningMoves.concat(workerHoleInOnes);
	workersCompleted++;

	if (workersCompleted === THREAD_AMT) {
		// All workers finished, continue with the rest of the main loop
		workersCompleted = 0;
		newFrame(ball, field);
		ball.moveFrame(field, true);
		ball.settle();
		iterateParticles();
		
		// dynamically change moveResolution to fix performance
		let curTime = new Date();
		if (curTime - startTime > 17) {
			moveResolution++;
		} else if (curTime - startTime < 15) {
			moveResolution = Math.max(1, moveResolution - 1);
		}
		window.requestAnimationFrame(main);
	}
}

/*run program*/
main();

function main() {
	startTime = new Date();
	winningMoves = [];
	workersCompleted = 0;
	for (let i = 0; i < THREAD_AMT; i++) {
		const data = {
			ball,
			field,
			startX: i * c.width / THREAD_AMT,
			endX: (i + 1) * c.width / THREAD_AMT,
			height: c.height,
			stepSize: moveResolution,
			strength,
			friction
		};
		workers[i].postMessage(data);
	}
}

//event listeners
window.addEventListener("mousemove", function (evt){
	mouseX = evt.clientX - c.getBoundingClientRect().left;
	mouseY = evt.clientY - c.getBoundingClientRect().top;
});

window.addEventListener("mousedown", function (evt){
	if (keys[17] ||
		isHover(document.getElementById("load")))
		return;
	ball.hit(mouseX, mouseY);
});

//keys
var keys = [];
window.onkeyup = function(e) { keys[e.keyCode] = false; }
window.onkeydown = function(e) { keys[e.keyCode] = true; }

//buttons
function loadLevel() {
	input.click();
}

function isHover(e) {
	return (e.parentElement.querySelector(':hover') === e);
}

input.onchange = e => { 
	// getting a hold of the file reference
	var file = e.target.files[0]; 

	// setting up the reader
	var reader = new FileReader();
	reader.readAsText(file,'UTF-8');

	// here we tell the reader what to do when it's done reading...
	reader.onload = readerEvent => {
		var content = readerEvent.target.result; // this is the content!
		//console.log(content);
		field = JSON.parse(content);
		for (let i=0; i<field.walls.length; i++) {
			field.walls[i] = new Wall(field.walls[i].x1, field.walls[i].y1, field.walls[i].x2, field.walls[i].y2);
		}
		c.width = field.canvas.width;
		c.height = field.canvas.height;

		//set goal radii
		for (goal of field.goals) {
			goal.r = 10;
		}
		
		//set startposition
		field.startPosition = field.ball;
		ball.x = field.startPosition.x;
		ball.y = field.startPosition.y;
		ball.velX = 0;
		ball.velY = 0;
		
		// keeps speed *roughly* similar no matter the map
		// this is just an initial guess, it will change dynamically
		moveResolution = Math.round(moveResolutionConstant * (c.width * c.height * field.walls.length / 800 / 800 / 9) ** (1/3));
		moveResolution = Math.max(1, moveResolution);

		// clear before loading new webgl context
		gl.clear(gl.COLOR_BUFFER_BIT);
		loadWebGLProgram();
	}
}