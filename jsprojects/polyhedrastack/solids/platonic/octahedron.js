// shape definition
// platonic - octahedron

import { SQRT2 } from '../../math.js';

export default {
	"Octahedron": {
		category: "Platonic",
		verts: [
			[0, SQRT2 / 2, 0],
			[0, 0, SQRT2 / 2],
			[SQRT2 / 2, 0, 0],
			[0, 0, -SQRT2 / 2],
			[-SQRT2 / 2, 0, 0],
			[0, -SQRT2 / 2, 0],
		],
		faces: [
			/* clockwise
			[1,0,2],
			[2,0,3],
			[3,0,4],
			[4,0,1],
			[1,2,5],
			[2,3,5],
			[3,4,5],
			[4,1,5]
			*/
			// counter clockwise
			[2, 0, 1],
			[3, 0, 2],
			[4, 0, 3],
			[1, 0, 4],
			[5, 2, 1],
			[5, 3, 2],
			[5, 4, 3],
			[5, 1, 4]
		]
	}
}