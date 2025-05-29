// warning this file is a clusterfuck just don't touch it it works ok

// mouse listeners
window.addEventListener("mouseup", function(e) {
	setCoords(e);
	
	if ((mouseX < scalar || mouseY < 0 || mouseX > c.width || mouseY > c.height) && erasing) {
		mousedown = false;
		erasing = false;
		return;
	}
	
	if (mousedown) {
		limitGridCoords();
		melody[gridX][gridY] = 1;
	}
	
	mousedown = false;
	erasing = false;
}, false);

window.addEventListener("mousedown", function(e) {
	if (mouseX < scalar) return;
	if (mouseY < 0) return;
	if (mouseX > c.width) return;
	if (mouseY > c.height) return;
	
	if (e.button == 0) {
		mousedown = true;
		updateNote(gridY, true);
	}
	
	if (e.button == 2) {
		melody[gridX][gridY] = 0;
		erasing = true;
	}
}, false);

window.addEventListener("mousemove", function(e) {
	setCoords(e);
	
	if (mousedown) {
		limitGridCoords();
	}
	
	if (erasing) {
		if (mouseX < scalar) return;
		if (mouseY < 0) return;
		if (mouseX > c.width) return;
		if (mouseY > c.height) return;
		melody[gridX][gridY] = 0;
	}
	
	updateNote(gridY, false);
}, false);

window.addEventListener("contextmenu", function (e) {
	e.preventDefault();
}, false);

window.onresize = function() {
	fitCanvas();
}

// buttons
function saveMelody() {
	let melodyJSON = JSON.stringify(melody);
	//hash function I copied from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
	hashCode = s => s.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
	download(melodyJSON, hashCode(melodyJSON), "application/json");
}

function setCoords(e) {
	mouseX = e.clientX - c.offsetLeft;
	mouseY = e.clientY - c.offsetTop;
	gridX = Math.floor((mouseX - scalar)/((c.width-scalar)/loopLength));
	gridY = Math.floor(piano.length - mouseY/(c.height/piano.length));
}

function limitGridCoords() {
	if (gridX < 0) gridX = 0;
	if (gridX >= loopLength) gridX = loopLength-1;
	if (gridY < 0) gridY = 0;
	if (gridY >= piano.length) gridY = piano.length-1;
}