a = Math.PI / 5;
f = Math.sqrt((1 - Math.cos(2*a))**2+(Math.sin(2*a))**2);
h = 0.85065080835204;

shapes.antiprism5 = {
	verts: [
		[1/f, 0, h/2],
		[Math.cos(2 * a)/f, Math.sin(2 * a)/f, h/2],
		[Math.cos(4 * a)/f, Math.sin(4 * a)/f, h/2],
		[Math.cos(6 * a)/f, Math.sin(6 * a)/f, h/2],
		[Math.cos(8 * a)/f, Math.sin(8 * a)/f, h/2],
		[Math.cos(1 * a)/f, Math.sin(1 * a)/f, -h/2],
		[Math.cos(3 * a)/f, Math.sin(3 * a)/f, -h/2],
		[Math.cos(5 * a)/f, Math.sin(5 * a)/f, -h/2],
		[Math.cos(7 * a)/f, Math.sin(7 * a)/f, -h/2],
		[Math.cos(9 * a)/f, Math.sin(9 * a)/f, -h/2],
	],
	faces: [
		[0,4,3,2,1],
		[5,6,7,8,9],
		[0,1,5],
		[1,6,5],
		[1,2,6],
		[2,7,6],
		[2,3,7],
		[3,8,7],
		[3,4,8],
		[4,9,8],
		[4,0,9],
		[0,5,9],
	],
};