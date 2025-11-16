function draw_debug_text() {
    ctx.font = "10px monospace";
    ctx.fillStyle = "black";
	ctx.fillText("player.jumping = " + player.jumping,3,10);
	ctx.fillText("player.x = " + Math.round(player.x),3,20);
	ctx.fillText("player.y = " + Math.round(player.y),3,30);
	ctx.fillText("Mouse Coordinates: " + mouseX + ", " + mouseY,3,40);
	ctx.fillText("Deathwall Position: " + Math.round(deathwall),3,50);
	ctx.fillText("player.grounded: " + player.grounded,3,60);
	ctx.fillText("Last Fitness: " + Math.round(lastfitness),3,70);
	ctx.fillText("Network Number: " + networkNumber,3,80);
	ctx.fillText("Generation: " + generation,3,90);
	ctx.fillText("Evolve Amount: " + evolveAmt,3,100);
	ctx.fillText("Continuity = " + continuity,3,110);
}

function draw_deathwall() {
    ctx.strokeStyle = "red";
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(deathwall,0);
	ctx.lineTo(deathwall,canvas.height);
	ctx.stroke();
}

function draw_player() {
    ctx.fill();
	ctx.fillStyle = "darkorange";
	ctx.fillRect(player.x, player.y, player.width, player.height);
	
    // velocity vectors
	ctx.lineWidth = 1;
    ctx.strokeStyle = "red";
	ctx.beginPath();
	ctx.moveTo(player.x+(player.width/2),player.y+(player.height/2));
	ctx.lineTo(player.x+(player.width/2)+(20*player.velX),player.y+(player.height/2)+(20*player.velY));
	ctx.stroke();
	
	ctx.strokeStyle = "blue";
	ctx.beginPath();
	ctx.moveTo(player.x+(player.width/2),player.y+(player.height/2));
	ctx.lineTo(player.x+(player.width/2),player.y+(player.height/2)+(20*player.velY));
	ctx.stroke();
	
	ctx.strokeStyle = "green";
	ctx.beginPath();
	ctx.moveTo(player.x+(player.width/2),player.y+(player.height/2));
	ctx.lineTo(player.x+(player.width/2)+(20*player.velX),player.y+(player.height/2));
	ctx.stroke();
}

function draw_blood() {
    for (let i = 1; i <= blood.amt; i++) {
        ctx.fillStyle = "red";
        ctx.fillRect(blood.x[i] - (blood.size/2),blood.y[i] - (blood.size/2),blood.size,blood.size);
        blood.x[i] += blood.velx[i];
        blood.y[i] += blood.vely[i];
        blood.velx[i] *= 0.8;
        blood.vely[i] += 0.3;
    }
}

function draw_eye_net() {
    let r = Math.floor(obDim/2);  // eye net radius
    ctx.fillStyle = "blue";

    for (i = -r; i <= r; i++) {
		for (j = -r; j <= r; j++) {
			ctx.fillRect(i*eye.dist + player.x + (player.width/2), j*eye.dist + player.y + (player.height/2), 2, 2);
		}
	}
}

