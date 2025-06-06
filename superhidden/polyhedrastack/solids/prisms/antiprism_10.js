a = (Math.PI / 10);
f = Math.sqrt((1 - Math.cos(2*a))**2+(Math.sin(2*a))**2);
h = 0.862397003859459;

shapes.antiprism10 = {
	verts: [
		[1/f, 0, h/2],
		[Math.cos(2 * a)/f, Math.sin(2 * a)/f, h/2],
		[Math.cos(4 * a)/f, Math.sin(4 * a)/f, h/2],
		[Math.cos(6 * a)/f, Math.sin(6 * a)/f, h/2],
		[Math.cos(8 * a)/f, Math.sin(8 * a)/f, h/2],
		[Math.cos(10 * a)/f, Math.sin(10 * a)/f, h/2],
		[Math.cos(12 * a)/f, Math.sin(12 * a)/f, h/2],
		[Math.cos(14 * a)/f, Math.sin(14 * a)/f, h/2],
		[Math.cos(16 * a)/f, Math.sin(16 * a)/f, h/2],
		[Math.cos(18 * a)/f, Math.sin(18 * a)/f, h/2],
		[Math.cos(1 * a)/f, Math.sin(1 * a)/f, -h/2],
		[Math.cos(3 * a)/f, Math.sin(3 * a)/f, -h/2],
		[Math.cos(5 * a)/f, Math.sin(5 * a)/f, -h/2],
		[Math.cos(7 * a)/f, Math.sin(7 * a)/f, -h/2],
		[Math.cos(9 * a)/f, Math.sin(9 * a)/f, -h/2],
		[Math.cos(11 * a)/f, Math.sin(11 * a)/f, -h/2],
		[Math.cos(13 * a)/f, Math.sin(13 * a)/f, -h/2],
		[Math.cos(15 * a)/f, Math.sin(15 * a)/f, -h/2],
		[Math.cos(17 * a)/f, Math.sin(17 * a)/f, -h/2],
		[Math.cos(19 * a)/f, Math.sin(19 * a)/f, -h/2],
	],
	faces: [
		[0,9,8,7,6,5,4,3,2,1],
		[10,11,12,13,14,15,16,17,18,19],
		[0,1,10],
		[1,2,11],
		[2,3,12],
		[3,4,13],
		[4,5,14],
		[5,6,15],
		[6,7,16],
		[7,8,17],
		[8,9,18],
		[9,0,19],
		[1,11,10],
		[2,12,11],
		[3,13,12],
		[4,14,13],
		[5,15,14],
		[6,16,15],
		[7,17,16],
		[8,18,17],
		[9,19,18],
		[0,10,19],
	],
};