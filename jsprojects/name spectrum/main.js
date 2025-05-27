// init
let s = document.getElementById("spectrum");
let d = document.getElementById("colorDisplay");
let stx = s.getContext("2d");
let dtx = d.getContext("2d");
let colorIndex = 0;
let colorMap = {};
let pr = 5; // point radius
let gr = 15; // grid size
let ls = 20; // label size
let show_borders = true;
let show_labels = true;

let input = document.createElement('input');
input.type = "file";

// create array of all 36,000 colors
let currentColor = pickNewColor();
displayCurrentColor();

// add color name to color map
function inputColor() {
	let inputbox = document.getElementById("textInput");
	// get color name
	let name = inputbox.value.toLowerCase();
	
	// create new group if needed
	if (!colorMap[name]) {
		colorMap[name] = [];
	}
	// add to group
	colorMap[name].push(currentColor);
	
	//clear input
	inputbox.value = "";
	
	// display new color
	currentColor = pickNewColor();
	displayCurrentColor();
	drawFullSpectrum();
	updateList();
}

// pick a new color as isolated as possible
function pickNewColor() {
	if (Object.keys(colorMap).length == 0) {
		let hue = (Math.random()*360).toFixed(2);
		let li = (Math.random()*100).toFixed(2);
		return {
			fillStyle: `hsl(${hue}, 100%, ${li}%)`,
			h: hue,
			l: li,
		}
	}
	
	let candidates = [];
	
	// generate random colors
	for (let i=0; i<100; i++) {
		candidates.push({
			h: (Math.random()*360).toFixed(2),
			l: (Math.random()*100).toFixed(2),
		});
	}
	
	// find most isolated
	let best = null;
	let bestDist = -Infinity;
	for (let candidate of candidates) {
		let smallestDist = Infinity;
		for (let color in colorMap) {
			for (let point of colorMap[color]) {
				let dist = Math.sqrt((point.h-candidate.h)**2 + (point.l-candidate.l)**2);
				if (dist < smallestDist) smallestDist = dist;
			}
		}
		if (smallestDist > bestDist) {
			best = candidate;
			bestDist = smallestDist;
		}
	}
	
	// return isolated color
	return {
		fillStyle: `hsl(${best.h}, 100%, ${best.l}%)`,
		h: best.h,
		l: best.l,
	};
}

// Fisher-Yates shuffle
function shuffle(arr) {
	let m = arr.length, t, i;
	while (m) {
		i = Math.floor(Math.random() * m--);
		t = arr[m];
		arr[m] = arr[i];
		arr[i] = t;
	}
}

// displays the color at current index
function displayCurrentColor() {
	dtx.fillStyle = currentColor.fillStyle;
	dtx.fillRect(0, 0, d.width, d.height);
}

function drawFullSpectrum() {
	stx.fillStyle = "#696969";
	stx.fillRect(0, 0, s.width, s.height);
	for (let color in colorMap) {
		for (let point of colorMap[color]) {
			stx.fillStyle = point.fillStyle;
			let x = point.h / 360 * s.width;
			let y = point.l / 100 * s.height;
			stx.fillRect(x-pr, y-pr, 2*pr, 2*pr);
		}
	}
	if (show_borders) squareMarch();
	if (show_labels) annotate();
}

function annotate() {
	let w = 4*ls;
	let h = ls;
	
	for (let color in colorMap) {
		let nodes = colorMap[color];
		
		// detect split
		let left = false;
		let center = false;
		let right = false;
		let center_radius = 30;
		let split = false;
		for (let node of nodes) {
			let h = parseFloat(node.h);
			if (h < 180-center_radius) {
				left = true;
			} else if (h > 180+center_radius) {
				right = true;
			} else {
				center = true;
			}
		}
		if ((left && right) && !center) {
			split = true;
		}

		// determine average hue and lightness
		if (split) {
			let left_h = 0;
			let rght_h = 0;
			let left_l = 0;
			let rght_l = 0;
			for (let node of nodes) {
				if (parseFloat(node.h) < 180) {
					left_h += parseFloat(node.h);
					left_l += parseFloat(node.l);
				} else {
					rght_h += parseFloat(node.h);
					rght_l += parseFloat(node.l);
				}
			}
			let x1 = s.width * (left_h/nodes.filter(node=>parseFloat(node.h)<180).length)/360;
			let y1 = s.height * (left_l/nodes.filter(node=>parseFloat(node.h)<180).length)/100;
			let x2 = s.width * (rght_h/nodes.filter(node=>parseFloat(node.h)>180).length)/360;
			let y2 = s.height * (rght_l/nodes.filter(node=>parseFloat(node.h)>180).length)/100;

			// clamp
			if (x1 > s.width-w/2) x1 = s.width-w/2;
			if (x1 < w/2) x1 = w/2;
			if (y1 > s.height) y1 = s.height;
			if (y1 < h/2) y1 = h/2;
			if (x2 > s.width-w/2) x2 = s.width-w/2;
			if (x2 < w/2) x2 = w/2;
			if (y2 > s.height) y2 = s.height;
			if (y2 < h/2) y2 = h/2;

			// draw labels
			drawLabel(x1, y1, w, h, color);
			drawLabel(x2, y2, w, h, color);
		} else {
			let avg_h = 0;
			let avg_l = 0;
			for (let node of nodes) {
				avg_h += parseFloat(node.h);
				avg_l += parseFloat(node.l);
			}
			let x = s.width * (avg_h/nodes.length)/360;
			let y = s.height * (avg_l/nodes.length)/100;

			// clamp
			if (x > s.width-w/2) x = s.width-w/2;
			if (x < w/2) x = w/2;
			if (y > s.height) y = s.height;
			if (y < h/2) y = h/2;

			// draw label
			drawLabel(x, y, w, h, color);
		}
	}
}

