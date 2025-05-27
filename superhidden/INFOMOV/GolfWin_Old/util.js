//this file contains utility functions and variables
var epsilon = 1e-5;
var tau = 2*Math.PI;

//find intersection point between two linesegments, return null if none found
function findIsct(line1, line2) {
	//two special cases for "perfect" lines
		/*special case 1: line is perfectly horizontal*/
	if (line1.y1 == line1.y2) {
		//get y
		let y = line1.y1;
		//get x
		let slope2 = (line2.y2 - line2.y1) / (line2.x2 - line2.x1);
		let start2 = line2.y1 - slope2 * line2.x1;
		let x = (y - start2) / slope2;
		//check if x is in ranges
		if (x < line1.x1 && x < line1.x2)
			return null;
		if (x > line1.x1 && x > line1.x2)
			return null;
		if (x < line2.x1 && x < line2.x2)
			return null;
		if (x > line2.x1 && x > line2.x2)
			return null;
		//return actual intersection
		let intersection = {
			x: x,
			y: y,
			line1: line1,
			line2: line2,
		};
		return intersection;
	} else if (line2.y1 == line2.y2) {
		let intersection = findIsct(line2, line1);
		if (intersection == null)
			return null;
		let temp = intersection.line1;
		intersection.line1 = intersection.line2;
		intersection.line2 = temp;
		return intersection;
	}
		/*special case 1: line is perfectly vertical*/
	if (line1.x1 == line1.x2) {
		//get x
		let x = line1.x1;
		//get y
		let slope2 = (line2.y2 - line2.y1) / (line2.x2 - line2.x1);
		let start2 = line2.y1 - slope2 * line2.x1;
		let y = slope2 * x + start2;
		//check if y is in ranges
		if (y < line1.y1 && y < line1.y2)
			return null;
		if (y > line1.y1 && y > line1.y2)
			return null;
		if (y < line2.y1 && y < line2.y2)
			return null;
		if (y > line2.y1 && y > line2.y2)
			return null;
		//return actual intersection
		let intersection = {
			x: x,
			y: y,
			line1: line1,
			line2: line2,
		};
		return intersection;
	} else if (line2.x1 == line2.x2) {
		let intersection = findIsct(line2, line1);
		if (intersection == null)
			return null;
		let temp = intersection.line1;
		intersection.line1 = intersection.line2;
		intersection.line2 = temp;
		return intersection;
	}
	//find slopes of two lines
	let slope1 = (line1.y2 - line1.y1) / (line1.x2 - line1.x1);
	let slope2 = (line2.y2 - line2.y1) / (line2.x2 - line2.x1);
	//check if parallel
	if (slope1 == slope2) {
		return null;
	}
	//find x = 0 positions of two lines
	let start1 = line1.y1 - slope1 * line1.x1;
	let start2 = line2.y1 - slope2 * line2.x1;
	//find x
	let x = (start2 - start1) / (slope1 - slope2);
	//check for both linesegments if x is in the segment
	if (x < line1.x1 && x < line1.x2)
		return null;
	if (x > line1.x1 && x > line1.x2)
		return null;
	if (x < line2.x1 && x < line2.x2)
		return null;
	if (x > line2.x1 && x > line2.x2)
		return null;
	//intersection found, return coordinates
	let intersection = {
		x: x,
		y: slope1 * x + start1,
		line1: line1,
		line2: line2,
	};
	return intersection;
}

//determines the distance between two points
function dist(x1, y1, x2, y2) {
	return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
}

//determines whether a line segment and a circle intersect
function findGoal(line, circle) {
	var dist = distLinePoint(line, circle);
	if (dist < circle.r)
		return {
			x: circle.x,
			y: circle.y,
			goal: circle,
		};
}

//finds the minimum distance between a line segment and a circle
function distLinePoint(line, point) {
	let l2 = (line.x1 - line.x2)**2 + (line.y1 - line.y2)**2;
	if (l2 == 0) return Math.sqrt((line.x1 - point.x)**2 + (line.y1 - point.y)**2);
	let t = ((point.x - line.x1) * (line.x2 - line.x1) + (point.y - line.y1) * (line.y2 - line.y1)) / l2;
	t = Math.max(0, Math.min(1, t));
	let n = {
		x: line.x1 + t * (line.x2 - line.x1),
		y: line.y1 + t * (line.y2 - line.y1),
	}
	return Math.sqrt((point.x - n.x)**2 + (point.y - n.y)**2);
}