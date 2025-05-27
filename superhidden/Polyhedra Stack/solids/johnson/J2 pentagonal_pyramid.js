// J2 Pentagonal pyramid

a = Math.PI / 5;
f = Math.sqrt((1 - Math.cos(2*a))**2+(Math.sin(2*a))**2);
h = 0.5 * 1.051462224238267;

shapes.pentagonal_pyramid = {
	verts: [
		[1/f, 0, -0.5 * h],
		[Math.cos(2 * a)/f, Math.sin(2 * a)/f, -0.5 * h],
		[Math.cos(4 * a)/f, Math.sin(4 * a)/f, -0.5 * h],
		[Math.cos(6 * a)/f, Math.sin(6 * a)/f, -0.5 * h],
		[Math.cos(8 * a)/f, Math.sin(8 * a)/f, -0.5 * h],
		[0, 0, 0.5 * h],
	],
	faces: [
		[0, 1, 2, 3, 4],
		[0, 5, 1],
		[1, 5, 2],
		[2, 5, 3],
		[3, 5, 4],
		[4, 5, 0],
	]
}