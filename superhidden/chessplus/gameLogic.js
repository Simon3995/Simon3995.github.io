const doMove = function(x, y) {
	for (let i=0; i<possibleMoves.length; i++) {
		if (possibleMoves[i].x == x && possibleMoves[i].y == y) {
			//castling
			if (select.type == 'king' && Math.abs(x - select.x) == 2) {
				let rooks = pieces[select.color].filter(piece => piece.type == 'rook');
				for (let rook of rooks) {
					if (x < select.x == rook.x < x) {
						rook.x = select.x + (x < select.x ? -1 : 1);
						rook.unmoved = false;
						break;
					}
				}
			}
			
			// white en passant
			if (select.type == "pawn" &&
				select.color == "white" &&
				x != pieces.white[select.num].x &&
				!capture(x,y)) {
					capture(x,y+1);
			}
			
			// black en passant
			if (select.type == "pawn" &&
				select.color == "black" &&
				x != pieces.black[select.num].x &&
				!capture(x,y)) {
					capture(x,y-1);
			}
			
			capture(x,y);
			
			lastmove.x = x;
			lastmove.y = y;
			
			if (select.color == "white") {
				// check for double pawn move
				if (Math.abs(pieces.white[select.num].y - y) == 2 &&
					pieces.white[select.num].type == "pawn") {
						lastmove.doublepawn = true;
				} else {
					lastmove.doublepawn = false;
				}
			}
			
			if (select.color == "black") {
				// check for double pawn move
				if (Math.abs(pieces.black[select.num].y - y) == 2 &&
					pieces.black[select.num].type == "pawn") {
						lastmove.doublepawn = true;
				} else {
					lastmove.doublepawn = false;
				}
			}
			
			pieces[select.color][select.num].x = x;
			pieces[select.color][select.num].y = y;
			pieces[select.color][select.num].unmoved = false;
			
			// check for pawn promotion
			if (select.type == "pawn") {
				if ((select.color == "white" && y == 0) || 
					(select.color == "black" && y == 7)) {
						promoting = true;
				}
			}
			
			playSound("move");
			return true;
		}
	}
	
	// move not possible
	return false;
}

const clickSelectPiece = function(x, y) {
	for (let i = 0; i < 16; i++) {
		for (let color of colors) {
			if (pieces[color][i].x == x && pieces[color][i].y == y) {
				select.unmoved = pieces[color][i].unmoved;
				select.active = true;
				select.x = pieces[color][i].x;
				select.y = pieces[color][i].y;
				select.color = color;
				select.num = i;
				select.type = pieces[color][i].type;
				playSound("select");
				return;
			}
		}
	}
	select.active = false;
}

const selectPiece = function(x,y) {
	for (let i = 0; i < 16; i++) {
		for (let color of colors) {
			if (pieces[color][i].x == x && pieces[color][i].y == y) {
				select.unmoved = pieces[color][i].unmoved;
				select.active = true;
				select.x = pieces[color][i].x;
				select.y = pieces[color][i].y;
				select.color = color;
				select.num = i;
				select.type = pieces[color][i].type;
				return;
			}
		}
	}
	select.active = false;
}

