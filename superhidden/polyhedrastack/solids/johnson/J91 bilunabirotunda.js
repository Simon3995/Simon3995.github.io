// J91 Bilunabirotunda

shapes.bilo = {
	verts: scaleVectorList([
		[1, PHI, 1],
		[1, PHI, -1],
		[-1, PHI, 1],
		[-1, PHI, -1],
		[1, -PHI, 1],
		[1, -PHI, -1],
		[-1, -PHI, 1],
		[-1, -PHI, -1],
		[(PHI+1), 1, 0],
		[-(PHI+1), 1, 0],
		[(PHI+1), -1, 0],
		[-(PHI+1), -1, 0],
		[0, 0, PHI],
		[0, 0, -PHI],
	], 1/2),
	faces: [
		[0,2,3,1],
		[4,5,7,6],
		[0,12,2],
		[4,6,12],
		[1,3,13],
		[5,13,7],
		[0,1,8],
		[2,9,3],
		[4,10,5],
		[6,7,11],
		[0,8,10,4,12],
		[2,12,6,11,9],
		[1,13,5,10,8],
		[3,9,11,7,13],
	]
}