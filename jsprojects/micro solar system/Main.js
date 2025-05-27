/*
	Distances processed in m
	Displayed Scaled down to pixels
	
	Mass in kg
*/

let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let bodies = [];
let trail = [];
let speedMult = 3e4;
let scale = 5e8;
let focused = 0;

let G = 6.674e-11;

// SUN
bodies.push(new Body(1.989e30, 10, 0, 0, 0, 0, "#ffffff", "sun"));

// MERCURY
bodies.push(new Body(3.285e23, 2, 0, -53.978e9, 47.3625e3, 0, "#787878", "mercury"));

// VENUS
bodies.push(new Body(4.867e24, 2.5, 0, -107.83e9, 35.0213e3, 0, "#fff8bf", "venus"));

// EARTH
bodies.push(new Body(5.972e24, 3, 0, -150.48e9, 29.78e3, 0, "#4f8dbd", "earth"));

// MOON
bodies.push(new Body(7.3477e22, 1, 0, -150.48e9-384.4e6, 29.78e3+1023.05, 0, "#a1a1a1", "moon"));

// MARS
bodies.push(new Body(6.39e23, 2.5, 0, -217.56e9, 24e3, 0, "#943028", "mars"));

function update() {
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,c.width,c.height);
	
	center(focused);
	drawBodies();
	for (let i=0; i<=speedMult; i++) {
		updateVelocities();
		moveBodies();
	}
	
	window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);

function drawBodies() {
	for (body of bodies) {
		ctx.fillStyle = body.color;
		ctx.beginPath();
		ctx.arc((body.x/scale)+c.width/2, (body.y/scale)+c.height/2, body.r, 0, 2*Math.PI);
		ctx.fill();
	}
}

function updateVelocities() {
	for (body of bodies) {
		for (body2 of bodies) {
			// ignore self
			if (body.name == body2.name) continue;
			
			// calculate force
			let F = (G * body.mass * body2.mass)/dist(body,body2)**2;
			
			// divide by mass
			F /= body.mass;
			
			let d_x = body2.x - body.x;
			let d_y = body2.y - body.y;
			let F_x = d_x/(Math.sqrt(d_x**2 + d_y**2)/F);
			let F_y = d_y/(Math.sqrt(d_x**2 + d_y**2)/F);
			
			body.xvel += F_x;
			body.yvel += F_y;
		}
	}
}

function moveBodies() {
	for (body of bodies) {
		body.x += body.xvel;
		body.y += body.yvel;
	}
}

function dist(a,b) {
	return Math.sqrt((a.x-b.x)**2+(a.y-b.y)**2);
}

function center(focused) {
	for (let i=bodies.length-1; i>=0; i--) {
		if (i == focused) continue;
		bodies[i].x -= bodies[focused].x;
		bodies[i].y -= bodies[focused].y;
	}
	
	bodies[focused].x = 0;
	bodies[focused].y = 0;
}

window.addEventListener("click", function(evt) {
	for (let i=0; i<bodies.length; i++) {
		if (Math.abs((evt.clientX-c.offsetLeft) - ((bodies[i].x / scale) + (c.width/2))) <= 20 &&
			Math.abs((evt.clientY-c.offsetTop) - ((bodies[i].y / scale) + (c.height/2))) <= 20) {
				focused = i;
				break;
		}
	}
});

c.addEventListener("wheel", function(evt) {
	if (evt.deltaY < 0) scale *= 0.8;
	if (evt.deltaY > 0) scale *= 1.25;
});