function draw_gates() {
    let gateDist = canvas2.height / (gatesAmt + 1);
	ctx2.strokeStyle = "black";
    ctx2.lineWidth = 1;

    // gate body
    for (i = 1; i <= gatesAmt; i++) {
		ctx2.font = "normal normal normal 10px monospace";
		ctx2.fillStyle = "black";
		if (nn[networkNumber][i][1]) {
			ctx2.fillText(nn[networkNumber][i][8], canvas2.height + 52, i*gateDist + 5);
			ctx2.strokeRect(canvas2.height + 50, i*gateDist - 5,40,14);
		}
	}

    // lines
    for (i=1; i<=gatesAmt; i++) {
		if (nn[networkNumber][i][1]) {
			ctx2.beginPath();
			ctx2.moveTo(10+(((nn[networkNumber][i][2]-(0.5*Math.floor(obDim)))+Math.floor(obDim/2))*((canvas2.height-20)/obDim)),10+(((nn[networkNumber][i][3]-(0.5*Math.floor(obDim)))+Math.floor(obDim/2))*((canvas2.height-20)/obDim)),(canvas2.height-20)/obDim,(canvas2.height-20)/obDim);
			ctx2.lineTo(canvas2.height + 50,(canvas2.height / (gatesAmt + 1)) * i);
			if (sensorOutput[nn[networkNumber][i][2]][nn[networkNumber][i][3]] == nn[networkNumber][i][4]) {
				ctx2.lineWidth = 3;
				ctx2.strokeStyle="lime";
			} else {
				ctx2.lineWidth = 1;
				ctx2.strokeStyle="black";
			}
			ctx2.stroke();
			ctx2.beginPath();
			ctx2.moveTo(10+(((nn[networkNumber][i][5]-(0.5*Math.floor(obDim)))+Math.floor(obDim/2))*((canvas2.height-20)/obDim)),10+(((nn[networkNumber][i][6]-(0.5*Math.floor(obDim)))+Math.floor(obDim/2))*((canvas2.height-20)/obDim)),(canvas2.height-20)/obDim,(canvas2.height-20)/obDim);
			ctx2.lineTo(canvas2.height + 50,(canvas2.height / (gatesAmt + 1)) * i);
			if (sensorOutput[nn[networkNumber][i][5]][nn[networkNumber][i][6]] == nn[networkNumber][i][7]) {
				ctx2.lineWidth = 3;
				ctx2.strokeStyle="lime";
			} else {
				ctx2.lineWidth = 1;
				ctx2.strokeStyle="black";
			}
			ctx2.stroke();
		
			ctx2.beginPath();
			ctx2.moveTo(canvas2.height + 90,(canvas2.height / (gatesAmt + 1)) * i);
			if (nn[networkNumber][i][9] === "up") {
				ctx2.lineTo(700,100);
			} else if (nn[networkNumber][i][9] === "left") {
				ctx2.lineTo(700,250);
			} else {
				ctx2.lineTo(700,400);
			}
			ctx2.lineWidth = 1;
			ctx2.strokeStyle="black";
			ctx2.stroke();
		}
	}
}

function draw_obs_grid() {
    ctx2.strokeStyle = "#eee";
	ctx2.lineWidth = 2;
	
    ctx2.beginPath();
    for (let i = 0; i <= obDim; i++) {
		ctx2.moveTo(10,10+i*((canvas2.height-20)/obDim));
		ctx2.lineTo(canvas2.height-10,10+i*((canvas2.height-20)/obDim));
		ctx2.moveTo(10+i*((canvas2.height-20)/obDim),10);
		ctx2.lineTo(10+i*((canvas2.height-20)/obDim),canvas2.height-10);
	}
	ctx2.stroke();
}

function draw_obs_squares() {
    let r = Math.floor(obDim/2);
    for (i = -r; i <= r; i++) {
		for (j = -r; j <= r; j++) {
			sensorOutput[i + r + 1][j + r + 1] = 0;
			for (k = 0; k < Level.boxes.length; k++) {
				if (i*eye.dist + player.x + (player.width/2) >= Level.boxes[k].x &&
                        i*eye.dist + player.x + (player.width/2) <= Level.boxes[k].x + Level.boxes[k].width &&
                        j*eye.dist + player.y + (player.height/2) >= Level.boxes[k].y &&
                        j*eye.dist + player.y + (player.height/2) <= Level.boxes[k].y + Level.boxes[k].height) {
					if (Level.boxes[k].type == 0) {
						ctx2.fillStyle = "#888888";
						sensorOutput[i + r + 1][j + r + 1] = 1;
					} else if (Level.boxes[k].type == 1) {
						ctx2.fillStyle = "#ff8888";
						sensorOutput[i + r + 1][j + r + 1] = 2;
					} else if (Level.boxes[k].type == 2) {
						ctx2.fillStyle = "#88ff88";
						sensorOutput[i + r + 1][j + r + 1] = 3;
					} 
					
					ctx2.fillRect(10+((i + r)*((canvas2.height-20)/obDim)),10+((j+r)*((canvas2.height-20)/obDim)),(canvas2.height-20)/obDim,(canvas2.height-20)/obDim);
				}
			}
		}
	}

    // draw player
    ctx2.fillStyle = "#ffbb88";
	ctx2.fillRect(10+(r*((canvas2.height-20)/obDim)),10+((Math.floor(obDim/2))*((canvas2.height-20)/obDim)),(canvas2.height-20)/obDim,(canvas2.height-20)/obDim);
}

