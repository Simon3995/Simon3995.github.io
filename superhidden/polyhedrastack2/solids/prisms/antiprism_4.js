const h = 0.840896415253715;

import { SQRT2 } from '../../math.js';

export default {
	"Square Antiprism": {
		category: "Prisms and Antiprisms",
		verts: [
			[0.5, 0.5, h / 2],
			[-0.5, 0.5, h / 2],
			[-0.5, -0.5, h / 2],
			[0.5, -0.5, h / 2],
			[Math.sqrt(2) / 2, 0, -h / 2],
			[0, Math.sqrt(2) / 2, -h / 2],
			[-Math.sqrt(2) / 2, 0, -h / 2],
			[0, -Math.sqrt(2) / 2, -h / 2]
		],
		faces: [
			[1, 2, 3, 0],
			[7, 6, 5, 4],
			[4, 0, 3],
			[4, 5, 0],
			[5, 1, 0],
			[5, 6, 1],
			[6, 2, 1],
			[6, 7, 2],
			[7, 3, 2],
			[7, 4, 3]
		]
	}
}