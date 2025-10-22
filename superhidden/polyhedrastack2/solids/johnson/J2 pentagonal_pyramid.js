// J2 Pentagonal pyramid

import { PI, Cos, Sin, Sqrt } from '../../math.js';

const a = (2 * Math.PI) / 5;
const f = Sqrt((1 - Cos(a)) ** 2 + (Sin(a)) ** 2); // factor to scale 5-gon to length 1
const h = 0.5 * Sqrt((5 - Sqrt(5))/ 10); // half of the height of J2

export default {
	"Pentagonal Pyramid": {
		category: "Johnson",
		verts: [
			[1/f, 0, -h],
			[Cos(a)/f, Sin(a)/f, -h],
			[Cos(2 * a)/f, Sin(2 * a)/f, -h],
			[Cos(3 * a)/f, Sin(3 * a)/f, -h],
			[Cos(4 * a)/f, Sin(4 * a)/f, -h],
			[0, 0, h],
		],
		faces: [
			//counterclockwise
			[4, 3, 2, 1, 0],
			[5, 4, 0],
			[5, 3, 4],
			[5, 2, 3],
			[5, 1, 2],
			[5, 0, 1]
			/* clockwise
			[0, 1, 2, 3, 4],
			[0, 5, 1],
			[1, 5, 2],
			[2, 5, 3],
			[3, 5, 4],
			[4, 5, 0]
			*/
		]
	}
}