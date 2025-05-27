//this file contains functions for drawing on the HTML canvas

//canvas
var c = document.getElementById("c");
var ctx = c.getContext("2d");
c.width = 800;
c.height = 800;
let m, gl;


loadWebGLProgram();

function loadWebGLProgram() {
	// initialize canvas
	m = document.createElement('canvas');
	m.width = c.width;
	m.height = c.height;
	gl = m.getContext("webgl");

	// Create a WebGL buffer
	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	
	// Create a fragment shader
	const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, `
		precision mediump float;
		void main() {
			gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
		}
	`);
	gl.compileShader(fragmentShader);
	
	// Create a vertex shader
	const vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, `
		attribute vec2 position;
		void main() {
			gl_Position = vec4(position.x / ${m.width}.0 * 2.0 - 1.0, -position.y / ${m.height}.0 * 2.0 + 1.0, 0.0, 1.0);
		}
	`);
	gl.compileShader(vertexShader);
	
	// Create a shader program and attach the shaders
	const program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	gl.useProgram(program);
	
	// Enable the vertex position attribute
	const positionAttribute = gl.getAttribLocation(program, "position");
	gl.enableVertexAttribArray(positionAttribute);
	gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);
}



function newFrame(ball, field) {
	//create green field
	ctx.fillStyle = "#68b55b";
	ctx.fillRect(0, 0, c.width, c.height);

	//draw all walls
	ctx.lineWidth = 2;
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
	drawWinningMoves();

	// show areas handled by different threads
	for (let i=0; i<=THREAD_AMT; i++) {
		ctx.strokeStyle = "cyan";
		ctx.globalAlpha = 0.3;
		ctx.beginPath();
		ctx.moveTo(i * c.width/THREAD_AMT, 0);
		ctx.lineTo(i * c.width/THREAD_AMT, c.height);
		ctx.stroke();
		ctx.globalAlpha = 1;
	}

	t_curr = new Date();
	draw_fps(Math.round(1000/(t_curr - t_prev)));
	t_prev = t_curr;
}

function drawWinningMoves() {
	// Clear the canvas?
	let size;
	if (!settled) gl.clear(gl.COLOR_BUFFER_BIT);
	if (ball.velX === 0 && ball.velY === 0) {
		size = 1;
		settled = true;
	} else {
		size = moveResolution * 2;
		settled = false;
	}

	// Generate the vertices for all the points
	const vertices = [];
	for (const point of winningMoves) {
		const x = point.x - size/2;
		const y = point.y - size/2;
		const w = size;
		const h = size;

		// Add the vertices of the rectangle
		vertices.push(x, y);
		vertices.push(x + w, y);
		vertices.push(x, y + h);

		vertices.push(x + w, y);
		vertices.push(x + w, y + h);
		vertices.push(x, y + h);
	}

	// Load the vertices into the buffer
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	// Draw the points
	gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);

	ctx.globalAlpha = 0.4;
	ctx.drawImage(m, 0, 0);
	ctx.globalAlpha = 1;
}

const draw_fps = function(fps) {
	fps_hist.push(fps);
	if (fps_hist.length > 50) fps_hist.shift();
	let avg = Math.round(fps_hist.reduce((a, b) => a + b, 0) / fps_hist.length);

	ctx.fillStyle = "blue";
	ctx.font = "20px monospace";
	ctx.textBaseline = "top";
	ctx.fillText("FPS: " + fps, 10, 10);
	ctx.fillText("AVG_50: " + avg, 10, 35);
}