// shape definition
// archimedean - truncated cube

import { SQRT2 } from '../../math.js';
const TRUNCUBE = 2 * (SQRT2 - 1); // used for truncated cube

export default {
	"Truncated Cube": {
		category: "Archimedean",
		verts: [
			[0.5, 1 / TRUNCUBE, 1 / TRUNCUBE],
			[0.5, 1 / TRUNCUBE, -1 / TRUNCUBE],
			[0.5, -1 / TRUNCUBE, 1 / TRUNCUBE],
			[0.5, -1 / TRUNCUBE, -1 / TRUNCUBE],
			[-0.5, 1 / TRUNCUBE, 1 / TRUNCUBE],
			[-0.5, 1 / TRUNCUBE, -1 / TRUNCUBE],
			[-0.5, -1 / TRUNCUBE, 1 / TRUNCUBE],
			[-0.5, -1 / TRUNCUBE, -1 / TRUNCUBE],
			[1 / TRUNCUBE, 0.5, 1 / TRUNCUBE],
			[1 / TRUNCUBE, 0.5, -1 / TRUNCUBE],
			[1 / TRUNCUBE, -0.5, 1 / TRUNCUBE],
			[1 / TRUNCUBE, -0.5, -1 / TRUNCUBE],
			[-1 / TRUNCUBE, 0.5, 1 / TRUNCUBE],
			[-1 / TRUNCUBE, 0.5, -1 / TRUNCUBE],
			[-1 / TRUNCUBE, -0.5, 1 / TRUNCUBE],
			[-1 / TRUNCUBE, -0.5, -1 / TRUNCUBE],
			[1 / TRUNCUBE, 1 / TRUNCUBE, 0.5],
			[1 / TRUNCUBE, 1 / TRUNCUBE, -0.5],
			[1 / TRUNCUBE, -1 / TRUNCUBE, 0.5],
			[1 / TRUNCUBE, -1 / TRUNCUBE, -0.5],
			[-1 / TRUNCUBE, 1 / TRUNCUBE, 0.5],
			[-1 / TRUNCUBE, 1 / TRUNCUBE, -0.5],
			[-1 / TRUNCUBE, -1 / TRUNCUBE, 0.5],
			[-1 / TRUNCUBE, -1 / TRUNCUBE, -0.5],
		],
		faces: [
			/* clockwise
			[8, 0, 16],
			[4, 12, 20],
			[14, 6, 22],
			[2, 10, 18],
			[17, 1, 9],
			[21, 13, 5],
			[23, 7, 15],
			[19, 11, 3],
			[0, 8, 10, 2, 6, 14, 12, 4],
			[0, 4, 20, 21, 5, 1, 17, 16],
			[12, 14, 22, 23, 15, 13, 21, 20],
			[6, 2, 18, 19, 3, 7, 23, 22],
			[10, 8, 16, 17, 9, 11, 19, 18],
			[11, 9, 1, 5, 13, 15, 7, 3] */
			//counterclockwise
			[16, 0, 8],
			[20, 12, 4],
			[22, 6, 14],
			[18, 10, 2],
			[9, 1, 17],
			[5, 13, 21],
			[15, 7, 23],
			[3, 11, 19],
			[4, 12, 14, 6, 2, 10, 8, 0],
			[16, 17, 1, 5, 21, 20, 4, 0],
			[20, 21, 13, 15, 23, 22, 14, 12],
			[22, 23, 7, 3, 19, 18, 2, 6],
			[18, 19, 11, 9, 17, 16, 8, 10],
			[3, 7, 15, 13, 5, 1, 9, 11]
		]
	}
}