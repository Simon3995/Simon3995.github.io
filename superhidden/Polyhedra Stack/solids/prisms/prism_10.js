a = (Math.PI / 10);
f = Math.sqrt((1 - Math.cos(2*a))**2+(Math.sin(2*a))**2);

shapes.prism10 = {
	verts: [
		[1/f, 0, 0.5],
		[Math.cos(2 * a)/f, Math.sin(2 * a)/f, 0.5],
		[Math.cos(4 * a)/f, Math.sin(4 * a)/f, 0.5],
		[Math.cos(6 * a)/f, Math.sin(6 * a)/f, 0.5],
		[Math.cos(8 * a)/f, Math.sin(8 * a)/f, 0.5],
		[Math.cos(10 * a)/f, Math.sin(10 * a)/f, 0.5],
		[Math.cos(12 * a)/f, Math.sin(12 * a)/f, 0.5],
		[Math.cos(14 * a)/f, Math.sin(14 * a)/f, 0.5],
		[Math.cos(16 * a)/f, Math.sin(16 * a)/f, 0.5],
		[Math.cos(18 * a)/f, Math.sin(18 * a)/f, 0.5],
		[1/f, 0, -0.5],
		[Math.cos(2 * a)/f, Math.sin(2 * a)/f, -0.5],
		[Math.cos(4 * a)/f, Math.sin(4 * a)/f, -0.5],
		[Math.cos(6 * a)/f, Math.sin(6 * a)/f, -0.5],
		[Math.cos(8 * a)/f, Math.sin(8 * a)/f, -0.5],
		[Math.cos(10 * a)/f, Math.sin(10 * a)/f, -0.5],
		[Math.cos(12 * a)/f, Math.sin(12 * a)/f, -0.5],
		[Math.cos(14 * a)/f, Math.sin(14 * a)/f, -0.5],
		[Math.cos(16 * a)/f, Math.sin(16 * a)/f, -0.5],
		[Math.cos(18 * a)/f, Math.sin(18 * a)/f, -0.5],
	],
	faces: [
		[0,9,8,7,6,5,4,3,2,1],
		[10,11,12,13,14,15,16,17,18,19],
		[0,1,11,10],
		[1,2,12,11],
		[2,3,13,12],
		[3,4,14,13],
		[4,5,15,14],
		[5,6,16,15],
		[6,7,17,16],
		[7,8,18,17],
		[8,9,19,18],
		[9,0,10,19],
	]
}