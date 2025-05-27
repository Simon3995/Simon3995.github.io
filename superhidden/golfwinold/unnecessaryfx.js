particles = [];

function createParticle(x, y, xvel, yvel, life) {
	particles.push({
		color: "hsl("+Math.round(360*Math.random())+",70%,70%)",
		x: x,
		y: y,
		xvel: xvel,
		yvel: yvel,
		life: life,
	});
}

function particleBurst(x, y) {	
	for (let i=0; i<50; i++) {
		let angle = Math.random();
		let speed = 10;
		let xvel = speed * Math.sin(2 * Math.PI * angle);
		let yvel = speed * Math.cos(2 * Math.PI * angle);
		xvel += 3*(Math.random()-0.5);
		yvel += 3*(Math.random()-0.5);
		createParticle(x, y, xvel, yvel, 50*Math.random());
	}
}

function iterateParticles() {
	let s = 4; //amount to shrink down particles
	
	for (let i=0; i<particles.length; i++) {
		ctx.fillStyle = particles[i].color;
		
		ctx.fillRect(particles[i].x - particles[i].life/(2*s),
					 particles[i].y - particles[i].life/(2*s),
					 particles[i].life/s,
					 particles[i].life/s,);
		particles[i].x += particles[i].xvel;
		particles[i].y += particles[i].yvel;
		particles[i].xvel *= 0.8;
		particles[i].yvel *= 0.8;
		particles[i].life--;
		if (particles[i].life < 0) particles.splice(i,1);
	}
}