a = (Math.PI / 7);
f = Math.sqrt((1 - Math.cos(2*a))**2+(Math.sin(2*a))**2);

shapes.prism7 = {
	verts: [
		[1/f, 0, 0.5],
		[Math.cos(2 * a)/f, Math.sin(2 * a)/f, 0.5],
		[Math.cos(4 * a)/f, Math.sin(4 * a)/f, 0.5],
		[Math.cos(6 * a)/f, Math.sin(6 * a)/f, 0.5],
		[Math.cos(8 * a)/f, Math.sin(8 * a)/f, 0.5],
		[Math.cos(10 * a)/f, Math.sin(10 * a)/f, 0.5],
		[Math.cos(12 * a)/f, Math.sin(12 * a)/f, 0.5],
		[1/f, 0, -0.5],
		[Math.cos(2 * a)/f, Math.sin(2 * a)/f, -0.5],
		[Math.cos(4 * a)/f, Math.sin(4 * a)/f, -0.5],
		[Math.cos(6 * a)/f, Math.sin(6 * a)/f, -0.5],
		[Math.cos(8 * a)/f, Math.sin(8 * a)/f, -0.5],
		[Math.cos(10 * a)/f, Math.sin(10 * a)/f, -0.5],
		[Math.cos(12 * a)/f, Math.sin(12 * a)/f, -0.5],
	],
	faces: [
		[0,6,5,4,3,2,1],
		[7,8,9,10,11,12,13],
		[0,1,8,7],
		[1,2,9,8],
		[2,3,10,9],
		[3,4,11,10],
		[4,5,12,11],
		[5,6,13,12],
		[6,0,7,13],
	],
};