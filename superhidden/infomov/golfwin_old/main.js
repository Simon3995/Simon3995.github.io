//this file contains the main setup and main functions of the program

/*global variables*/

//canvas
var c = document.getElementById("c");
var ctx = c.getContext("2d");
c.width = 800;
c.height = 800;

var m = document.getElementById("m");
var mtx = m.getContext("2d");
m.width = c.width;
m.height = c.height;

var input;
var input = document.createElement('input');
input.type = 'file';

var moveResolution = 8;

//controller
var mouseX;
var mouseY;

//actual field setup
var field = new Field();
var ball = new Ball(field.startPosition.x, field.startPosition.y);
var winningMoves = [];
var settled = true;

//physics properties
var friction = 1.03;
var strength = 0.05;

// for measuring fps
let t_prev = 0;
let t_curr = 0;
let fps_hist = [];

/*run program*/
main();

function main() {
	newFrame(ball, field);
	if (ball.moveFrame(field, true)) mtx.clearRect(0,0,m.width,m.height);
	findHoleInOnes();
	
	ball.settle();
	iterateParticles();
	window.requestAnimationFrame(main);
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
function findHoleInOnes() {
	winningMoves = [];
	let ballCopy;
	for (let i=0; i<c.width; i+=moveResolution) {
		for (let j=0; j<c.height; j+=moveResolution) {
			for (let k=0; k<2; k++) {
				let randI = i+moveResolution*Math.random();
				let randJ = j+moveResolution*Math.random();
				ballCopy = ball.copy();
				ballCopy.velX = strength * (ballCopy.x - randI) / (1 - 1/friction);
				ballCopy.velY = strength * (ballCopy.y - randJ) / (1 - 1/friction);
				if (ballCopy.moveFrame(field, false)) {
					winningMoves.push({
						x: randI,
						y: randJ,
					})
				}
			}
		}
	}
}

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
		m.width = c.width;
		m.height = c.height;
		
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
		
		moveResolution = Math.round(2.49*Math.sqrt(field.walls.length) + 0.21);
	}
}