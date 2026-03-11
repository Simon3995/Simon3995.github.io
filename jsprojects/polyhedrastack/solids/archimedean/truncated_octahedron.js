// shape definition
// archimedean - truncated octahedron

import { SQRT2 } from '../../math.js';

export default {
	"Truncated Octahedron": {
		category: "Archimedean",
		verts: [
			[0/SQRT2, 1/SQRT2, 2/SQRT2],
			[0/SQRT2, 1/SQRT2, -2/SQRT2],
			[0/SQRT2, -1/SQRT2, 2/SQRT2],
			[0/SQRT2, -1/SQRT2, -2/SQRT2],
			[0/SQRT2, 2/SQRT2, 1/SQRT2],
			[0/SQRT2, 2/SQRT2, -1/SQRT2],
			[0/SQRT2, -2/SQRT2, 1/SQRT2],
			[0/SQRT2, -2/SQRT2, -1/SQRT2],
			[1/SQRT2, 0/SQRT2, 2/SQRT2],
			[1/SQRT2, 0/SQRT2, -2/SQRT2],
			[-1/SQRT2, 0/SQRT2, 2/SQRT2],
			[-1/SQRT2, 0/SQRT2, -2/SQRT2],
			[2/SQRT2, 0/SQRT2, 1/SQRT2],
			[2/SQRT2, 0/SQRT2, -1/SQRT2],
			[-2/SQRT2, 0/SQRT2, 1/SQRT2],
			[-2/SQRT2, 0/SQRT2, -1/SQRT2],
			[1/SQRT2, 2/SQRT2, 0/SQRT2],
			[1/SQRT2, -2/SQRT2, 0/SQRT2],
			[-1/SQRT2, 2/SQRT2, 0/SQRT2],
			[-1/SQRT2, -2/SQRT2, 0/SQRT2],
			[2/SQRT2, 1/SQRT2, 0/SQRT2],
			[2/SQRT2, -1/SQRT2, 0/SQRT2],
			[-2/SQRT2, 1/SQRT2, 0/SQRT2],
			[-2/SQRT2, -1/SQRT2, 0/SQRT2],
		],
		faces: [
			/* clockwise
			[0, 8, 2, 10],
			[22, 14, 23, 15],
			[19, 6, 17, 7],
			[21, 12, 20, 13],
			[16, 4, 18, 5],
			[9, 1, 11, 3],
			[0, 10, 14, 22, 18, 4],
			[10, 2, 6, 19, 23, 14],
			[2, 8, 12, 21, 17, 6],
			[8, 0, 4, 16, 20, 12],
			[18, 22, 15, 11, 1, 5],
			[23, 19, 7, 3, 11, 15],
			[17, 21, 13, 9, 3, 7],
			[20, 16, 5, 1, 9, 13]
			*/
			// counterclockwise
			[0, 10, 2, 8],
			[22, 15, 23, 14],
			[19, 7, 17, 6],
			[21, 13, 20, 12],
			[16, 5, 18, 4],
			[9, 3, 11, 1],
			[4, 18, 22, 14, 10, 0],
			[14, 23, 19, 6, 2, 10],
			[6, 17, 21, 12, 8, 2],
			[12, 20, 16, 4, 0, 8],
			[5, 1, 11, 15, 22, 18],
			[15, 11, 3, 7, 19, 23],
			[7, 3, 9, 13, 21, 17],
			[13, 9, 1, 5, 16, 20]
		]
	}
}