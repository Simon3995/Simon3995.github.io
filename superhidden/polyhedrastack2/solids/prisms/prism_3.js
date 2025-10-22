import { PI, Cos, Sin, Sqrt } from '../../math.js';

const a = (2 / 3) * Math.PI;
const f = Math.sqrt((-Math.cos(a) + 1) ** 2 + (Math.sin(a)) ** 2);

export default {
	"Triangular Prism": {
		category: "Prisms and Antiprisms",
		verts: [
			[1 / f, 0, 0.5],
			[Math.cos(a) / f, Math.sin(a) / f, 0.5],
			[Math.cos(2 * a) / f, Math.sin(2 * a) / f, 0.5],
			[1 / f, 0, -0.5],
			[Math.cos(a) / f, Math.sin(a) / f, -0.5],
			[Math.cos(2 * a) / f, Math.sin(2 * a) / f, -0.5],
		],
		faces: [
			[2, 0, 1],
			[5, 4, 3],
			[3, 4, 1, 0],
			[4, 5, 2, 1],
			[5, 3, 0, 2]
		]
	}
}