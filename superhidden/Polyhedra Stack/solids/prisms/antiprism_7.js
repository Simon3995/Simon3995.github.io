a = (Math.PI / 7);
f = Math.sqrt((1 - Math.cos(2*a))**2+(Math.sin(2*a))**2);
h = 0.858473196494555;

shapes.antiprism7 = {
	verts: [
		[1/f, 0, h/2],
		[Math.cos(2 * a)/f, Math.sin(2 * a)/f, h/2],
		[Math.cos(4 * a)/f, Math.sin(4 * a)/f, h/2],
		[Math.cos(6 * a)/f, Math.sin(6 * a)/f, h/2],
		[Math.cos(8 * a)/f, Math.sin(8 * a)/f, h/2],
		[Math.cos(10 * a)/f, Math.sin(10 * a)/f, h/2],
		[Math.cos(12 * a)/f, Math.sin(12 * a)/f, h/2],
		[Math.cos(1 * a)/f, Math.sin(1 * a)/f, -h/2],
		[Math.cos(3 * a)/f, Math.sin(3 * a)/f, -h/2],
		[Math.cos(5 * a)/f, Math.sin(5 * a)/f, -h/2],
		[Math.cos(7 * a)/f, Math.sin(7 * a)/f, -h/2],
		[Math.cos(9 * a)/f, Math.sin(9 * a)/f, -h/2],
		[Math.cos(11 * a)/f, Math.sin(11 * a)/f, -h/2],
		[Math.cos(13 * a)/f, Math.sin(13 * a)/f, -h/2],
	],
	faces: [
		[0,6,5,4,3,2,1],
		[7,8,9,10,11,12,13],
		[0,1,7],
		[1,8,7],
		[1,2,8],
		[2,9,8],
		[2,3,9],
		[3,10,9],
		[3,4,10],
		[4,11,10],
		[4,5,11],
		[5,12,11],
		[5,6,12],
		[6,13,12],
		[6,0,13],
		[0,7,13],
	],
};