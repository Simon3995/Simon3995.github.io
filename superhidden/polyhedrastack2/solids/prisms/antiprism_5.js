import { PI, Cos, Sin, Sqrt } from '../../math.js';

const a = Math.PI / 5;
const f = Math.sqrt((1 - Math.cos(2 * a)) ** 2 + (Math.sin(2 * a)) ** 2);
const h = 0.85065080835204;

export default {
	"Pentagonal Antiprism": {
		category: "Prisms and Antiprisms",
		verts: [
			[1 / f, 0, h / 2],
			[Math.cos(2 * a) / f, Math.sin(2 * a) / f, h / 2],
			[Math.cos(4 * a) / f, Math.sin(4 * a) / f, h / 2],
			[Math.cos(6 * a) / f, Math.sin(6 * a) / f, h / 2],
			[Math.cos(8 * a) / f, Math.sin(8 * a) / f, h / 2],
			[Math.cos(1 * a) / f, Math.sin(1 * a) / f, -h / 2],
			[Math.cos(3 * a) / f, Math.sin(3 * a) / f, -h / 2],
			[Math.cos(5 * a) / f, Math.sin(5 * a) / f, -h / 2],
			[Math.cos(7 * a) / f, Math.sin(7 * a) / f, -h / 2],
			[Math.cos(9 * a) / f, Math.sin(9 * a) / f, -h / 2]
		],
		faces: [
			[1, 2, 3, 4, 0],
			[9, 8, 7, 6, 5],
			[5, 1, 0],
			[5, 6, 1],
			[6, 2, 1],
			[6, 7, 2],
			[7, 3, 2],
			[7, 8, 3],
			[8, 4, 3],
			[8, 9, 4],
			[9, 0, 4],
			[9, 5, 0]
		]
	}
}