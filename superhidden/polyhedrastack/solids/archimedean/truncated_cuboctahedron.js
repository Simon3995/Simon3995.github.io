a = Math.sqrt(2);

shapes.truncated_cuboctahedron = {
	name: "Truncated Cuboctahedron",
	verts: [
		[0.5, 0.5*(1+a), 0.5*(1+2*a)],
		[0.5, 0.5*(1+a), -0.5*(1+2*a)],
		[0.5, -0.5*(1+a), 0.5*(1+2*a)],
		[0.5, -0.5*(1+a), -0.5*(1+2*a)],
		[-0.5, 0.5*(1+a), 0.5*(1+2*a)],
		[-0.5, 0.5*(1+a), -0.5*(1+2*a)],
		[-0.5, -0.5*(1+a), 0.5*(1+2*a)],
		[-0.5, -0.5*(1+a), -0.5*(1+2*a)],
		[0.5, 0.5*(1+2*a), 0.5*(1+a)],
		[0.5, 0.5*(1+2*a), -0.5*(1+a)],
		[0.5, -0.5*(1+2*a), 0.5*(1+a)],
		[0.5, -0.5*(1+2*a), -0.5*(1+a)],
		[-0.5, 0.5*(1+2*a), 0.5*(1+a)],
		[-0.5, 0.5*(1+2*a), -0.5*(1+a)],
		[-0.5, -0.5*(1+2*a), 0.5*(1+a)],
		[-0.5, -0.5*(1+2*a), -0.5*(1+a)],
		[0.5*(1+a), 0.5, 0.5*(1+2*a)],
		[0.5*(1+a), 0.5, -0.5*(1+2*a)],
		[0.5*(1+a), -0.5, 0.5*(1+2*a)],
		[0.5*(1+a), -0.5, -0.5*(1+2*a)],
		[-0.5*(1+a), 0.5, 0.5*(1+2*a)],
		[-0.5*(1+a), 0.5, -0.5*(1+2*a)],
		[-0.5*(1+a), -0.5, 0.5*(1+2*a)],
		[-0.5*(1+a), -0.5, -0.5*(1+2*a)],
		[0.5*(1+2*a), 0.5, 0.5*(1+a)],
		[0.5*(1+2*a), 0.5, -0.5*(1+a)],
		[0.5*(1+2*a), -0.5, 0.5*(1+a)],
		[0.5*(1+2*a), -0.5, -0.5*(1+a)],
		[-0.5*(1+2*a), 0.5, 0.5*(1+a)],
		[-0.5*(1+2*a), 0.5, -0.5*(1+a)],
		[-0.5*(1+2*a), -0.5, 0.5*(1+a)],
		[-0.5*(1+2*a), -0.5, -0.5*(1+a)],
		[0.5*(1+a), 0.5*(1+2*a), 0.5],
		[0.5*(1+a), 0.5*(1+2*a), -0.5],
		[0.5*(1+a), -0.5*(1+2*a), 0.5],
		[0.5*(1+a), -0.5*(1+2*a), -0.5],
		[-0.5*(1+a), 0.5*(1+2*a), 0.5],
		[-0.5*(1+a), 0.5*(1+2*a), -0.5],
		[-0.5*(1+a), -0.5*(1+2*a), 0.5],
		[-0.5*(1+a), -0.5*(1+2*a), -0.5],
		[0.5*(1+2*a), 0.5*(1+a), 0.5],
		[0.5*(1+2*a), 0.5*(1+a), -0.5],
		[0.5*(1+2*a), -0.5*(1+a), 0.5],
		[0.5*(1+2*a), -0.5*(1+a), -0.5],
		[-0.5*(1+2*a), 0.5*(1+a), 0.5],
		[-0.5*(1+2*a), 0.5*(1+a), -0.5],
		[-0.5*(1+2*a), -0.5*(1+a), 0.5],
		[-0.5*(1+2*a), -0.5*(1+a), -0.5],
	],
	faces: [
		[4, 0, 16, 18, 2, 6, 22, 20],
		[14, 10, 34, 35, 11, 15, 39, 38],
		[26, 24, 40, 41, 25, 27, 43, 42],
		[8, 12, 36, 37, 13, 9, 33, 32],
		[28, 30, 46, 47, 31, 29, 45, 44],
		[7, 3, 19, 17, 1, 5, 21, 23],
		[22, 6, 14, 38, 46, 30],
		[2, 18, 26, 42, 34, 10],
		[16, 0, 8, 32, 40, 24],
		[4, 20, 28, 44, 36, 12],
		[47, 39, 15, 7, 23, 31],
		[35, 43, 27, 19, 3, 11],
		[41, 33, 9, 1, 17, 25],
		[37, 45, 29, 21, 5, 13],
		[20, 22, 30, 28],
		[6, 2, 10, 14],
		[18, 16, 24, 26],
		[0, 4, 12, 8],
		[36, 44, 45, 37],
		[46, 38, 39, 47],
		[34, 42, 43, 35],
		[40, 32, 33, 41],
		[15, 11, 3, 7],
		[27, 25, 17, 19],
		[9, 13, 5, 1],
		[29, 31, 23, 21],
	]
}