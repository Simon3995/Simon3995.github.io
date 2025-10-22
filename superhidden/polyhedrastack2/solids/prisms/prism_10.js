import { PI, Cos, Sin, Sqrt } from '../../math.js';

const a = PI / 10;
const f = Math.sqrt((1 - Math.cos(2 * a)) ** 2 + (Math.sin(2 * a)) ** 2);

export default {
	"Decagonal Prism": {
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
			[Math.cos(16 * a) / f, Math.sin(16 * a) / f, 0.5],
			[Math.cos(18 * a) / f, Math.sin(18 * a) / f, 0.5],
			[1 / f, 0, -0.5],
			[Math.cos(2 * a) / f, Math.sin(2 * a) / f, -0.5],
			[Math.cos(4 * a) / f, Math.sin(4 * a) / f, -0.5],
			[Math.cos(6 * a) / f, Math.sin(6 * a) / f, -0.5],
			[Math.cos(8 * a) / f, Math.sin(8 * a) / f, -0.5],
			[Math.cos(10 * a) / f, Math.sin(10 * a) / f, -0.5],
			[Math.cos(12 * a) / f, Math.sin(12 * a) / f, -0.5],
			[Math.cos(14 * a) / f, Math.sin(14 * a) / f, -0.5],
			[Math.cos(16 * a) / f, Math.sin(16 * a) / f, -0.5],
			[Math.cos(18 * a) / f, Math.sin(18 * a) / f, -0.5],
		],
		faces: [
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
			[19, 18, 17, 16, 15, 14, 13, 12, 11, 10],
			[10, 11, 1, 0],
			[11, 12, 2, 1],
			[12, 13, 3, 2],
			[13, 14, 4, 3],
			[14, 15, 5, 4],
			[15, 16, 6, 5],
			[16, 17, 7, 6],
			[17, 18, 8, 7],
			[18, 19, 9, 8],
			[19, 10, 0, 9]
		]
	}
}