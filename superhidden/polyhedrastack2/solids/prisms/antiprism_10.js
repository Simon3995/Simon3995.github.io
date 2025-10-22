import { PI, Cos, Sin, Sqrt } from '../../math.js';

const a = (Math.PI / 10);
const f = Math.sqrt((1 - Math.cos(2 * a)) ** 2 + (Math.sin(2 * a)) ** 2);
const h = 0.862397003859459;

export default {
	"Decagonal Antiprism": {
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
			[Math.cos(16 * a) / f, Math.sin(16 * a) / f, h / 2],
			[Math.cos(18 * a) / f, Math.sin(18 * a) / f, h / 2],
			[Math.cos(1 * a) / f, Math.sin(1 * a) / f, -h / 2],
			[Math.cos(3 * a) / f, Math.sin(3 * a) / f, -h / 2],
			[Math.cos(5 * a) / f, Math.sin(5 * a) / f, -h / 2],
			[Math.cos(7 * a) / f, Math.sin(7 * a) / f, -h / 2],
			[Math.cos(9 * a) / f, Math.sin(9 * a) / f, -h / 2],
			[Math.cos(11 * a) / f, Math.sin(11 * a) / f, -h / 2],
			[Math.cos(13 * a) / f, Math.sin(13 * a) / f, -h / 2],
			[Math.cos(15 * a) / f, Math.sin(15 * a) / f, -h / 2],
			[Math.cos(17 * a) / f, Math.sin(17 * a) / f, -h / 2],
			[Math.cos(19 * a) / f, Math.sin(19 * a) / f, -h / 2],
		],
		faces: [
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
			[19, 18, 17, 16, 15, 14, 13, 12, 11, 10],
			[10, 1, 0],
			[11, 2, 1],
			[12, 3, 2],
			[13, 4, 3],
			[14, 5, 4],
			[15, 6, 5],
			[16, 7, 6],
			[17, 8, 7],
			[18, 9, 8],
			[19, 0, 9],
			[10, 11, 1],
			[11, 12, 2],
			[12, 13, 3],
			[13, 14, 4],
			[14, 15, 5],
			[15, 16, 6],
			[16, 17, 7],
			[17, 18, 8],
			[18, 19, 9],
			[19, 10, 0]
		]
	}
}