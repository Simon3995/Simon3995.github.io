class Wall {
	
	constructor(x1, y1, x2, y2) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}

	//returns the normal at a given point
	getNormal(point) {
		let wallNormal = {
			x: 1,
			y: -1 / ((this.y2 - this.y1) / (this.x2 - this.x1) + epsilon),
		};
		wallNormal = {
			x: wallNormal.x / Math.sqrt(wallNormal.x**2 + wallNormal.y**2),
			y: wallNormal.y / Math.sqrt(wallNormal.x**2 + wallNormal.y**2),
		};
		return wallNormal;
	}
	
	//draws the wall
	draw() {
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.moveTo(this.x1, this.y1);
		ctx.lineTo(this.x2, this.y2);
		ctx.stroke();
	}
}