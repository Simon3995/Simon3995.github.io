import { PI, Cos, Sin, Sqrt } from '../../math.js';

const a = (Math.PI / 8);
const f = Math.sqrt((1 - Math.cos(2 * a)) ** 2 + (Math.sin(2 * a)) ** 2);
const h = 0.860295569862972;

export default {
	"Octagonal Antiprism": {
		category: "Prisms and Antiprisms",
		verts: [
			[1 / f, 0, h / 2],
			[Math.cos(2 * a) / f, Math.sin(2 * a) / f, h / 2],
			[Math.cos(4 * a) / f, Math.sin(4 * a) / f, h / 2],
			[Math.cos(6 * a) / f, Math.sin(6 * a) / f, h / 2],
			[Math.cos(8 * a) / f, Math.sin(8 * a) / f, h / 2],
			[Math.cos(10 * a) / f, Math.sin(10 * a) / f, h / 2],
			[Math.cos(12 * a) / f, Math.sin(12 * a) / f, h / 2],
			[Math.cos(14 * a) / f, Math.sin(14 * a) / f, h / 2],
			[Math.cos(1 * a) / f, Math.sin(1 * a) / f, -h / 2],
			[Math.cos(3 * a) / f, Math.sin(3 * a) / f, -h / 2],
			[Math.cos(5 * a) / f, Math.sin(5 * a) / f, -h / 2],
			[Math.cos(7 * a) / f, Math.sin(7 * a) / f, -h / 2],
			[Math.cos(9 * a) / f, Math.sin(9 * a) / f, -h / 2],
			[Math.cos(11 * a) / f, Math.sin(11 * a) / f, -h / 2],
			[Math.cos(13 * a) / f, Math.sin(13 * a) / f, -h / 2],
			[Math.cos(15 * a) / f, Math.sin(15 * a) / f, -h / 2]
		],
		faces: [
			[1, 2, 3, 4, 5, 6, 7, 0],
			[15, 14, 13, 12, 11, 10, 9, 8],
			[8, 1, 0],
			[8, 9, 1],
			[9, 2, 1],
			[9, 10, 2],
			[10, 3, 2],
			[10, 11, 3],
			[11, 4, 3],
			[11, 12, 4],
			[12, 5, 4],
			[12, 13, 5],
			[13, 6, 5],
			[13, 14, 6],
			[14, 7, 6],
			[14, 15, 7],
			[15, 0, 7],
			[15, 8, 0]
		]
	}
}