// main animation loop
const animate = function() {
	// empty debug text
	document.getElementById("main").innerHTML = "";
	// update matrix world
	camera.updateMatrixWorld();
	// move pointlight to camera position
	pointLight.position.set(camera.position.x, camera.position.y, camera.position.z);
	// render scene
	renderer.render(scene, camera);
	// update orbit controls
	controls.update();
	
	// reset all object materials
	for (obj of scene.children) {
		if (obj.type == "Mesh") {
			obj.material.color = new THREE.Color(0xffffff);
		}
	}
	
	// get objects hovered over
	raycaster.setFromCamera(mouse, camera);
	let hit = raycaster.intersectObjects(scene.children);
	for (let obj of hit) {
		if (obj.object.type == "Mesh") {
			// lighter material on hover
			obj.object.material.color = new THREE.Color(0xc4e3ff);
			
			// draw vertex coordinates for debugging
			if (debug) drawDebugText(obj);
			
			// don't repeat if succesful
			break;
		}
	}
	
	window.requestAnimationFrame(animate);
}

setClickType(1);
placeholderSelectionMenu();
animate();
