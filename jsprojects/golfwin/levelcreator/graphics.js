function drawGrass() {
	ctx.fillStyle = "#68b55b"
	ctx.fillRect(0,0,c.width,c.height);
}

function drawWalls(walls) {
	ctx.lineWidth = 2;
	for (const wall of walls) {
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.moveTo(wall.x1, wall.y1);
		ctx.lineTo(wall.x2, wall.y2);
		ctx.stroke();
	}
}

function drawHoles(goals) {
	for (const goal of goals) {
		//draw hole
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.arc(goal.x, goal.y, 10, 0, Math.PI*2);
		ctx.fill();
		
		//draw flag
		ctx.fillStyle = "red";
		ctx.beginPath();
		ctx.moveTo(goal.x, goal.y - 50);
		ctx.lineTo(goal.x - 20, goal.y - 40);
		ctx.lineTo(goal.x, goal.y - 30);
		ctx.fill();
		//draw flagpole
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.moveTo(goal.x, goal.y);
		ctx.lineTo(goal.x, goal.y - 50);
		ctx.stroke();
	}
}

function drawArcs(arcs) {
	for (const arc of arcs) {
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.arc(arc.x, arc.y, arc.r, arc.sAngle, arc.eAngle);
		ctx.stroke();
		
		ctx.fillStyle = "orange";
		ctx.fillRect(arc.x-3, arc.y-3, 6, 6);
	}
}

function drawBall() {
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.arc(field.ball.x, field.ball.y, 7, 0, Math.PI*2);
	ctx.fill();
}

function drawGrid() {
	ctx.fillStyle = "white";
	for (let i=0; i<c.width; i+=gridSize) {
		for (let j=0; j<c.height; j+=gridSize) {
			ctx.fillRect(i-1,j-1,2,2);
		}
	}
}

function drawDelete() {
	//walls
	ctx.strokeStyle = "#c94951";
	ctx.fillStyle = "#c94951";
	ctx.lineWidth = 6;
	for (const wall of field.walls) {
		if (distLinePoint(wall, {x: mouseX, y: mouseY}) <= 10) {
			ctx.beginPath();
			ctx.moveTo(wall.x1, wall.y1);
			ctx.lineTo(wall.x2, wall.y2);
			ctx.stroke();
		}
	}
	ctx.lineWidth = 2;
	
	//holes
	for (const hole of field.goals) {
		if (Math.sqrt((hole.x-mouseX)**2 + (hole.y-mouseY)**2) <= 15) {
			ctx.beginPath();
			ctx.arc(hole.x, hole.y, 14, 0, 2*Math.PI);
			ctx.fill();
		}
	}
	
	//arcs
	ctx.globalAlpha = 0.6;
	for (const arc of field.arcs) {
		if (Math.sqrt((arc.x-mouseX)**2 + (arc.y-mouseY)**2) <= 20) {
			ctx.beginPath();
			ctx.arc(arc.x, arc.y, arc.r, arc.sAngle, arc.eAngle);
			ctx.lineTo(arc.x, arc.y);
			ctx.fill();
		}
	}
	ctx.globalAlpha = 1;
}