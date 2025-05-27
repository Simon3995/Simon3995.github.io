//this file contains functions for drawing on the HTML canvas

function newFrame(ball, field) {
	ctx.lineWidth = 2;
	//create green field
	ctx.fillStyle = "#68b55b";
	ctx.fillRect(0, 0, c.width, c.height);
	//draw all walls
	for (const wall of field.walls) {
		wall.draw();
	}
	//draw holes
	ctx.fillStyle = "black";
	for (const goal of field.goals) {
		ctx.beginPath();
		ctx.arc(goal.x, goal.y, goal.r, 0, tau);
		ctx.fill();
	}
	//draw ball
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.r, 0, 2*tau);
	ctx.fill();
	//draw hole flags
	ctx.fillStyle = "red";
	for (const goal of field.goals) {
		//flag
		ctx.beginPath();
		ctx.moveTo(goal.x, goal.y - 50);
		ctx.lineTo(goal.x - 20, goal.y - 40);
		ctx.lineTo(goal.x, goal.y - 30);
		ctx.fill();
		//flagpole
		ctx.beginPath();
		ctx.moveTo(goal.x, goal.y);
		ctx.lineTo(goal.x, goal.y - 50);
		ctx.stroke();
	}
	//draw ball path from potential hit
	ctx.strokeStyle = "blue";
	ctx.beginPath();
	ctx.moveTo(ball.x, ball.y);
	ctx.lineTo(ball.x + 0.4 * (ball.x - mouseX), ball.y + 0.4 * (ball.y - mouseY));
	ctx.stroke();
	//draw all winning moves
	let bl;
	if (ball.velX != 0 || ball.velY != 0) {
		mtx.clearRect(0,0,m.width,m.height);
		bl = 10;
		settled = false;
	} else {
		if (settled == false) {
			settled = true;
			mtx.clearRect(0,0,m.width,m.height);
		}
		bl = 1;
	}
	mtx.fillStyle = "red";
	for (const point of winningMoves) {
		mtx.fillRect(point.x-bl/2, point.y-bl/2, bl, bl);
	}
}