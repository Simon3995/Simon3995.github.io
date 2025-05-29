a = (Math.PI / 6);
f = Math.sqrt((1 - Math.cos(2*a))**2+(Math.sin(2*a))**2);
h = 0.855599677167352;

shapes.antiprism6 = {
	verts: [
		[1/f, 0, h/2],
		[Math.cos(2 * a)/f, Math.sin(2 * a)/f, h/2],
		[Math.cos(4 * a)/f, Math.sin(4 * a)/f, h/2],
		[Math.cos(6 * a)/f, Math.sin(6 * a)/f, h/2],
		[Math.cos(8 * a)/f, Math.sin(8 * a)/f, h/2],
		[Math.cos(10 * a)/f, Math.sin(10 * a)/f, h/2],
		[Math.cos(1 * a)/f, Math.sin(1 * a)/f, -h/2],
		[Math.cos(3 * a)/f, Math.sin(3 * a)/f, -h/2],
		[Math.cos(5 * a)/f, Math.sin(5 * a)/f, -h/2],
		[Math.cos(7 * a)/f, Math.sin(7 * a)/f, -h/2],
		[Math.cos(9 * a)/f, Math.sin(9 * a)/f, -h/2],
		[Math.cos(11 * a)/f, Math.sin(11 * a)/f, -h/2],
	],
	faces: [
		[0,5,4,3,2,1],
		[6,7,8,9,10,11],
		[0,1,6],
		[1,7,6],
		[1,2,7],
		[2,8,7],
		[2,3,8],
		[3,9,8],
		[3,4,9],
		[4,10,9],
		[4,5,10],
		[5,11,10],
		[5,0,11],
		[0,6,11],
	]
}