function drawLabel(x, y, w, h, color) {
	stx.fillStyle = "#00000066";
	stx.fillRect(x - w/2, y - h/2, w, h);
	stx.fillStyle = "white";
	stx.font = `${0.7*ls}px Arial`;
	stx.textAlign = "center";
	stx.fillText(color.toUpperCase(), x, y+6, w);
}

function drawPartSpectrum(highlighted) {
	stx.clearRect(0, 0, s.width, s.height);
	for (let color in colorMap) {
		if (highlighted == color) {
			for (let point of colorMap[color]) {
				stx.fillStyle = point.fillStyle;
				let x = point.h / 360 * s.width;
				let y = point.l / 100 * s.height;
				stx.fillRect(x-pr, y-pr, 2*pr, 2*pr);
			}
		}
	}
	squareMarch();
}

function updateList() {
	let div = document.getElementById("colorList");
	div.innerHTML = "";
	let html = "";
	let colorMapArr = [];
	
	for (let color in colorMap) {
		colorMapArr.push({
			name: color,
			map: colorMap[color],
		});
	}
	
	colorMapArr.sort((a,b) => b.map.length - a.map.length);
	
	for (let color of colorMapArr) {
		html += `<p class="color" onclick="drawPartSpectrum('${color.name}')">`;
		html += `${color.name}: ${color.map.length} points.`;
		html += `</p>`;
		
		div.innerHTML = html;
	}
}

// right click on node to delete
s.oncontextmenu = e => {
	let x = e.clientX - s.offsetLeft + window.scrollX;
	let y = e.clientY - s.offsetTop + window.scrollY;
	
	for (color in colorMap) {
		for (point of colorMap[color]) {
			let px = point.h / 360 * s.width;
			let py = point.l / 100 * s.height;
			
			if (Math.abs(px - x) <= pr && Math.abs(py - y) <= pr) {
				let idx = colorMap[color].indexOf(point); // index of point to delete
				colorMap[color].splice(idx,1);
				if (colorMap[color].length < 1) delete colorMap[color];
			}
		}
	}
	
	updateList();
	drawFullSpectrum();
}

function saveMap() {
	let fileName = "colormap.json";
	let a = document.createElement("a");
	let file = new Blob([JSON.stringify(colorMap)], {type: 'json'});
	a.href = URL.createObjectURL(file);
	a.download = fileName;
	a.click();
}

function loadMap() {
	input.click();
}

input.onchange = e => { 
	// getting a hold of the file reference
	let file = e.target.files[0]; 
	
	// setting up the reader
	let reader = new FileReader();
	reader.readAsText(file,'UTF-8');
	
	reader.onload = readerEvent => {
		let content = readerEvent.target.result;
		colorMap = JSON.parse(content);
		
		updateList();
		drawFullSpectrum();
	}
}

