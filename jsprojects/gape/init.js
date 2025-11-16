let canvas = document.getElementById("canvas");
let canvas2 = document.getElementById("canvas2");
let canvas3 = document.getElementById("canvas3");
let ctx = canvas.getContext("2d");
let ctx2 = canvas2.getContext("2d");
let ctx3 = canvas3.getContext("2d");
let keys = [];
let friction = 0.8;
let gravity = 0.4;
let nnPerGen = 10;	
let nn = [];
let gatesAmt = 35;
let mouseX = 0;
let mouseY = 0;
let deathwall = -300;
let lastfitness = 0;
let temp = "standard";
canvas2.height = 500;
canvas2.width = 800;
canvas3.height = 200;
canvas3.width = 800;
let Level = {};

let blood = {
    amt: 100,
    x: [],
    y: [],
    velx: [],
    vely: [],
    size: 4,
    limit: 15,
    vector: [],
}

for (i=1; i<=nnPerGen; i++) {
	nn[i] = [];
	nn[i][0] = [];
	for (j=1; j<=gatesAmt; j++) {
		nn[i][j] = [];
		nn[i][j][1] = false;
	}
}

let obDim = 19; //must be odd

let eye = {
	amt: obDim**2,
	dist: 12,
}

let sensorOutput = [];

for (i = 0; i <= obDim; i++) {
	sensorOutput[i] = [];
}

generation = 1;

nnOut = {
	up: 0,
	left: 0,
	right: 0,
}
gateIn = {
	A: false,
	B: false,
}

networkNumber = 1;
//baseNet = nn[1];
	
baseNetwork = [];
baseNetwork[0] = [];
for (i=1; i<=gatesAmt; i++) {
	baseNetwork[i] = [];
	baseNetwork[i][1] = false;
}

baseNetwork[0][1] = 20;
baseNetwork[0][2] = -300;
evolveAmt = 1;
generationFitness = [0];
lastBaseNet = 0;
continuity = 0;

let player = {
	x: 0,
	y: 0,
	width: 10,
	height: 15,
	speed: 4,
	velX: 0,
	velY: 0,
	jumping: true,
	grounded: false
}