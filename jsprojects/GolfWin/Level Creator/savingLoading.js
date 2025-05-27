function saveLevel() {
	//save field size
	field.canvas.width = c.width;
	field.canvas.height = c.height;
	
	//add canvas edges as walls
	field.walls.push({
		x1:0,
		y1:0,
		x2:c.width,
		y2:0,
	});
	field.walls.push({
		x1:0,
		y1:0,
		x2:0,
		y2:c.height,
	});
	field.walls.push({
		x1:0,
		y1:c.height,
		x2:c.width,
		y2:c.height,
	});
	field.walls.push({
		x1:c.width,
		y1:0,
		x2:c.width,
		y2:c.height,
	});
	
	let fileName = "level.json";	
	var a = document.createElement("a");
	var file = new Blob([JSON.stringify(field, null, 4)], {type: 'json'});
	a.href = URL.createObjectURL(file);
	a.download = fileName;
	a.click();
}

function loadLevel() {
	input.click();
}

input.onchange = e => { 
	// getting a hold of the file reference
	var file = e.target.files[0]; 

	// setting up the reader
	var reader = new FileReader();
	reader.readAsText(file,'UTF-8');

	// here we tell the reader what to do when it's done reading...
	reader.onload = readerEvent => {
		var content = readerEvent.target.result; // this is the content!
		console.log(content);
		field = JSON.parse(content);
		c.width = field.canvas.width;
		c.height = field.canvas.height;
	}
}