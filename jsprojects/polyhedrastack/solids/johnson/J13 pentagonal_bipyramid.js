// J13 Pentagonal Bipyramid

import { PI, Cos, Sin, Sqrt } from '../../math.js';

const a = Math.PI / 5;
const f = Math.sqrt((1 - Math.cos(2*a))**2+(Math.sin(2*a))**2);
//const h = 0.5 * 1.051462224238267;
const h = 0.5 * ( Sqrt( (10 - 2 * Sqrt(5)) / 5) ) // half the height of J13

export default {
	"Pentagonal Bipyramid": {
		category: "Johnson",
		verts: [
			[0, 0, h],
			[1/f, 0, 0],
			[Math.cos(2 * a)/f, Math.sin(2 * a)/f, 0],
			[Math.cos(4 * a)/f, Math.sin(4 * a)/f, 0],
			[Math.cos(6 * a)/f, Math.sin(6 * a)/f, 0],
			[Math.cos(8 * a)/f, Math.sin(8 * a)/f, 0],
			[0, 0, -h],
		],
		faces: [
			//counterclockwise
			[0, 1, 2],
			[0, 2, 3],
			[0, 3, 4],
			[0, 4, 5],
			[0, 5, 1],
			[6, 2, 1],
			[6, 3, 2],
			[6, 4, 3],
			[6, 5, 4],
			[6, 1, 5]
			/*	clockwise
			[1, 0, 2],
			[2, 0, 3],
			[3, 0, 4],
			[4, 0, 5],
			[5, 0, 1],
			[1, 2, 6],
			[2, 3, 6],
			[3, 4, 6],
			[4, 5, 6],
			[5, 1, 6] 
			*/
		]
	}
}