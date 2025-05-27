a = (Math.PI / 8);
f = Math.sqrt((1 - Math.cos(2*a))**2+(Math.sin(2*a))**2);

shapes.prism8 = {
	verts: [
		[1/f, 0, 0.5],
		[Math.cos(2 * a)/f, Math.sin(2 * a)/f, 0.5],
		[Math.cos(4 * a)/f, Math.sin(4 * a)/f, 0.5],
		[Math.cos(6 * a)/f, Math.sin(6 * a)/f, 0.5],
		[Math.cos(8 * a)/f, Math.sin(8 * a)/f, 0.5],
		[Math.cos(10 * a)/f, Math.sin(10 * a)/f, 0.5],
		[Math.cos(12 * a)/f, Math.sin(12 * a)/f, 0.5],
		[Math.cos(14 * a)/f, Math.sin(14 * a)/f, 0.5],
		[1/f, 0, -0.5],
		[Math.cos(2 * a)/f, Math.sin(2 * a)/f, -0.5],
		[Math.cos(4 * a)/f, Math.sin(4 * a)/f, -0.5],
		[Math.cos(6 * a)/f, Math.sin(6 * a)/f, -0.5],
		[Math.cos(8 * a)/f, Math.sin(8 * a)/f, -0.5],
		[Math.cos(10 * a)/f, Math.sin(10 * a)/f, -0.5],
		[Math.cos(12 * a)/f, Math.sin(12 * a)/f, -0.5],
		[Math.cos(14 * a)/f, Math.sin(14 * a)/f, -0.5],
	],
	faces: [
		[0,7,6,5,4,3,2,1],
		[8,9,10,11,12,13,14,15],
		[0,1,9,8],
		[1,2,10,9],
		[2,3,11,10],
		[3,4,12,11],
		[4,5,13,12],
		[5,6,14,13],
		[6,7,15,14],
		[7,0,8,15],
	]
}