const findMoves = function(x, y, nested) {
	let moves = [];
	
	if (!isOccupied(x,y)) return [];
	
	if (select.type == "knight") {
		for (let dir of [[2,1],[-2,1],[2,-1],[-2,-1],[1,2],[-1,2],[1,-2],[-1,-2]]) {
			moves.push(checkMove(select.x+dir[0], select.y+dir[1]));
		}
	}
		
	if (select.type == "king") {
		// castling
		if (!nested && select.unmoved) {
			// get all unmoved rooks of the same color
			let rooks = pieces[select.color].filter(piece => piece.type == 'rook' && piece.unmoved);
			for (let rook of rooks) {
				// see that there is no piece in between
				let x1, x2;
				[x1, x2] = [rook.x, select.x].sort();
				let freeToCastle = true;
				for (let i=x1+1; i<x2; i++) {
					if (isOccupied(i, select.y)) {
						freeToCastle = false;
					}
				}
				// check king is not under attack now or in between
				let dir = select.x > rook.x ? -1 : 1;
				
				if (!(!checkCheck(select.color) && checkMove(select.x+dir, select.y))) {
					freeToCastle = false;
				}
				
				if (freeToCastle) {
					// add move
					moves.push(checkMove(select.x+ 2*dir, select.y));
				}
			}
		}
		
		// regular moves
		for (let i=-1; i<=1; i++) {
			for (let j=-1; j<=1; j++) {
				if (!nested) {
					moves.push(checkMove(select.x+i, select.y+j));
				}
			}
		}
	}
	
	// i hate pawns
	if (select.type == "pawn") {
		// single move
		let dir = select.color == "white" ? -1 : 1;
		if (getPieceColor(x,y+dir) == null && onBoard(x,y+dir)) {
			moves.push(checkMove(select.x, select.y+dir));
			if (getPieceColor(x,y+2*dir) == null && select.unmoved) {
				// double move
				moves.push(checkMove(select.x, select.y+2*dir));
			}
		}
		
		//capture moves
		for (let color of colors) {
			let colorDir = color == "white" ? -1 : 1;
			for (let dir of [1, -1]) {
				//regular capture
				if (getPieceColor(select.x+dir, select.y+colorDir) != color &&
					getPieceColor(select.x+dir, select.y+colorDir)) {
						moves.push(checkMove(select.x+dir, select.y+colorDir));
				}
				//en passant
				if (getPieceColor(select.x+dir, select.y) != color &&
					getPieceType(select.x+dir, select.y) == "pawn" &&
					lastmove.x == select.x+dir &&
					lastmove.y == select.y &&
					lastmove.doublepawn) {
						let p = { // pawn that just moved 2 spaces, to be captured
							x: select.x + dir,
							y: select.y,
						}
						let yeetPiece = pieces[getPieceColor(p.x, p.y)][getPieceID(p.x, p.y)];
						yeetPiece.x += 100;
						yeetPiece.y += 100;
						moves.push(checkMove(select.x+dir, select.y+colorDir));
						yeetPiece.x -= 100;
						yeetPiece.y -= 100;
				}
			}
		}
	}
	
	let directions = [];
	if (select.type == "bishop" || select.type == "queen") {
		directions = directions.concat([[1,1],[1,-1],[-1,1],[-1,-1]]);
	}
	if (select.type == "rook" || select.type == "queen") {
		directions = directions.concat([[0,1],[0,-1],[1,0],[-1,0]]);
	}
	
	for (let dir of directions) {
		for (let k=1; k<8; k++) {
			let move = checkMove(select.x+dir[0]*k, select.y+dir[1]*k);
			moves.push(move);
			if (move == null) break;
			if (getPieceColor(select.x+dir[0]*k, select.y+dir[1]*k) != select.color &&
				isOccupied(select.x+dir[0]*k, select.y+dir[1]*k)) {
					break;
			}
		}
	}
	
	// filter out null values
	return moves.filter(move => move);
}

// if valid move, returns move, else returns null
const checkMove = function(x,y) {
	if (!onBoard(x,y)) return null;
	
	if (getPieceColor(x,y) != select.color) {
		// save current coordinates
		let curX = select.x;
		let curY = select.y;
		
		// space is already occupied; simulate capture
		let yeetPiece = null;
		if (isOccupied(x,y)) {
			yeetPiece = getPiece(x,y);
			yeetPiece.x += 100;
			yeetPiece.y += 100;
		}
		
		// do move
		pieces[select.color][select.num].x = x;
		pieces[select.color][select.num].y = y;
		
		// check if check
		let check = checkCheck(select.color);
		
		// undo move
		pieces[select.color][select.num].x = curX;
		pieces[select.color][select.num].y = curY;
		
		// undo capture
		if (yeetPiece) {
			yeetPiece.x -= 100;
			yeetPiece.y -= 100;
		}
		
		// return move only if no check
		if (!check) {
			return {x:x, y:y};
		} else {
			// move technically possible but king is in check
			return false;
		}
	}
	return null;
}

const capture = function(x,y) {
	for (let i=0; i<16; i++) {
		for (let color of colors) {
			if (pieces[color][i].x == x && pieces[color][i].y == y) {
				pieces[color][i].x = 3.5;
				pieces[color][i].y = color == "white" ? -1 : 8;
				playSound("capture");
				return true;
			}
		}
	}
	
	return false;
}