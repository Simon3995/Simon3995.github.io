// checks if field is occupied by a piece
const isOccupied = function(x, y) {
	occupied = false;
	for (let i = 0; i < 16; i++) {
		for (let color of colors) {
			if (pieces[color][i].x == x && pieces[color][i].y == y) {
				occupied = true;
			}
		}
	}
	return occupied;
}

// checks if field is within the chessboard
const onBoard = function(x, y) {
	return x >= 0 && y >= 0 && x <= 7 && y <= 7;
}

const getPiece = function(x, y) {
	if (!onBoard(x,y)) return null;
	for (let i=0; i<16; i++) {
		if (pieces.white[i].x == x && pieces.white[i].y == y) return pieces.white[i];
		if (pieces.black[i].x == x && pieces.black[i].y == y) return pieces.black[i];
	}
	return null;
}

// returns color of piece at given coordinates
const getPieceColor = function(x, y) {
	if (!onBoard(x,y)) return null;
	for (let i=0; i<16; i++) {
		if (pieces.white[i].x == x && pieces.white[i].y == y) return "white";
		if (pieces.black[i].x == x && pieces.black[i].y == y) return "black";
	}
	return null;
}

// returns ID of piece at given coordinates
const getPieceID = function(x, y) {
	for (let i=0; i<16; i++) {
		if (pieces.white[i].x == x && pieces.white[i].y == y) return i;
		if (pieces.black[i].x == x && pieces.black[i].y == y) return i;
	}
	return null;
}

// returns type of piece at given coordinates
const getPieceType = function(x, y) {
	for (let i=0; i<16; i++) {
		if (pieces.white[i].x == x && pieces.white[i].y == y) return pieces.white[i].type;
		if (pieces.black[i].x == x && pieces.black[i].y == y) return pieces.black[i].type;
	}
	return null;
}

// returns whether piece at given coordinates is unmoved
const getPieceUnmoved = function(x, y) {
	for (let i=0; i<16; i++) {
		if (pieces.white[i].x == x && pieces.white[i].y == y) return pieces.white[i].unmoved;
		if (pieces.black[i].x == x && pieces.black[i].y == y) return pieces.black[i].unmoved;
	}
	return null;
}

const checkCheck = function(color) {
	// define king
	let king = {
		x: pieces[color][15].x,
		y: pieces[color][15].y,
	}
	
	// set attacking pieces' color
	let attackColor;
	if (color == "white") { attackColor = "black"; } else { attackColor = "white"; }
	
	// for all enemy pieces
	for (piece of pieces[attackColor]) {
		// check pawn attack
		if (piece.type == "pawn") {
			if (color == "white") {
				if ((piece.x-1 == king.x || piece.x+1 == king.x) && piece.y+1 == king.y) return true;
			} else {
				if ((piece.x-1 == king.x || piece.x+1 == king.x) && piece.y-1 == king.y) return true;
			}
		}
		
		// check rook/queen attack
		if (piece.type == "rook" || piece.type == "queen") {
			for (let dir of [[1,0],[-1,0],[0,1],[0,-1]]) {
				for (let i=1; i<8; i++) {
					if (isOccupied(piece.x+dir[0]*i, piece.y+dir[1]*i)) {
						if (king.x == piece.x+dir[0]*i && king.y == piece.y+dir[1]*i) {
							return true;
						} else {
							break;
						}
					}
				}
			}
		}
		
		// check bishop/queen attack
		if (piece.type == "bishop" || piece.type == "queen") {
			for (let dir of [[1,1],[-1,1],[1,-1],[-1,-1]]) {
				for (let i=1; i<8; i++) {
					if (isOccupied(piece.x+dir[0]*i, piece.y+dir[1]*i)) {
						if (king.x == piece.x+dir[0]*i && king.y == piece.y+dir[1]*i) {
							return true;
						} else {
							break;
						}
					}
				}
			}
		}
		
		// check knight attack
		if (piece.type == "knight") {
			for (let dir of [[1,2],[-1,2],[1,-2],[-1,-2],[2,1],[2,-1],[-2,1],[-2,-1]]) {
				if (piece.x + dir[0] == king.x && piece.y + dir[1] == king.y) {
					return true;
				}
			}
		}
		
		// check king attack
		if (piece.type == "king") {
			for (let dir of [[-1,-1],[-1,0],[-1,1],[0,1],[0,-1],[1,1],[1,0],[1,-1]]) {
				if (piece.x + dir[0] == king.x && piece.y + dir[1] == king.y) {
					return true;
				}
			}
		}
	}
	
	return false;
}