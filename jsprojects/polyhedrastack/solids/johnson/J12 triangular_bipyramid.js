// J12 Triangular Bipyramid

import { PI, Cos, Sin, Sqrt } from '../../math.js';

const a = (2/3) * Math.PI;
const f = Math.sqrt((-Math.cos(a) + 1)**2+(Math.sin(a))**2); // scale edges to length 1
//const h = 0.5 * 1.632993161855452;
const h = 0.5 * ( (2 * Sqrt(6)) / 3 ); // half the height of J12

export default {
	"Triangular Bipyramid": {
		category: "Johnson",
		verts: [
			[0, 0, h],
			[1/f, 0, 0],
			[Math.cos(a)/f, Math.sin(a)/f, 0],
			[Math.cos(2 * a)/f, Math.sin(2 * a)/f, 0],
			[0, 0, -h],
		],
		faces: [
			//counterclockwise
			[0, 1, 2],
			[0, 2, 3],
			[0, 3, 1],
			[4, 1, 3],
			[4, 2, 1],
			[4, 3, 2]
		]
	}
}