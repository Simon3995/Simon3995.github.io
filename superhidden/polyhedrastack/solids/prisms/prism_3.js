a = (2/3) * Math.PI;
f = Math.sqrt((-Math.cos(a) + 1)**2+(Math.sin(a))**2);

shapes.prism3 = {
	verts: [
		[1 / f, 0, 0.5],
		[Math.cos(a) / f, Math.sin(a) / f, 0.5],
		[Math.cos(2 * a) / f, Math.sin(2 * a) / f, 0.5],
		[1 / f, 0, -0.5],
		[Math.cos(a) / f, Math.sin(a) / f, -0.5],
		[Math.cos(2 * a) / f, Math.sin(2 * a) / f, -0.5],
	],
	faces: [
		[1, 0, 2],
		[3, 4, 5],
		[0, 1, 4, 3],
		[1, 2, 5, 4],
		[2, 0, 3, 5],
	]
}