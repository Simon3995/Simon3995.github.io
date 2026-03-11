// J5 Pentagonal Cupola

import { PI, Cos, Sin, Sqrt } from '../../math.js';

const a = (2 * Math.PI) / 20; // divide 2*PI in 20
// 0, 4, 8, 12, 16 segments for 5-gon; 1, 3, 5, 7, 9, 11, 13, 15, 17, 19 segments for 10-gon
const f1 = Math.sqrt((1 - Math.cos(4*a))**2+(Math.sin(4*a))**2); // factor to scale 5-gon to length 1
const f2 = Math.sqrt((1 - Math.cos(2*a))**2+(Math.sin(2*a))**2); // factor to scale 10-gon to length 1
const h = 0.5 * Math.sqrt((5 - Math.sqrt(5))/ 10); // half of the height of J5

export default {
	"Pentagonal Cupola": {
        category: "Johnson",
        verts: [
            [1 / f1, 0, h],
            [Math.cos(4 * a) / f1, Math.sin(4 * a) / f1, h],
            [Math.cos(8 * a) / f1, Math.sin(8 * a) / f1, h],
            [Math.cos(12 * a) / f1, Math.sin(12 * a) / f1, h],
            [Math.cos(16 * a) / f1, Math.sin(16 * a) / f1, h],
            [Math.cos(a)/f2, Math.sin(a)/f2, -h],
            [Math.cos(3 * a)/f2, Math.sin(3 * a)/f2, -h],
            [Math.cos(5 * a)/f2, Math.sin(5 * a)/f2, -h],
            [Math.cos(7 * a)/f2, Math.sin(7 * a)/f2, -h],
            [Math.cos(9 * a)/f2, Math.sin(9 * a)/f2, -h],
            [Math.cos(11 * a)/f2, Math.sin(11 * a)/f2, -h],
            [Math.cos(13 * a)/f2, Math.sin(13 * a)/f2, -h],
            [Math.cos(15 * a)/f2, Math.sin(15 * a)/f2, -h],
            [Math.cos(17 * a)/f2, Math.sin(17 * a)/f2, -h],
            [Math.cos(19 * a)/f2, Math.sin(19 * a)/f2, -h]
        ],
        faces: [
            [0, 1, 2, 3, 4],
            [0, 14, 5],
            [0, 5, 6, 1],
            [1, 6, 7],
            [1, 7, 8, 2],
            [2, 8, 9],
            [2, 9, 10, 3],
            [3, 10, 11],
            [3, 11, 12, 4],
            [4, 12, 13],
            [4, 13, 14, 0],
            [14, 13, 12, 11, 10, 9, 8, 7, 6, 5]
        ]
    }
}