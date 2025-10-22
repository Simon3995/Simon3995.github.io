import { PI, Cos, Sin, Sqrt } from '../../math.js';

const a = PI / 5;
const f = Math.sqrt((1 - Math.cos(2 * a)) ** 2 + (Math.sin(2 * a)) ** 2);

export default {
	"Pentagonal Prism": {
		category: "Prisms and Antiprisms",
		verts: [
			[1 / f, 0, 0.5],
			[Math.cos(2 * a) / f, Math.sin(2 * a) / f, 0.5],
			[Math.cos(4 * a) / f, Math.sin(4 * a) / f, 0.5],
			[Math.cos(6 * a) / f, Math.sin(6 * a) / f, 0.5],
			[Math.cos(8 * a) / f, Math.sin(8 * a) / f, 0.5],
			[1 / f, 0, -0.5],
			[Math.cos(2 * a) / f, Math.sin(2 * a) / f, -0.5],
			[Math.cos(4 * a) / f, Math.sin(4 * a) / f, -0.5],
			[Math.cos(6 * a) / f, Math.sin(6 * a) / f, -0.5],
			[Math.cos(8 * a) / f, Math.sin(8 * a) / f, -0.5],
		],
		faces: [
			[1, 2, 3, 4, 0],
			[9, 8, 7, 6, 5],
			[5, 6, 1, 0],
			[6, 7, 2, 1],
			[7, 8, 3, 2],
			[8, 9, 4, 3],
			[9, 5, 0, 4]
		]
	}
}