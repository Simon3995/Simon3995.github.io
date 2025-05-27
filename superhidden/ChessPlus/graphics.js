const drawChessboard = function() {
	ctx.fillStyle = "#9dacbd"; //white squares
	ctx.fillRect(0,0,c.width,c.height);
	ctx.fillStyle = "#627080"; //black squares
	for (let i=0; i<8; i++) {
		for (j=0; j<8; j++) {
			if ((i+j)%2!=0) {
				ctx.fillRect(i*(c.width/8), j*(c.height/8), c.width/8, c.height/8);
			}
		}
	}
}

const drawPieces = function() {
	for (let i = 0; i<16; i++) {
		let s = c.width/75; 
		
		// draw pieces
		ctx.drawImage(sp['white'][pieces.white[i].type],
					  (pieces.white[i].tx)*(c.width/8)  +s,
					  (pieces.white[i].ty)*(c.height/8) +s,
					  (c.width/8)-(2*s),
					  (c.height/8)-(2*s));
		ctx.drawImage(sp['black'][pieces.black[i].type],
					  (pieces.black[i].tx)*(c.width/8)  +s,
					  (pieces.black[i].ty)*(c.height/8) +s,
					  (c.width/8)-(2*s),
					  (c.height/8)-(2*s));
		
		// trail x/y
		pieces.white[i].tx = (sl*pieces.white[i].tx + pieces.white[i].x) / (sl+1);
		pieces.white[i].ty = (sl*pieces.white[i].ty + pieces.white[i].y) / (sl+1);
		pieces.black[i].tx = (sl*pieces.black[i].tx + pieces.black[i].x) / (sl+1);
		pieces.black[i].ty = (sl*pieces.black[i].ty + pieces.black[i].y) / (sl+1);
		
		// debug text
		/*ctx.fillStyle = "lime";
		ctx.font = "20px Courier";
		for (j=0; j<16; j++) {
			ctx.fillText(i, 5+pieces.white[i].x*(c.width/8), 20+pieces.white[i].y*(c.width/8));
			ctx.fillText(i, 5+pieces.black[i].x*(c.width/8), 20+pieces.black[i].y*(c.width/8));
		}*/
	}
}

const drawMoves = function() {
	let s = c.width/(100 + 20*Math.sin((Math.PI*movesAnimation)/40));
	
	for (let i=0; i<possibleMoves.length; i++) {
		ctx.drawImage(selectMarker,
					  (possibleMoves[i].x)*(c.width/8) + s,
					  (possibleMoves[i].y)*(c.height/8) + s,
					  (c.width/8) - (2*s),
					  (c.height/8) - (2*s));
	}
	
	movesAnimation++;
	movesAnimation = movesAnimation%80;
}

const drawSelection = function() {
	let s = c.width/150;
	
	if (select.active) {
		ctx.fillStyle = "hsl(195, 100%, " + (50 + 20*Math.sin((Math.PI*selectAnimation)/30)) + "%)";
		ctx.globalAlpha = 0.7;
		ctx.fillRect(select.x*(c.width/8) + s,
					 select.y*(c.height/8) + s,
					 (c.width/8)-(2*s),
					 (c.height/8)-(2*s));
		ctx.globalAlpha = 1;
	}
	selectAnimation++;
	selectAnimation = selectAnimation%60;
}

const resize = function() {
	let h = window.innerHeight;
	let w = window.innerWidth / 0.8;
	let limit = h < w ? h : w;
	
	c.height = (limit/10)*8;
	prc.width = prc.height = c.width = c.height;
	document.getElementById("chessBoardDiv").style.width = c.width + "px";
	document.getElementById("chessBoardDiv").style.height = c.width + "px";
	
	mw.width = c.width;
	mb.width = c.width;
	
	mw.height = mw.width/8;
	mb.height = mw.height;
}