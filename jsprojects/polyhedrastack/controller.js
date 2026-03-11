import * as THREE from 'three';
import { Settings, Scene } from './main.js';
import { 
	get_face, 
	set_branch_material, 
	set_shape_material, 
	check_rough_array_equality, 
	face_to_triangles, 
	download_file,
	import_file
} from './util.js';
import { 
	snap_shape, 
	remove_shape, 
	center_shape, 
	create_shape, 
	calculate_rotation 
} from './model.js';
import Shapes from './shapes.js';
import Themes from './themes.js';
import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';

let highlighted = undefined;
let mouse_moved = false;

// add eventlisteners to clicktype buttons
for (let i=0; i<5; i++)
	document.getElementById("clickType" + i).onclick = () => { set_click_type(i) }

// changes current function of the mouse
export const set_click_type = function (type) {
	Settings.click_type = type;
	
	// reset z-index of all clickType buttons
	for (let i=0; i<5; i++) {
		document.getElementById("clickType" + i).style.zIndex = "0";
	}

	// give last-clicked button higher z-index
	document.getElementById("clickType" + type).style.zIndex = "1";
}

// resets the view to the default state
export const reset_view = function() {
	Scene.camera.target = new THREE.Vector3(0, 0, 0);
	Scene.controls.reset();
	Scene.camera.position.z = 20;
}

document.getElementById("resetViewButton").onclick = reset_view;

export const toggle_sidebar = function() {
	document.getElementById("sidebarchevron").style.transform = `translate(-50%, -50%) rotate(${Settings.sidebar_open?180:0}deg)`;
	document.getElementById("sidebarchevron").style.left = Settings.sidebar_open ? "50%" : "55%";
	
	if (Settings.sidebar_open) {
		// close sidebar
		document.getElementById("sidebar").style.right = `-550px`;
		document.getElementById("main").style.width = `calc(100% - 0px)`;
	} else {
		// open sidebar
		document.getElementById("sidebar").style.right = `0px`;
		document.getElementById("main").style.width = `calc(100% - 550px)`;
	}

	Settings.sidebar_open = !Settings.sidebar_open;
	resize_canvas();
}

document.getElementById("sidebarToggle").onclick = toggle_sidebar;

export const resize_canvas = function() {
	const bbox = document.getElementById("main").getBoundingClientRect();
	Scene.camera.aspect = bbox.width / bbox.height;
	Scene.camera.updateProjectionMatrix();
	Scene.renderer.setSize(bbox.width, bbox.height);
	Scene.controls.handleResize();
}

window.addEventListener("resize", resize_canvas, false);

const navbuttons = document.getElementsByClassName("navbutton");
const tabcontents = document.getElementsByClassName("tabcontent");

// attach eventlisteners to sidebar tabs
for (let i = 0; i < navbuttons.length; i++) {
	navbuttons[i].onclick = function(e) {
		switch_tab(e, navbuttons[i].innerHTML);
	}
}

export const switch_tab = function(e, tab) {
	// reset all class names, give 'active' class to clicked button only
	for (let i = 0; i < navbuttons.length; i++) {
		navbuttons[i].className = "navbutton";
	}
	e.currentTarget.className += " active";

	for (let i = 0; i < tabcontents.length; i++) {
		tabcontents[i].style.display = "none";
	}
	document.getElementById(e.currentTarget.innerHTML).style.display = "block";
}

const highlight = function(face) {
	// remove existing highlights
	if (highlighted) {
		set_branch_material(highlighted.object.parent, Scene.theme.default);
		highlighted.object.material = Scene.theme.default;
	}

	// apply new highlights
	if (face) {
		const branch_highlight = Scene.theme.action[Settings.click_type].branch_highlight;
		const shape_highlight = Scene.theme.action[Settings.click_type].shape_highlight;
		const face_highlight = Scene.theme.action[Settings.click_type].face_highlight;
		const shape = face.parent;

		if (branch_highlight) set_branch_material(shape, branch_highlight);
		if (shape_highlight) set_shape_material(shape, shape_highlight);
		if (face_highlight) face.material = face_highlight;
	}
}

// select the face at cursor coordinates
// also highlight face, shape and branch where necessary
export const select_face = function() {
	// find face to highlight
	Scene.raycaster.setFromCamera(Scene.pointer, Scene.camera);
	const intersects = Scene.raycaster.intersectObjects(Scene.scene.children);
	const meshes = intersects.filter(x => x.object.type === "Mesh");
	const closest = meshes[0];

	// highlight before applying
	highlight(closest?.object);
	highlighted = closest;
}

