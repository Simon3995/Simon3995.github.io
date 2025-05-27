a = (Math.PI / 6);
f = Math.sqrt((1 - Math.cos(2*a))**2+(Math.sin(2*a))**2);

shapes.prism6 = {
	verts: [
		[1/f, 0, 0.5],
		[Math.cos(2 * a)/f, Math.sin(2 * a)/f, 0.5],
		[Math.cos(4 * a)/f, Math.sin(4 * a)/f, 0.5],
		[Math.cos(6 * a)/f, Math.sin(6 * a)/f, 0.5],
		[Math.cos(8 * a)/f, Math.sin(8 * a)/f, 0.5],
		[Math.cos(10 * a)/f, Math.sin(10 * a)/f, 0.5],
		[1/f, 0, -0.5],
		[Math.cos(2 * a)/f, Math.sin(2 * a)/f, -0.5],
		[Math.cos(4 * a)/f, Math.sin(4 * a)/f, -0.5],
		[Math.cos(6 * a)/f, Math.sin(6 * a)/f, -0.5],
		[Math.cos(8 * a)/f, Math.sin(8 * a)/f, -0.5],
		[Math.cos(10 * a)/f, Math.sin(10 * a)/f, -0.5],
	],
	faces: [
		[0,5,4,3,2,1],
		[6,7,8,9,10,11],
		[0,1,7,6],
		[1,2,8,7],
		[2,3,9,8],
		[3,4,10,9],
		[4,5,11,10],
		[5,0,6,11],
	],
};