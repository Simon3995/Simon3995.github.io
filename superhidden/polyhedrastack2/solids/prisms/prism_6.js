import { PI, Cos, Sin, Sqrt } from '../../math.js';

const a = PI / 6;
const f = Math.sqrt((1 - Math.cos(2 * a)) ** 2 + (Math.sin(2 * a)) ** 2);

export default {
	"Hexagonal Prism": {
		category: "Prisms and Antiprisms",
		verts: [
			[1 / f, 0, 0.5],
			[Math.cos(2 * a) / f, Math.sin(2 * a) / f, 0.5],
			[Math.cos(4 * a) / f, Math.sin(4 * a) / f, 0.5],
			[Math.cos(6 * a) / f, Math.sin(6 * a) / f, 0.5],
			[Math.cos(8 * a) / f, Math.sin(8 * a) / f, 0.5],
			[Math.cos(10 * a) / f, Math.sin(10 * a) / f, 0.5],
			[1 / f, 0, -0.5],
			[Math.cos(2 * a) / f, Math.sin(2 * a) / f, -0.5],
			[Math.cos(4 * a) / f, Math.sin(4 * a) / f, -0.5],
			[Math.cos(6 * a) / f, Math.sin(6 * a) / f, -0.5],
			[Math.cos(8 * a) / f, Math.sin(8 * a) / f, -0.5],
			[Math.cos(10 * a) / f, Math.sin(10 * a) / f, -0.5],
		],
		faces: [
			[1, 2, 3, 4, 5, 0],
			[11, 10, 9, 8, 7, 6],
			[6, 7, 1, 0],
			[7, 8, 2, 1],
			[8, 9, 3, 2],
			[9, 10, 4, 3],
			[10, 11, 5, 4],
			[11, 6, 0, 5]
		]
	}
}