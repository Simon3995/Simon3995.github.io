import { PI, Cos, Sin, Sqrt } from '../../math.js';

const a = PI / 8;
const f = Math.sqrt((1 - Math.cos(2 * a)) ** 2 + (Math.sin(2 * a)) ** 2);

export default {
	"Octagonal Prism": {
		category: "Prisms and Antiprisms",
		verts: [
			[1 / f, 0, 0.5],
			[Math.cos(2 * a) / f, Math.sin(2 * a) / f, 0.5],
			[Math.cos(4 * a) / f, Math.sin(4 * a) / f, 0.5],
			[Math.cos(6 * a) / f, Math.sin(6 * a) / f, 0.5],
			[Math.cos(8 * a) / f, Math.sin(8 * a) / f, 0.5],
			[Math.cos(10 * a) / f, Math.sin(10 * a) / f, 0.5],
			[Math.cos(12 * a) / f, Math.sin(12 * a) / f, 0.5],
			[Math.cos(14 * a) / f, Math.sin(14 * a) / f, 0.5],
			[1 / f, 0, -0.5],
			[Math.cos(2 * a) / f, Math.sin(2 * a) / f, -0.5],
			[Math.cos(4 * a) / f, Math.sin(4 * a) / f, -0.5],
			[Math.cos(6 * a) / f, Math.sin(6 * a) / f, -0.5],
			[Math.cos(8 * a) / f, Math.sin(8 * a) / f, -0.5],
			[Math.cos(10 * a) / f, Math.sin(10 * a) / f, -0.5],
			[Math.cos(12 * a) / f, Math.sin(12 * a) / f, -0.5],
			[Math.cos(14 * a) / f, Math.sin(14 * a) / f, -0.5],
		],
		faces: [
			[1, 2, 3, 4, 5, 6, 7, 0],
			[15, 14, 13, 12, 11, 10, 9, 8],
			[8, 9, 1, 0],
			[9, 10, 2, 1],
			[10, 11, 3, 2],
			[11, 12, 4, 3],
			[12, 13, 5, 4],
			[13, 14, 6, 5],
			[14, 15, 7, 6],
			[15, 8, 0, 7]
		]
	}
}