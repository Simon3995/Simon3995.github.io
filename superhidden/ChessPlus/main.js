// main chessboard
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
c.style.opacity = "100";

// white monitor
let mw = document.getElementById("mw");
let mwctx = mw.getContext("2d");
// black monitor
let mb = document.getElementById("mb");
let mbctx = mb.getContext("2d");
// prompts canvas
let prc = document.getElementById("promptsCanvas");
let prctx = prc.getContext("2d");

let pieces = [];
let select = {
	color: "",
	type: "",
	num: 0,
	x: 0,
	y: 0,
	active: false,
	unmoved: true,
	dragging: false,
};

let selectAnimation = 0;
let movesAnimation = 0;
let sl = 3; // animation slowness
let possibleMoves = [];
let promoting = false;
let blurAmt = 0;
let clickCoords;

// track last move for en passant check
let lastmove = {
	x: 0,
	y: 0,
	doublepawn: false,
}

window.onload = function() {
	createPieces();
	initializePieces();
	update();
};

const update = function() {
	drawChessboard();
	drawSelection();
	drawMoves();
	drawPieces();
	
	drawPromotionPrompt();
	blurBoard();
	
	window.requestAnimationFrame(update);
}

resize();