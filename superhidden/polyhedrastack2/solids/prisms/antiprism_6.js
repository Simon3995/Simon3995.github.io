import { PI, Cos, Sin, Sqrt } from '../../math.js';

const a = (Math.PI / 6);
const f = Math.sqrt((1 - Math.cos(2 * a)) ** 2 + (Math.sin(2 * a)) ** 2);
const h = 0.855599677167352;

export default {
	"Hexagonal Antiprism": {
		category: "Prisms and Antiprisms",
		verts: [
			[1 / f, 0, h / 2],
			[Math.cos(2 * a) / f, Math.sin(2 * a) / f, h / 2],
			[Math.cos(4 * a) / f, Math.sin(4 * a) / f, h / 2],
			[Math.cos(6 * a) / f, Math.sin(6 * a) / f, h / 2],
			[Math.cos(8 * a) / f, Math.sin(8 * a) / f, h / 2],
			[Math.cos(10 * a) / f, Math.sin(10 * a) / f, h / 2],
			[Math.cos(1 * a) / f, Math.sin(1 * a) / f, -h / 2],
			[Math.cos(3 * a) / f, Math.sin(3 * a) / f, -h / 2],
			[Math.cos(5 * a) / f, Math.sin(5 * a) / f, -h / 2],
			[Math.cos(7 * a) / f, Math.sin(7 * a) / f, -h / 2],
			[Math.cos(9 * a) / f, Math.sin(9 * a) / f, -h / 2],
			[Math.cos(11 * a) / f, Math.sin(11 * a) / f, -h / 2]
		],
		faces: [
			[1, 2, 3, 4, 5, 0],
			[11, 10, 9, 8, 7, 6],
			[6, 1, 0],
			[6, 7, 1],
			[7, 2, 1],
			[7, 8, 2],
			[8, 3, 2],
			[8, 9, 3],
			[9, 4, 3],
			[9, 10, 4],
			[10, 5, 4],
			[10, 11, 5],
			[11, 0, 5],
			[11, 6, 0]
		]
	}
}