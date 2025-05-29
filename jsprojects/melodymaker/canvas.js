// draws frame on canvas
function drawCanvas() {
	clear();
	drawGrid();
	drawPiano();
	drawNotes();
	drawPlayline();
}

// clears the canvas
function clear() {
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,c.width,c.height);
}

// draws the piano on the left side of the piano roll
function drawPiano() {
	for (let i=0; i<piano.length; i++) {
		// draw the key
		ctx.fillStyle = piano[i] ? "#FFF" : "#000";
		ctx.fillRect(0, c.height - scalar*i, scalar, -scalar);
		// if black key, take the color through the grid
		if (!piano[i]) {
			ctx.globalAlpha = 0.3;
			ctx.fillRect(scalar, c.height - scalar*i, c.width, -scalar);
			ctx.globalAlpha = 1;
		}
		// draw key separation lines
		ctx.beginPath();
		ctx.moveTo(0, c.height- scalar*i);
		ctx.lineTo(scalar, c.height- scalar*i);
		ctx.stroke();
	}
}

// draws the grid of the piano roll
function drawGrid() {
	// draw color sections
	for (let i=0; i<4; i++) {
		ctx.fillStyle = i%2 ? "#486d82" : "#6498b5";
		ctx.fillRect(scalar + i*(c.width-scalar)/4, 0, (c.width-scalar)/4, c.height);
	}
	// draw vertical grid
	for (let i=0; i<loopLength; i++) {
		ctx.lineWidth = i%4 ? .5 : 1.5;
		ctx.strokeStyle = i%4 ? "#253340" : "#253340";
		ctx.beginPath();
		ctx.moveTo(scalar + i*(c.width-scalar)/loopLength, 0);
		ctx.lineTo(scalar + i*(c.width-scalar)/loopLength, c.height);
		ctx.stroke();
	}
	// draw horizontal grid
	for (let i=0; i<piano.length; i++) {
		ctx.beginPath();
		ctx.moveTo(scalar, i*c.height/piano.length);
		ctx.lineTo(c.width, i*c.height/piano.length);
		ctx.stroke();
	}
}

// function draws the notes on the grid
function drawNotes() {
	ctx.fillStyle = "#6bffb3";
	for (let i=0; i<loopLength; i++) {
		for (let j=0; j<piano.length; j++) {
			if (melody[i][j]) {
				ctx.fillRect(scalar + i*(c.width-scalar)/loopLength + 1, c.height - scalar*j - 1, horizontalStretch - 2, -scalar + 2);
			}
		}
	}
	
	if (mousedown) {
		ctx.fillStyle = "#6bffb3";
		ctx.fillRect(scalar + gridX*(c.width-scalar)/loopLength + 1, c.height - scalar*gridY - 1, horizontalStretch - 2, -scalar + 2);
	}
}

// draws the playline while the melody is playing
function drawPlayline() {
	if (!playing) return;
	
	let posX = scalar + time*(((c.width-scalar)/loopLength)/8);
	
	ctx.strokeStyle = "white";
	ctx.lineWidth = 2;
	
	ctx.beginPath();
	ctx.moveTo(posX,0);
	ctx.lineTo(posX,c.height);
	ctx.stroke();
}

// resizes the canvas to make it fit on screen
function fitCanvas() {
	c.width = window.innerWidth-40;
	if (c.width >= 1500) c.width = 1500;
	
	horizontalStretch = c.width/loopLength;
	scalar = 18;
}