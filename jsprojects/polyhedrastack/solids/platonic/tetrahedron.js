// shape definition
// platonic - tetrahedron

import { SQRT2 } from '../../math.js';

export default {
	"Tetrahedron": {
		category: "Platonic",
		verts: [
			[SQRT2 / 4, SQRT2 / 4, SQRT2 / 4],
			[-SQRT2 / 4, SQRT2 / 4, -SQRT2 / 4],
			[-SQRT2 / 4, -SQRT2 / 4, SQRT2 / 4],
			[SQRT2 / 4, -SQRT2 / 4, -SQRT2 / 4],
		],
		faces: [
			/* clockwise
			[2,0,3],
			[1,2,3],
			[0,1,3],
			[0,2,1]
			*/
			// counterclockwise
			[3, 0, 2],
			[3, 2, 1],
			[3, 1, 0],
			[1, 2, 0]
		]
	}
}