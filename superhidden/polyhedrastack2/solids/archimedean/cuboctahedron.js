// shape definition
// archimedean - cuboctahedron

import { SQRT2 } from '../../math.js';

export default {
	"Cuboctahedron": {
		category: "Archimedean",
		verts: [
			[1/SQRT2, 1/SQRT2, 0/SQRT2],
			[-1/SQRT2, 1/SQRT2, 0/SQRT2],
			[-1/SQRT2, -1/SQRT2, 0/SQRT2],
			[1/SQRT2, -1/SQRT2, 0/SQRT2],
			[1/SQRT2, 0/SQRT2, 1/SQRT2],
			[0/SQRT2, 1/SQRT2, 1/SQRT2],
			[-1/SQRT2, 0/SQRT2, 1/SQRT2],
			[0/SQRT2, -1/SQRT2, 1/SQRT2],
			[1/SQRT2, 0/SQRT2, -1/SQRT2],
			[0/SQRT2, 1/SQRT2, -1/SQRT2],
			[-1/SQRT2, 0/SQRT2, -1/SQRT2],
			[0/SQRT2, -1/SQRT2, -1/SQRT2],
		],
		faces: [
			/* clockwise
			[4, 7, 6, 5],
			[4, 5, 0],
			[5, 6, 1],
			[6, 7, 2],
			[7, 4, 3],
			[5, 1, 9, 0],
			[6, 2, 10, 1],
			[7, 3, 11, 2],
			[4, 0, 8, 3],
			[8, 0, 9],
			[9, 1, 10],
			[10, 2, 11],
			[11, 3, 8],
			[8, 9, 10, 11]
			*/
			// counterclockwise
			[4, 5, 6, 7],
			[4, 0, 5],
			[5, 1, 6],
			[6, 2, 7],
			[7, 3, 4],
			[5, 0, 9, 1],
			[6, 1, 10, 2],
			[7, 2, 11, 3],
			[4, 3, 8, 0],
			[8, 9, 0],
			[9, 10, 1],
			[10, 11, 2],
			[11, 8, 3],
			[8, 11, 10, 9]
		]
	}
}