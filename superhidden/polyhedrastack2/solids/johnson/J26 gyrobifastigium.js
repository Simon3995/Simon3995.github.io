// J26 Gyrobifastigium

import { Sqrt } from '../../math.js';

export default {
	"Gyrobifastigium": {
		category: "Johnson",
		verts: [
			[0.5, 0.5, 0],
			[-0.5, 0.5, 0],
			[-0.5, -0.5, 0],
			[0.5, -0.5, 0],
			[-0.5, 0, 0.5*Math.sqrt(3)],
			[0.5, 0, 0.5*Math.sqrt(3)],
			[0, -0.5, -0.5*Math.sqrt(3)],
			[0, 0.5, -0.5*Math.sqrt(3)],
		],
			faces: [
			//counterclockwise
			[3, 0, 5],
			[0, 1, 4, 5],
			[1, 2, 4],
			[2, 3, 5, 4],
			[3, 6, 7, 0],
			[0, 7, 1],
			[1, 7, 6, 2],
			[2, 6, 3]
			//clockwise (?)
			/*
			[3, 5, 0],
			[0, 5, 4, 1],
			[1, 4, 2],
			[2, 4, 5, 3],
			[3, 0, 7, 6],
			[0, 1, 7],
			[1, 2, 6, 7],
			[2, 3, 6]
			*/
		]
	}
}