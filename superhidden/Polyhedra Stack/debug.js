const drawDebugText = function(obj) {
	for (let vertex of obj.object.geometry.vertices) {
		// create html debug text
		let debugText = document.createElement("div");
		
		// style
		debugText.style.position = "absolute";
		debugText.style.width = 100;
		debugText.style.height = 100;
		debugText.style.backgroundColor = "#ffffffbb";
		debugText.style.border = "7px solid #ffffff00";
		debugText.style.borderRadius = "5px";
		debugText.style.fontFamily = "monospace";
		
		// content
		debugText.innerHTML  = "x " + parseFloat(vertex.x.toFixed(5)) + "<br>";
		debugText.innerHTML += "y " + parseFloat(vertex.y.toFixed(5)) + "<br>";
		debugText.innerHTML += "z " + parseFloat(vertex.z.toFixed(5));
		
		// calculate (x,y) location on screen
		let pos2D = toXYCoords(vertex);
		
		// set location and append
		debugText.style.top = pos2D.y + 'px';
		debugText.style.left = pos2D.x + 'px';
		document.getElementById("main").appendChild(debugText);
	}
}

// convert from 3D location to 2D screen space
const toXYCoords = function(pos) {
	let vector = pos.clone().project(camera);
	vector.x =  (vector.x + 1)/2 * window.innerWidth;
	vector.y = -(vector.y - 1)/2 * window.innerHeight;
	return vector;
}

// will change in future version
const placeholderSelectionMenu = function() {
	let selectionMenu = document.createElement("div");
	selectionMenu.style.color = "#666666";
	selectionMenu.style.font = "15px monospace";
	selectionMenu.style.textAlign = "right";
	selectionMenu.style.position = "absolute";
	selectionMenu.style.lineHeight = "0px";
	selectionMenu.style.top = "10px";
	selectionMenu.style.right = "20px";
	for (shape in shapes) {
		selectionMenu.innerHTML += `<p id="select_`+shape+`" onclick="setAddShape('`+shape+`')">`+shape+`</p>`;
	}
	document.body.appendChild(selectionMenu);
}

const setAddShape = function(shape) {
	add_shape = shape;
	
	for (sh in shapes) {
		document.getElementById("select_"+sh).style.color = "#666666";
	}
	
	document.getElementById("select_"+shape).style.color = "#3bff65";
}