// adapted version of marching squares algorithm
function squareMarch() {
	stx.strokeStyle = "white";
	stx.lineWidth = 2;
	
	stx.beginPath();
	for (let i=0; i < s.width; i += gr) {
		for (let j=0; j < s.height; j += gr) {
			// four corners
			let a = closestGroup(i, j);
			let b = closestGroup(i + gr, j);
			let c = closestGroup(i, j + gr);
			let d = closestGroup(i + gr, j + gr);
			
			// case 1: all equal
			if (a == b && b == c && c == d) continue;
			
			// case 2: outlier top left
			if (a != b && b == c && c == d) {
				stx.moveTo(i + gr/2, j);
				stx.lineTo(i, j + gr/2);
				continue;
			}
			
			// case 3: outlier top right
			if (a != b && a == c && c == d) {
				stx.moveTo(i + gr/2, j);
				stx.lineTo(i + gr, j + gr/2);
				continue;
			}
			
			// case 4: outlier bottom left
			if (a == b && a != c && b == d) {
				stx.moveTo(i, j + gr/2);
				stx.lineTo(i + gr / 2, j + gr);
				continue;
			}
			
			// case 5: outlier bottom right
			if (a == b && b == c && c != d) {
				stx.moveTo(i + gr/2, j + gr);
				stx.lineTo(i + gr, j + gr/2);
				continue;
			}
			
			// case 6: horizontal divide
			if (a == b && c == d && a != c) {
				stx.moveTo(i, j + gr/2);
				stx.lineTo(i + gr, j + gr/2);
				continue;
			}
			
			// case 7: vertical divide
			if (a != b && a == c && b == d) {
				stx.moveTo(i + gr/2, j);
				stx.lineTo(i + gr/2, j + gr);
				continue;
			}
			
			// case 8: diagonal equals
			if (a != b && a == d && b == c) {
				stx.moveTo(i, j + gr/2);
				stx.lineTo(i + gr, j + gr/2);
				stx.moveTo(i + gr/2, j);
				stx.lineTo(i + gr/2, j + gr);
				continue;
			}
			
			// case 9: T-split down
			if (a == b && a != c && a != d && c != d) {
				stx.moveTo(i, j + gr/2);
				stx.lineTo(i + gr, j + gr/2);
				stx.moveTo(i + gr/2, j + gr/2);
				stx.lineTo(i + gr/2, j + gr);
				continue;
			}
			
			// case 10: T-split left
			if (b == d && a != b && c != b && a != c) {
				stx.moveTo(i + gr/2, j);
				stx.lineTo(i + gr/2, j + gr);
				stx.moveTo(i + gr/2, j + gr/2);
				stx.lineTo(i, j + gr/2);
				continue;
			}
			
			// case 9: T-split up
			if (c == d && c != a && c != b && a != b) {
				stx.moveTo(i, j + gr/2);
				stx.lineTo(i + gr, j + gr/2);
				stx.moveTo(i + gr/2, j + gr/2);
				stx.lineTo(i + gr/2, j);
				continue;
			}
			
			// case 10: T-split right
			if (a == c && a != b && a != d && b != d) {
				stx.moveTo(i + gr/2, j);
				stx.lineTo(i + gr/2, j + gr);
				stx.moveTo(i + gr/2, j + gr/2);
				stx.lineTo(i + gr, j + gr/2);
				continue;
			}
			
			// case 11: top left and bottom right equal
			if (a == d && a != b && a != c && b != c) {
				stx.moveTo(i, j + gr/2);
				stx.lineTo(i + gr / 2, j + gr);
				stx.moveTo(i + gr/2, j);
				stx.lineTo(i + gr, j + gr/2);
				continue;
			}
			
			// case 12: top right and bottom left equal
			if (b == c && a != b && b != d && a != d) {
				stx.moveTo(i + gr/2, j);
				stx.lineTo(i, j + gr/2);
				stx.moveTo(i + gr/2, j + gr);
				stx.lineTo(i + gr, j + gr/2);
				continue;
			}
			
			// case 13: all different
			stx.moveTo(i + gr/2, j);
			stx.lineTo(i + gr/2, j + gr);
			stx.moveTo(i, j + gr/2);
			stx.lineTo(i + gr, j + gr/2);
		}
	}
	stx.stroke();
}

// find closest color group to given coordinates on canvas
function closestGroup(x, y) {
	let closestDist = Infinity;
	let closestGroup = null;
	let h = (x / s.width) * 360;
	let l = (y / s.height) * 100;
	
	if (Object.keys(colorMap).length == 0) return null;
	
	for (color in colorMap) {
		for (point of colorMap[color]) {
			let dist = Math.sqrt((point.h - h)**2 + (point.l - l)**2);
			if (dist < closestDist) {
				closestDist = dist;
				closestGroup = color;
			}
		}
	}
	
	return closestGroup;
}

document.getElementById("nodesize").oninput = e => {
	pr = parseInt(e.target.value) / 2;
	e.target.nextElementSibling.value = e.target.value;
	updateList();
	drawFullSpectrum();
}

document.getElementById("gridsize").oninput = e => {
	gr = parseInt(e.target.value);
	e.target.nextElementSibling.value = e.target.value;
	updateList();
	drawFullSpectrum();
}

document.getElementById("labelsize").oninput = e => {
	ls = parseInt(e.target.value);
	e.target.nextElementSibling.value = e.target.value;
	updateList();
	drawFullSpectrum();
}

document.getElementById("toggleborders").oninput = e => {
	show_borders = e.target.checked;
	updateList();
	drawFullSpectrum();
}

document.getElementById("togglelabels").oninput = e => {
	show_labels = e.target.checked;
	updateList();
	drawFullSpectrum();
}