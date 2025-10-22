// J3 Triangular Cupola

import { PI, Cos, Sin, Sqrt } from '../../math.js';

const a = (2 * Math.PI) / 12; // divide 2*PI in 12 
// 0, 4, 8 segments for 3-gon; 1, 3, 5, 7, 9, 11 segments for 6-gon
const f1 = Math.sqrt((1 - Math.cos(4*a))**2+(Math.sin(4*a))**2); // factor to scale 3-gon to length 1
const f2 = Math.sqrt((1 - Math.cos(2*a))**2+(Math.sin(2*a))**2); // factor to scale 6-gon to length 1
const h = 0.5 * (Math.sqrt(6) / 3); // half of the height of J3

export default {
	"Triangular Cupola": {
		category: "Johnson",
		verts: [
			[1 / f1, 0, h],
			[Math.cos(4 * a) / f1, Math.sin(4 * a) / f1, h],
			[Math.cos(8 * a) / f1, Math.sin(8 * a) / f1, h],
			[Math.cos(a)/f2, Math.sin(a)/f2, -h],
			[Math.cos(3 * a)/f2, Math.sin(3 * a)/f2, -h],
			[Math.cos(5 * a)/f2, Math.sin(5 * a)/f2, -h],
			[Math.cos(7 * a)/f2, Math.sin(7 * a)/f2, -h],
			[Math.cos(9 * a)/f2, Math.sin(9 * a)/f2, -h],
			[Math.cos(11 * a)/f2, Math.sin(11 * a)/f2, -h],
		],
		faces: [
			// counterclockwise
			[0, 1, 2],
			[0, 8, 3],
			[0, 3, 4, 1],
			[1, 4, 5],
			[1, 5, 6, 2],
			[2, 6, 7],
			[2, 7, 8, 0],
			[8, 7, 6, 5, 4, 3] 
		]
	}
}