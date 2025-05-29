class Wall {
	
	constructor(x1, y1, x2, y2) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}
	
	//finds intersection point with line segment
	findIsct(line, wall) {
		//two special cases for "perfect" lines
			/*special case 1: line is perfectly horizontal*/
		if (line.y1 == line.y2) {
			//get y
			let y = line.y1;
			//get x
			let slope2 = (wall.y2 - wall.y1) / (wall.x2 - wall.x1);
			let start2 = wall.y1 - slope2 * wall.x1;
			let x = (y - start2) / slope2;
			//check if x is in ranges
			if (x < line.x1 && x < line.x2)
				return null;
			if (x > line.x1 && x > line.x2)
				return null;
			if (x < wall.x1 && x < wall.x2)
				return null;
			if (x > wall.x1 && x > wall.x2)
				return null;
			//return actual intersection
			let intersection = {
				x: x,
				y: y,
				line: line,
				wall: wall,
			};
			return intersection;
		} else if (wall.y1 == wall.y2) {
			let intersection = findIsct(wall, line);
			if (intersection == null)
				return null;
			let temp = intersection.line;
			intersection.line = intersection.wall;
			intersection.wall = temp;
			return intersection;
		}
			/*special case 1: line is perfectly vertical*/
		if (line.x1 == line.x2) {
			//get x
			let x = line.x1;
			//get y
			let slope2 = (wall.y2 - wall.y1) / (wall.x2 - wall.x1);
			let start2 = wall.y1 - slope2 * wall.x1;
			let y = slope2 * x + start2;
			//check if y is in ranges
			if (y < line.y1 && y < line.y2)
				return null;
			if (y > line.y1 && y > line.y2)
				return null;
			if (y < wall.y1 && y < wall.y2)
				return null;
			if (y > wall.y1 && y > wall.y2)
				return null;
			//return actual intersection
			let intersection = {
				x: x,
				y: y,
				line: line,
				wall: wall,
			};
			return intersection;
		} else if (wall.x1 == wall.x2) {
			let intersection = findIsct(wall, line);
			if (intersection == null)
				return null;
			let temp = intersection.line;
			intersection.line = intersection.wall;
			intersection.wall = temp;
			return intersection;
		}
		//find slopes of two lines
		let slope1 = (line.y2 - line.y1) / (line.x2 - line.x1);
		let slope2 = (wall.y2 - wall.y1) / (wall.x2 - wall.x1);
		//check if parallel
		if (slope1 == slope2) {
			return null;
		}
		//find x = 0 positions of two lines
		let start1 = line.y1 - slope1 * line.x1;
		let start2 = wall.y1 - slope2 * wall.x1;
		//find x
		let x = (start2 - start1) / (slope1 - slope2);
		//check for both linesegments if x is in the segment
		if (x < line.x1 && x < line.x2)
			return null;
		if (x > line.x1 && x > line.x2)
			return null;
		if (x < wall.x1 && x < wall.x2)
			return null;
		if (x > wall.x1 && x > wall.x2)
			return null;
		//intersection found, return coordinates
		let intersection = {
			x: x,
			y: slope1 * x + start1,
			line: line,
			wall: wall,
		};
		return intersection;
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

class Arc {
	
	constructor(x1, y1, x2, y2) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}
	
	//finds intersection point with line segment
	findIntersection(line, wall) {
		//TODO
		return null
	}
	
	//returns the normal at a given point
	getNormal(point) {
		//TODO
		return null;
	}
}