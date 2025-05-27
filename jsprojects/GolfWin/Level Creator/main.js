var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var mouseX;
var mouseY;
var mousedown = false;
setType("ball");
var tempx1;
var tempy1;
var temparc = {
	x: 0,
	y: 0,
	r: 0,
	sAngle: 0,
	eAngle: 0,
}

var grid = true;
var gridSize = 20;

var input;
var input = document.createElement('input');
input.type = 'file';

var field = {
	walls: [],
	arcs: [],
	goals: [],
	ball: {
		x: 40,
		y: 40,
	},
	canvas: {
		width: 500,
		height: 500,
	},
}
updateStats();

function update() {
	drawGrass();
	
	if (clickType == "delete") drawDelete();
	
	if (clickType == "angle") {
		//radius; line to starting angle
		ctx.globalAlpha = 0.2;
		ctx.strokeStyle = "blue";
		ctx.beginPath();
		ctx.moveTo(temparc.x, temparc.y);
		ctx.lineTo(temparc.x+1000*(gr(tempX)-temparc.x),
				   temparc.y+1000*(gr(tempY)-temparc.y));
		ctx.stroke();
		
		//line to cursor
		ctx.beginPath();
		ctx.moveTo(temparc.x, temparc.y);
		ctx.lineTo(temparc.x+1000*(gr(mouseX)-temparc.x),
				   temparc.y+1000*(gr(mouseY)-temparc.y));
		ctx.stroke();
		
		ctx.globalAlpha = 1;
		ctx.fillStyle = "orange";
		ctx.fillRect(gr(tempX)-3, gr(tempY)-3, 6, 6);
		ctx.fillRect(gr(mouseX)-3, gr(mouseY)-3, 6, 6);
		
		//arc
		ctx.strokeStyle = "red";
		ctx.beginPath();
		ctx.arc(temparc.x, temparc.y, temparc.r, temparc.sAngle, radianAngle(mouseX, mouseY, temparc.x, temparc.y));
		ctx.stroke();
	}
	
	drawWalls(field.walls);
	drawHoles(field.goals);
	drawArcs(field.arcs);
	drawBall();
	
	if (mousedown) {
		switch(clickType) {
			case "ball":
				field.ball.x = gr(mouseX);
				field.ball.y = gr(mouseY);
				drawBall();
				break;
			case "wall":
				ctx.strokeStyle = "black";
				ctx.beginPath();
				ctx.moveTo(tempx1, tempy1);
				ctx.lineTo(gr(mouseX), gr(mouseY));
				ctx.stroke();
				break;
			case "arc":
				ctx.strokeStyle = "blue";
				ctx.beginPath();
				ctx.moveTo(temparc.x, temparc.y);
				ctx.lineTo(gr(mouseX), gr(mouseY));
				ctx.stroke();
				break;
			case "hole":
				drawHoles([{x: gr(mouseX), y: gr(mouseY)}]);
				break;
			case "size":
				c.width = gr(mouseX);
				c.height = gr(mouseY);
				drawGrass();
				drawWalls(field.walls);
				drawHoles(field.goals);
				drawBall();
				break;
		}
	}
	
	if (grid) drawGrid();
	
	window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);