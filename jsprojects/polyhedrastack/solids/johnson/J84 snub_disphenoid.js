// J84 Snub Dishpenoid

import { Sqrt } from '../../math.js';

const q = 0.16902;
const r = Sqrt(q) / 2;
const s = Sqrt((1 - q) / (8 * q));
const t = Sqrt((1-q) / 2);

export default {
	"Snub Disphenoid": {
		category: "Johnson",
        verts: [
			[t, 0, -r],
            [-t, 0, -r],
            [0, t, r],
            [0, -t, r],
            [0.5, 0, s],
            [-0.5, 0, s],
            [0, 0.5, -s],
            [0, -0.5, -s]
		],
			faces: [
			[4, 2, 5],
            [5, 3, 4],
            [5, 1, 3],
            [1, 7, 3],
            [3, 0, 4],
            [3, 7, 0],
            [7, 6, 0],
            [0, 6, 2],
            [6, 7, 1],
            [2, 6, 1],
            [4, 0, 2],
            [5, 2, 1]
		]
	}
}