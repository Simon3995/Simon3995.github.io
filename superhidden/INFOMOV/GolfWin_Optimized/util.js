//this file contains utility functions and variables
var epsilon = 1e-5;
var tau = 2*Math.PI;

//find intersection point between two linesegments, return null if none found
function findIsct(line, wall) {
	if (wall.x1 === wall.x2) [wall, line] = [line, wall];
	
	//find slope and x=0 point of theoretical wall
	const slope2 = (wall.y2 - wall.y1) / (wall.x2 - wall.x1);
	const start2 = wall.y1 - slope2 * wall.x1;

	// special case: line is perfectly vertical
	if (line.x1 === line.x2) {
		const y = slope2 * line.x1 + start2;
		//check if y is in ranges
		if ((y < line.y1) === (y < line.y2) || (y < wall.y1) === (y < wall.y2)) return null;
		return {
			x: line.x1, 
			y
		};
	}

	// find slope and x=0 point of theoretical line
	const slope1 = (line.y2 - line.y1) / (line.x2 - line.x1);
	const start1 = line.y1 - slope1 * line.x1;

	// normal intersection
	const x = (start2 - start1) / (slope1 - slope2);
	
	//check for both linesegments if x is in the segment
	if ((x < line.x1) === (x < line.x2) || (x < wall.x1) === (x < wall.x2)) return null;
	return {
		x: x,
		y: slope1 * x + start1,
	};
}

//determines the distance between two points
function dist_2(x1, y1, x2, y2) {
	let xdist = x2 - x1;
	let ydist = y2 - y1;
	return xdist * xdist + ydist * ydist;
}

//determines whether a line segment and a circle intersect
function findGoal(line, circle) {
	return distLinePoint(line, circle) < circle.r;
	/* if (dist < circle.r * circle.r)
		return {
			x: circle.x,
			y: circle.y,
			goal: circle,
		};
	return null; */
}

//finds the minimum distance between a line segment and a circle
function distLinePoint(line, point) {
	let l2 = (line.x1 - line.x2)**2 + (line.y1 - line.y2)**2;
	if (l2 === 0) return Math.sqrt((line.x1 - point.x)**2 + (line.y1 - point.y)**2);
	let t = ((point.x - line.x1) * (line.x2 - line.x1) + (point.y - line.y1) * (line.y2 - line.y1)) / l2;
	t = Math.max(0, Math.min(1, t));
	let n = {
		x: line.x1 + t * (line.x2 - line.x1),
		y: line.y1 + t * (line.y2 - line.y1),
	}
	return Math.sqrt((point.x - n.x)**2 + (point.y - n.y)**2);
}

//finds the square of the minimum distance between a line segment and a circle
function distLinePoint_2(line, point) {
	let l2 = (line.x1 - line.x2)**2 + (line.y1 - line.y2)**2;
	if (l2 === 0) return Math.sqrt((line.x1 - point.x)**2 + (line.y1 - point.y)**2);
	let t = ((point.x - line.x1) * (line.x2 - line.x1) + (point.y - line.y1) * (line.y2 - line.y1)) / l2;
	t = Math.max(0, Math.min(1, t));
	let n = {
		x: line.x1 + t * (line.x2 - line.x1),
		y: line.y1 + t * (line.y2 - line.y1),
	}
	return (point.x - n.x)**2 + (point.y - n.y)**2;
}