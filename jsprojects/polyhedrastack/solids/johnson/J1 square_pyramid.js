// J1 Square pyramid

import { SQRT2 } from '../../math.js';

const h = 0.5 * (0.5 * SQRT2); // half of the height of J1

export default {
	"Square Pyramid": {
		category: "Johnson",
		verts: [
			[0.5, 0.5, -h],
			[-0.5, 0.5, -h],
			[-0.5, -0.5, -h],
			[0.5, -0.5, -h],
			[0, 0, h],
		],
		faces: [
			//counterclockwise
			[0, 3, 2, 1],
			[4, 3, 0],
			[4, 2, 3],
			[4, 1, 2],
			[4, 0, 1]
			/* clockwise
			[0, 1, 2, 3],
			[0, 4, 1],
			[1, 4, 2],
			[2, 4, 3],
			[3, 4, 0]
			*/
		]
	}
}