function draw_buttons() {
    ctx2.font = "20px Courier";
	
	if (nnUp) {
		ctx2.fillStyle = "lime";
		ctx2.font = "normal normal bold 20px Courier";
	} else {
		ctx2.fillStyle = "black";
		ctx2.font = "normal normal normal 20px Courier";
	}
	ctx2.fillText("UP",710,110);
	ctx2.font = "normal normal normal 10px sans-serif";
	ctx2.fillStyle = "dimgrey";
	ctx2.fillText((Math.floor(nnOut.up*1000))/1000,710,125);
	ctx2.strokeStyle = "dimgrey";
	ctx2.strokeRect(700,90,80,40);
	
	if (nnLeft) {
		ctx2.fillStyle = "lime";
		ctx2.font = "normal normal bold 20px Courier";
	} else {
		ctx2.fillStyle = "black";
		ctx2.font = "normal normal normal 20px Courier";
	}
	ctx2.fillText("LEFT",710,260);
	ctx2.font = "normal normal normal 10px sans-serif";
	ctx2.fillStyle = "black";
	ctx2.fillText((Math.floor(nnOut.left*1000))/1000,710,275);
	ctx2.strokeStyle = "black";
	ctx2.strokeRect(700,240,80,40);
	
	if (nnRight) {
		ctx2.fillStyle = "lime";
		ctx2.font = "normal normal bold 20px Courier";
	} else {
		ctx2.fillStyle = "black";
		ctx2.font = "normal normal normal 20px Courier";
	}
	ctx2.fillText("RIGHT",710,410);
	ctx2.font = "normal normal normal 10px sans-serif";
	ctx2.fillStyle = "black";
	ctx2.fillText((Math.floor(nnOut.right*1000))/1000,710,425);
	ctx2.strokeStyle = "black";
	ctx2.strokeRect(700,390,80,40);
}

function update_progress_graph() {
	generationFitness[generation] = baseNetwork[0][1];

	// draw horizontal gridlines
	ctx3.strokeStyle = "#bbb";
	for (let i=0; i<canvas3.height; i+=canvas3.height/5) {
		ctx3.lineWidth = 1;
		ctx3.beginPath();
		ctx3.moveTo(0, i);
		ctx3.lineTo(canvas3.width, i);
		ctx3.stroke();
	}

	// draw vertical gridlines
	let min_dist = 20; // minimum distance between vert. gridlines in px
	let dist = canvas3.width / (generationFitness.length - 1);
	let a = b = 0;
	while (dist < min_dist) {
		dist *= 10;
		a++;
	}
	for (let i=dist; i<=canvas3.width+1; i+=dist) {
		ctx3.beginPath();
		ctx3.moveTo(i, 0);
		ctx3.lineTo(i, canvas3.height);
		ctx3.stroke();

		ctx3.fillStyle = "black";
		ctx3.textAlign = "right";
		ctx3.fillText(++b * 10**a, i - 2, 12, min_dist);
	}

    // draw progress graph
	ctx3.strokeStyle = "red";
	for (let i=1; i<=generation; i++) {
		ctx3.beginPath();
		ctx3.moveTo(canvas3.width * ((i - 1) / generation),canvas3.height - (canvas3.height * (generationFitness[i - 1] / Level.finish_x)));
		ctx3.lineTo(canvas3.width * ((i) / generation),canvas3.height - (canvas3.height * (generationFitness[i] / Level.finish_x)));
		ctx3.stroke();
	}
}

function clear_canvases() {
    ctx.fillStyle = "white";
	ctx2.fillStyle = "white";
    ctx3.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
	ctx3.fillRect(0, 0, canvas3.width, canvas3.height);
}

function draw_boxes() {
    for (let y = 0; y < Level.boxes.length; y++) {
        if (Level.boxes[y].type == 0) {ctx.fillStyle = "black";}
		if (Level.boxes[y].type == 1) {ctx.fillStyle = "red";}
		if (Level.boxes[y].type == 2) {ctx.fillStyle = "limegreen"}
		ctx.fillRect(Level.boxes[y].x, Level.boxes[y].y, Level.boxes[y].width, Level.boxes[y].height);
    }
}