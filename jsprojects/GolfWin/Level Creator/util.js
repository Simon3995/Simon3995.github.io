function setType(type) {
	clickType = type;
	document.getElementById("info").innerHTML = "Current click type: ";
	document.getElementById("info").innerHTML += type.toUpperCase();
}

function deleteElements() {
	//walls
	for (let i=0; i<field.walls.length; i++) {
		if (distLinePoint(field.walls[i], {x: mouseX, y: mouseY}) <= 10) {
			field.walls.splice(i,1);
			deleteElements();
			break;
		}
	}
	
	//holes
	for (let i=0; i<field.goals.length; i++) {
		if (Math.sqrt((field.goals[i].x-mouseX)**2 + (field.goals[i].y-mouseY)**2) <= 15) {
			field.goals.splice(i,1);
			deleteElements();
			break;
		}
	}
	
	//arcs
	for (let i=0; i<field.arcs.length; i++) {
		if (Math.sqrt((field.arcs[i].x-mouseX)**2 + (field.arcs[i].y-mouseY)**2) <= 20) {
			field.arcs.splice(i,1);
			deleteElements();
			break;
		}
	}
	ctx.globalAlpha = 1;
}

function toggleGrid() {
	grid = !grid;
}

//gridify if grid enabled
function gr(a) {
	if (grid) {
		return Math.round(a/gridSize)*gridSize;
	} else {
		return a;
	}
}

function isHover(e) {
	return (e.parentElement.querySelector(':hover') === e);
}

function updateStats() {
	document.getElementById("wallcount").innerHTML = "Walls: " + field.walls.length;
	document.getElementById("holecount").innerHTML = "Holes: " + field.goals.length;
	document.getElementById("arccount").innerHTML = "Arcs: " + field.arcs.length;
	document.getElementById("gridsize").innerHTML = "Field size: " + c.width + ", " + c.height;
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

function radianAngle(x1, y1, x2, y2) {
	let angle = Math.atan(Math.abs(gr(x1)-x2)/Math.abs(gr(y1)-y2));
	
	//top right quadrant
	if (gr(x1) >= x2 && gr(y1) < y2) {
		return 1.5*Math.PI+angle;
	}
	
	//bottom right quadrant
	if (gr(x1) >= x2 && gr(y1) >= y2) {
		return 0.5*Math.PI-angle;
	}
	
	//bottom left quadrant
	if (gr(x1) < x2 && gr(y1) >= y2) {
		return 0.5*Math.PI+angle;
	}
	
	//top left quadrant
	if (gr(x1) < x2 && gr(y1) < y2) {
		return 1.5*Math.PI-angle;
	}
}