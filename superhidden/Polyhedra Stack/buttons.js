// switch cursor type
const setClickType = function(type) {
	clickType = type;
	
	// reset z-index of all clickType buttons
	for (let i=1; i<=5; i++) {
		document.getElementById("clickType" + i).style.zIndex = "0";
	}
	// give last-clicked button higher z-index
	document.getElementById("clickType" + type).style.zIndex = "1";
}

// toggle the coordinate view
const toggleDebug = function() {
	debug = !debug;
	
	if (debug) {
		document.getElementById("debugToggleButton").style.backgroundColor = "#eff7f6";
	} else {
		document.getElementById("debugToggleButton").style.backgroundColor = "#556161";
	}
}

// toggle shading
const toggleShading = function() {
	shading = !shading;
	updateMaterials();
	
	if (shading) {
		document.getElementById("shadingToggleButton").style.backgroundColor = "#eff7f6";
	} else {
		document.getElementById("shadingToggleButton").style.backgroundColor = "#556161";
	}
}

// toggle tree structure view
const toggleTree = function() {
	treeView = !treeView;
	updateMaterials();
	
	if (treeView) {
		document.getElementById("treeToggleButton").style.backgroundColor = "#eff7f6";
	} else {
		document.getElementById("treeToggleButton").style.backgroundColor = "#556161";
	}
}

// reset the camera to its default state
const resetView = function() {
	centerObject("shape_0");
	controls.reset();
	controls.stopMoving();
}

// update materials of all objects to flat or phong shaded
const updateMaterials = function() {
	if (shading) {
		for (let obj of scene.children) {
			if (obj.type == "Mesh") {
				obj.material = new THREE.MeshPhongMaterial({
					color: 0xffffff,
					side: THREE.BackSide,
					flatShading: true,
					polygonOffset: true,
					polygonOffsetFactor: 1,
					polygonOffsetUnits: 1,
				});
			}
		}
	} else {
		for (let obj of scene.children) {
			if (obj.type == "Mesh") {
				obj.material = new THREE.MeshBasicMaterial({
					color: 0xffffff,
					side: THREE.BackSide,
					flatShading: true,
					polygonOffset: true,
					polygonOffsetFactor: 1,
					polygonOffsetUnits: 1,
				});
			}
		}
	}
	
	if (treeView) {
		for (let obj of scene.children) {
			if (obj.type == "Mesh") {
				obj.material.visible = false;
			}
			if (obj.type == "LineSegments" && obj.name != "treeStructure") {
				obj.material.color = new THREE.Color(0x444444);
			}
		}
	} else {
		for (let obj of scene.children) {
			if (obj.type == "Mesh") {
				obj.material.visible = true;
			}
			if (obj.type == "LineSegments" && obj.name != "treeStructure") {
				obj.material.color = new THREE.Color(0x222222);
			}
		}
	}
	
	resetTreeStructure(treeView);
}
