// pieces sprites

let colors = ['white', 'black'];
let types = ['Pawn', 'Rook', 'Knight', 'Bishop', 'Queen', 'King'];

sp = [];
for (let color of colors) {
	sp[color] = [];
	for (let type of types) {
		sp[color][type.toLowerCase()] = new Image();
		sp[color][type.toLowerCase()].src = `pieces/${color + type}.png`;
	}
}

// misc sprites
selectMarker = new Image();
selectMarker.src = "sprites/select.png";