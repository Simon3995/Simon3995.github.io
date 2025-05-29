// resize canvas with window
window.addEventListener("resize", function() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

// update mouse coordinates when mouse moves
window.addEventListener("mousemove", function(evt) {
	mouse.x = (evt.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (evt.clientY / window.innerHeight) * 2 + 1;
}, false);

// find clicked object on click
window.addEventListener("mousedown", function (evt) {
	// get all objects hit by click ray
	raycaster.setFromCamera(mouse, camera);
	let hit = raycaster.intersectObjects(scene.children);
	
	switch (clickType) {
	case 1: // clickType 1: Add Shapes
		for (let obj of hit) {
			if (obj.object.type == "Mesh") {
				snapObject(obj);
				break;
			}
		}
		break;
	case 2: // clickType 2: Delete Branch
		for (let obj of hit) {
			if (obj.object.type == "Mesh") {
				let name = obj.object.name;
				removeShape(name);
				break;
			}
		}
		break;
	case 3: // clickType 3: Move Camera
		break;
	case 4: // clickType 4: Focus on Object
		for (let obj of hit) {
			if (obj.object.type == "Mesh") {
				let name = obj.object.name;
				centerObject(name);
				break;
			}
		}
		break;
	case 5: // clickType 5: Rotate Branch
		for (let obj of hit) {
			if (obj.object.type == "Mesh") {
				let name = obj.object.name;
				rotateBranch(name);
				break;
			}
		}
		break;
	}
}, false);