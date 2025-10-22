import { PI, Cos, Sin, Sqrt } from '../../math.js';

const a = PI / 7;
const f = Math.sqrt((1 - Math.cos(2 * a)) ** 2 + (Math.sin(2 * a)) ** 2);

export default {
	"Heptagonal Prism": {
		category: "Prisms and Antiprisms",
		verts: [
			[1 / f, 0, 0.5],
			[Math.cos(2 * a) / f, Math.sin(2 * a) / f, 0.5],
			[Math.cos(4 * a) / f, Math.sin(4 * a) / f, 0.5],
			[Math.cos(6 * a) / f, Math.sin(6 * a) / f, 0.5],
			[Math.cos(8 * a) / f, Math.sin(8 * a) / f, 0.5],
			[Math.cos(10 * a) / f, Math.sin(10 * a) / f, 0.5],
			[Math.cos(12 * a) / f, Math.sin(12 * a) / f, 0.5],
			[1 / f, 0, -0.5],
			[Math.cos(2 * a) / f, Math.sin(2 * a) / f, -0.5],
			[Math.cos(4 * a) / f, Math.sin(4 * a) / f, -0.5],
			[Math.cos(6 * a) / f, Math.sin(6 * a) / f, -0.5],
			[Math.cos(8 * a) / f, Math.sin(8 * a) / f, -0.5],
			[Math.cos(10 * a) / f, Math.sin(10 * a) / f, -0.5],
			[Math.cos(12 * a) / f, Math.sin(12 * a) / f, -0.5],
		],
		faces: [
			[1, 2, 3, 4, 5, 6, 0],
			[13, 12, 11, 10, 9, 8, 7],
			[7, 8, 1, 0],
			[8, 9, 2, 1],
			[9, 10, 3, 2],
			[10, 11, 4, 3],
			[11, 12, 5, 4],
			[12, 13, 6, 5],
			[13, 7, 0, 6]
		]
	}
}