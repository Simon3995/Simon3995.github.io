// shape definition
// archimedean - truncated tetrahedron

import { SQRT2 } from '../../math.js';

export default {
	"Truncated Tetrahedron": {
		category: "Archimedean",
		verts: [
			[3/(2 * SQRT2), 1/(2 * SQRT2), 1/(2 * SQRT2)],
			[1/(2 * SQRT2), 3/(2 * SQRT2), 1/(2 * SQRT2)],
			[1/(2 * SQRT2), 1/(2 * SQRT2), 3/(2 * SQRT2)],
			[-3/(2 * SQRT2), -1/(2 * SQRT2), 1/(2 * SQRT2)],
			[-1/(2 * SQRT2), -3/(2 * SQRT2), 1/(2 * SQRT2)],
			[-1/(2 * SQRT2), -1/(2 * SQRT2), 3/(2 * SQRT2)],
			[-3/(2 * SQRT2), 1/(2 * SQRT2), -1/(2 * SQRT2)],
			[-1/(2 * SQRT2), 3/(2 * SQRT2), -1/(2 * SQRT2)],
			[-1/(2 * SQRT2), 1/(2 * SQRT2), -3/(2 * SQRT2)],
			[3/(2 * SQRT2), -1/(2 * SQRT2), -1/(2 * SQRT2)],
			[1/(2 * SQRT2), -3/(2 * SQRT2), -1/(2 * SQRT2)],
			[1/(2 * SQRT2), -1/(2 * SQRT2), -3/(2 * SQRT2)],
		],
		faces: [
			/* clockwise
			[1, 0, 2],
			[1, 2, 5, 3, 6, 7],
			[3, 5, 4],
			[3, 4, 10, 11, 8, 6],
			[10, 9, 11],
			[10, 4, 5, 2, 0, 9],
			[6, 8, 7],
			[0, 1, 7, 8, 11, 9]
			*/
			// counterclockwise
			[2, 0, 1],
			[7, 6, 3, 5, 2, 1],
			[4, 5, 3],
			[6, 8, 11, 10, 4, 3],
			[11, 9, 10],
			[9, 0, 2, 5, 4, 10],
			[7, 8, 6],
			[9, 11, 8, 7, 1, 0]
		]
	}
}