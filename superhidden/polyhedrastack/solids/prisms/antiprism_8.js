a = (Math.PI / 8);
f = Math.sqrt((1 - Math.cos(2*a))**2+(Math.sin(2*a))**2);
h = 0.860295569862972;

shapes.antiprism8 = {
	verts: [
		[1/f, 0, h/2],
		[Math.cos(2 * a)/f, Math.sin(2 * a)/f, h/2],
		[Math.cos(4 * a)/f, Math.sin(4 * a)/f, h/2],
		[Math.cos(6 * a)/f, Math.sin(6 * a)/f, h/2],
		[Math.cos(8 * a)/f, Math.sin(8 * a)/f, h/2],
		[Math.cos(10 * a)/f, Math.sin(10 * a)/f, h/2],
		[Math.cos(12 * a)/f, Math.sin(12 * a)/f, h/2],
		[Math.cos(14 * a)/f, Math.sin(14 * a)/f, h/2],
		[Math.cos(1 * a)/f, Math.sin(1 * a)/f, -h/2],
		[Math.cos(3 * a)/f, Math.sin(3 * a)/f, -h/2],
		[Math.cos(5 * a)/f, Math.sin(5 * a)/f, -h/2],
		[Math.cos(7 * a)/f, Math.sin(7 * a)/f, -h/2],
		[Math.cos(9 * a)/f, Math.sin(9 * a)/f, -h/2],
		[Math.cos(11 * a)/f, Math.sin(11 * a)/f, -h/2],
		[Math.cos(13 * a)/f, Math.sin(13 * a)/f, -h/2],
		[Math.cos(15 * a)/f, Math.sin(15 * a)/f, -h/2],
	],
	faces: [
		[0,7,6,5,4,3,2,1],
		[8,9,10,11,12,13,14,15],
		[0,1,8],
		[1,9,8],
		[1,2,9],
		[2,10,9],
		[2,3,10],
		[3,11,10],
		[3,4,11],
		[4,12,11],
		[4,5,12],
		[5,13,12],
		[5,6,13],
		[6,14,13],
		[6,7,14],
		[7,15,14],
		[7,0,15],
		[0,8,15],
	]
}