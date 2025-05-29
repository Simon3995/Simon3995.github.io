a = Math.PI / 5;
f = Math.sqrt((1 - Math.cos(2*a))**2+(Math.sin(2*a))**2);

shapes.prism5 = {
	verts: [
		[1/f, 0, 0.5],
		[Math.cos(2 * a)/f, Math.sin(2 * a)/f, 0.5],
		[Math.cos(4 * a)/f, Math.sin(4 * a)/f, 0.5],
		[Math.cos(6 * a)/f, Math.sin(6 * a)/f, 0.5],
		[Math.cos(8 * a)/f, Math.sin(8 * a)/f, 0.5],
		[1/f, 0, -0.5],
		[Math.cos(2 * a)/f, Math.sin(2 * a)/f, -0.5],
		[Math.cos(4 * a)/f, Math.sin(4 * a)/f, -0.5],
		[Math.cos(6 * a)/f, Math.sin(6 * a)/f, -0.5],
		[Math.cos(8 * a)/f, Math.sin(8 * a)/f, -0.5],
	],
	faces: [
		[0,4,3,2,1],
		[5,6,7,8,9],
		[0,1,6,5],
		[1,2,7,6],
		[2,3,8,7],
		[3,4,9,8],
		[4,0,5,9],
	]
}