window.addEventListener("mousemove", function(evt) {
	const bbox = document.getElementById("main").getBoundingClientRect();
	Scene.pointer.x = ((evt.pageX - document.body.scrollLeft) / bbox.width) * 2 - 1;
	Scene.pointer.y = - ((evt.pageY - document.body.scrollTop) / bbox.height) * 2 + 1;

	mouse_moved = true;
}, false);

window.addEventListener("mousedown", function() {
	mouse_moved = false;
}, false);

document.body.onload = () => {
	Scene.renderer.domElement.addEventListener("mouseup", function(evt) {
		if (mouse_moved || !highlighted) return;

		// add new shape
		if (Settings.click_type === 0) {
			let face_index = 0; // TODO: allow selection of face
			const shape_name = Scene.add_shape;
			let shape = create_shape(shape_name);

			// check validity
			const parent_face_name = highlighted.object.geometry.userData.face_type;
			const child_face_name = shape.children[face_index].geometry.userData.face_type;
			if (parent_face_name !== child_face_name) {
				console.warn(`Cannot place ${child_face_name} on ${parent_face_name}!`);
				// If the types of faces don't match, then we just find one that does
				face_index = shape.children.findIndex(face => parent_face_name === face.geometry.userData.face_type);
				if (face_index === -1) return;
				console.warn(`Placing ${shape.children[face_index].geometry.userData.face_type} instead.`);
			}

			const parent_face = highlighted.object.geometry.userData.vertices;
			const child_face = get_face(Shapes[shape_name], face_index);

			// for some operations we need to identify the face that connects the branch to its parent
			for (const face of shape.children) {
				if (check_rough_array_equality(face.geometry.attributes.position.array, face_to_triangles(child_face))) {
					shape.userData.parent_face = face.uuid;
				}
			}

			shape = snap_shape(shape, parent_face, child_face);
			highlighted.object.parent.add(shape);
		}

		// remove shape
		if (Settings.click_type === 1) {
			remove_shape(highlighted);
		}

		// focus on object
		if (Settings.click_type === 3) {
			center_shape(highlighted);
		}

		// rotate branch
		if (Settings.click_type === 4) {
			const right_mouse_button = evt.button === 2;
			calculate_rotation(highlighted.object, !right_mouse_button);
		}

	}, false);
}

window.addEventListener("keydown", function(evt) {
	switch (evt.key.toLowerCase()) {
		case "a":
			set_click_type(0);  // Add
			break;
		case "d":
			set_click_type(1);  // Delete
			break;
		case "v":
			set_click_type(2);  // View Mode
			break;
		case "f":
			set_click_type(3);  // Focus
			break;
		case "r":
			set_click_type(4);  // Rotate
			break;
	}
}, false);

document.getElementById("downloadOBJ").onclick = function() {
	// Instantiate an exporter
	const exporter = new OBJExporter();
	// Parse the input and generate the OBJ output
	const data = exporter.parse(Scene.scene);
	download_file(data, "model/obj", "polystack_scene.obj");
}

// save as json, so it can be loaded into Polyhedra Stack again
document.getElementById("downloadJSON").onclick = function () {
	const save_recursively = function(top) {
		const tree = {
			"name": top.userData.name ?? "Scene",
			"transformation": top.matrix.elements,
			"children": [... top.children.filter(obj => obj.type === "LineSegments").map(save_recursively)],
		};
		if (top.userData.parent_face)
			tree.parent = top.children.findIndex(child => child.uuid === top.userData.parent_face);
		return tree;
	}
	const json_string = JSON.stringify(save_recursively(Scene.scene.children.find(obj => obj.type === "LineSegments")), 1, 2);
	download_file(json_string, "application/json", "polystack_scene.json");
}

// import tree from JSON
document.getElementById("importJSON").onclick = function () {
	// acquire json object
	import_file("application/json")
		.then(content => {
			// construct tree from json
			const construct_tree = function(top) {
				const shape = create_shape(top.name);
				const transformation = new THREE.Matrix4().fromArray(top.transformation);
				shape.applyMatrix4(transformation);
				shape.matrixAutoUpdate = false;
				if (top.parent !== undefined)
					shape.userData.parent_face = shape.children[top.parent].uuid;
				for (const child of top.children)
					shape.add(construct_tree(child));
				return shape;
			}
			const tree = construct_tree(JSON.parse(content));

			// trash current scene and add new tree
			Scene.scene.children.find(obj => obj.type === "LineSegments").removeFromParent();
			Scene.scene.add(tree);
		});
}
