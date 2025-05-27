const createPieces = function() {
	/*
	Pawns	(0,1,2,3,4,5,6,7)
	Rooks	(8,9)
	Knights	(10,11)
	Bishops	(12,13)
	Queen	(14)
	King	(15)
	*/
	pieces = {
		white : [],
		black : [],
	};
	for (let i = 0; i < 16; i++) {
		pieces.white[i] = {
			x : 0,
			y : 0,
			tx: 0,
			ty: 0,
			type: "",
			unmoved: true,
		};
		pieces.black[i] = {
			x : 0,
			y : 0,
			tx: 0,
			ty: 0,
			type: "",
			unmoved: true,
		};
	}
}

const initializePieces = function() {
	//place pawns
	for (let i = 0; i < 8; i++) {
		pieces.white[i].x = i;
		pieces.white[i].y = 6;
		pieces.white[i].type = "pawn";
		
		pieces.black[i].x = i;
		pieces.black[i].y = 1;
		pieces.black[i].type = "pawn";
	}
	//place rooks
	pieces.white[8].x = 0;
	pieces.white[8].y = 7;
	pieces.white[8].type = "rook";
	pieces.white[9].x = 7;
	pieces.white[9].y = 7;
	pieces.white[9].type = "rook";
	
	pieces.black[8].x = 0;
	pieces.black[8].y = 0;
	pieces.black[8].type = "rook";
	pieces.black[9].x = 7;
	pieces.black[9].y = 0;
	pieces.black[9].type = "rook";
	
	//place knights
	pieces.white[10].x = 1;
	pieces.white[10].y = 7;
	pieces.white[10].type = "knight";
	pieces.white[11].x = 6;
	pieces.white[11].y = 7;
	pieces.white[11].type = "knight";
	
	pieces.black[10].x = 1;
	pieces.black[10].y = 0;
	pieces.black[10].type = "knight";
	pieces.black[11].x = 6;
	pieces.black[11].y = 0;
	pieces.black[11].type = "knight";
	
	//place bishops
	pieces.white[12].x = 2;
	pieces.white[12].y = 7;
	pieces.white[12].type = "bishop";
	pieces.white[13].x = 5;
	pieces.white[13].y = 7;
	pieces.white[13].type = "bishop";
	
	pieces.black[12].x = 2;
	pieces.black[12].y = 0;
	pieces.black[12].type = "bishop";
	pieces.black[13].x = 5;
	pieces.black[13].y = 0;
	pieces.black[13].type = "bishop";
	
	//place queen & king
	pieces.white[14].x = 3;
	pieces.white[14].y = 7;
	pieces.white[14].type = "queen";
	pieces.white[15].x = 4;
	pieces.white[15].y = 7;
	pieces.white[15].type = "king";
	
	pieces.black[14].x = 3;
	pieces.black[14].y = 0;
	pieces.black[14].type = "queen";
	pieces.black[15].x = 4;
	pieces.black[15].y = 0;
	pieces.black[15].type = "king";
	
	
	//set tx/ty
	for (let i=0; i<16; i++) {
		pieces.white[i].tx = pieces.white[i].x;
		pieces.white[i].ty = pieces.white[i].y;
		pieces.black[i].tx = pieces.black[i].x;
		pieces.black[i].ty = pieces.black[i].y;
	}
}