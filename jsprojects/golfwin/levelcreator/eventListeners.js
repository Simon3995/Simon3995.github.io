window.addEventListener("mousemove", function(evt) {
	mouseX = evt.clientX - c.offsetLeft;
	mouseY = evt.clientY - c.offsetTop;
	updateStats();
});

window.addEventListener("mousedown", function(evt) {
	if (clickType == "wall") {
		tempx1 = gr(mouseX);
		tempy1 = gr(mouseY);
	}
	
	if (clickType == "arc") {
		temparc.x = gr(mouseX);
		temparc.y = gr(mouseY);
	}
	
	if (clickType == "delete") {
		deleteElements();
	}
	
	if (evt.clientX >= c.offsetLeft &&
		evt.clientY >= c.offsetTop &&
		evt.clientX <= c.offsetLeft+c.width &&
		evt.clientY <= c.offsetTop +c.height ||
		clickType == "size") {
			let hover = false;
			if (isHover(document.getElementById("ball"))) hover = true;
			if (isHover(document.getElementById("wall"))) hover = true;
			if (isHover(document.getElementById("hole"))) hover = true;
			if (isHover(document.getElementById("size"))) hover = true;
			if (isHover(document.getElementById("grid"))) hover = true;
			if (isHover(document.getElementById("save"))) hover = true;
			if (isHover(document.getElementById("load"))) hover = true;
			if (isHover(document.getElementById("arc"))) hover = true;
			if (isHover(document.getElementById("delete"))) hover = true;
			if (!hover) mousedown = true;
	}
	updateStats();
});

window.addEventListener("mouseup", function(evt) {
	if (mousedown && clickType == "wall") {
		field.walls.push({
			x1: tempx1,
			y1: tempy1,
			x2: gr(mouseX),
			y2: gr(mouseY),
		});
	}
	
	if (mousedown && clickType == "hole") {
		field.goals.push({
			x: gr(mouseX),
			y: gr(mouseY),
		})
	}
	
	if (mousedown && clickType == "arc") {
		setType("angle");
		temparc.r = Math.sqrt((gr(mouseX)-temparc.x)**2+(gr(mouseY)-temparc.y)**2);
		tempX = mouseX;
		tempY = mouseY;
		temparc.sAngle = radianAngle(mouseX, mouseY, temparc.x, temparc.y);
	} else if (mousedown && clickType == "angle") {
		setType("arc");
		temparc.eAngle = radianAngle(mouseX, mouseY, temparc.x, temparc.y);
		if (temparc.r > 0 && temparc.sAngle != temparc.eAngle) {
			field.arcs.push({
				x: temparc.x,
				y: temparc.y,
				r: temparc.r,
				sAngle: temparc.sAngle,
				eAngle: temparc.eAngle,
			});
		}
	}
	
	mousedown = false;
	updateStats();
});