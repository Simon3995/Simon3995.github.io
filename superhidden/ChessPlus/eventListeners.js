window.addEventListener("mousedown", function(evt) {
	let rect = c.getBoundingClientRect();
	let x = evt.clientX - c.offsetLeft - rect.left;
	let y = evt.clientY - c.offsetTop - rect.top;
	
	let newX = x / (c.width/8);
	let newY = y / (c.height/8);
	
	select.dragging = true;
	
	clickCoords = {
		x: x,
		y: y,
	}
	
	if (promoting) {
		if (newY >= 3.5 && newY <= 4.5) {
			if (newX >= 2 && newX < 3) {
				// promote to queen
				promoting = false;
				pieces[select.color][select.num].type = "queen";
				pieces[select.color][select.num].tx = 2;
				pieces[select.color][select.num].ty = 3.5;
			}
			if (newX >= 3 && newX < 4) {
				// promote to rook
				promoting = false;
				pieces[select.color][select.num].type = "rook";
				pieces[select.color][select.num].tx = 3;
				pieces[select.color][select.num].ty = 3.5;
			}
			if (newX >= 4 && newX < 5) {
				// promote to bishop
				promoting = false;
				pieces[select.color][select.num].type = "bishop";
				pieces[select.color][select.num].tx = 4;
				pieces[select.color][select.num].ty = 3.5;
			}
			if (newX >= 5 && newX < 6) {
				// promote to knight
				promoting = false;
				pieces[select.color][select.num].type = "knight";
				pieces[select.color][select.num].tx = 5;
				pieces[select.color][select.num].ty = 3.5;
			}
		}
	} else {
		newX = Math.floor(newX);
		newY = Math.floor(newY);
		
		if (doMove(newX, newY)) {
			select.active = false;
		} else {
			clickSelectPiece(newX, newY);
		}
		
		if (select.active) {
			possibleMoves = findMoves(newX, newY, false);
		} else {
			possibleMoves = [];
		}
	}
}, false);

window.addEventListener("mouseup", function (evt) {
	let rect = c.getBoundingClientRect();
	// pixel coordinates
	let x = evt.clientX - c.offsetLeft - rect.left;
	let y = evt.clientY - c.offsetTop - rect.top;
	
	// board coordinates
	let newX = Math.floor(x / (c.width/8));
	let newY = Math.floor(y / (c.height/8));
	
	// if piece is currently being dragged
	if (select.dragging && select.active) {
		// if move not succesful, move back to initial square
		if (!doMove(newX, newY)) {
			pieces[select.color][select.num].x = select.x;
			pieces[select.color][select.num].y = select.y;
		} else {
			select.active = false;
			select.dragging = false;
			possibleMoves = [];
			return;
		}
		
		// if drag distance too small
		if (!(Math.sqrt((clickCoords.x-x)**2+(clickCoords.y-y)**2) < c.width/16)) {
			select.active = false;
			possibleMoves = [];
		}
	}
	
	select.dragging = false;
}, false);

window.addEventListener("mousemove", function(evt) {
	let rect = c.getBoundingClientRect();
	let x = evt.clientX - c.offsetLeft - rect.left;
	let y = evt.clientY - c.offsetTop - rect.top;
	
	let newX = x / (c.width/8);
	let newY = y / (c.height/8);
	
	if (select.dragging && select.active) {
		pieces[select.color][select.num].x = newX - 0.5;
		pieces[select.color][select.num].y = newY - 0.5;
	}
}, false);