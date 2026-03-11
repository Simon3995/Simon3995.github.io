import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { set_click_type, select_face, resize_canvas } from './controller.js';
import { create_shape, execute_rotation } from './model.js';
import Themes from './themes.js';
import { generate_polyhedra_list } from './sidebar.js';

export const Settings = {
	/** Click Types
	 * 0: Add Shape
	 * 1: Delete Shape
	 * 2: Rotate View
	 * 3: Center View on Object
	 * 4: Rotate Branch
	 * 5: Mirror Branch
	 */
	click_type: 0,
	tree_view: false,
	shading: false,
	debug: false,
	sidebar_open: true,
	rot_animation_length: 25, // how many frames for one rotation animation
}

// three.js setup
export const Scene = {
	raycaster: new THREE.Raycaster(),
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 1000),
	renderer: new THREE.WebGLRenderer({antialias: true}),
	pointer: new THREE.Vector2(),
	add_shape: "Dodecahedron",
	controls: {},
	theme: Themes["Basic Dark"],
}

// queue object for animations
export const Animations = [];

// lighting
let pointLight = new THREE.PointLight(0xffffff, 2, Infinity, 0);
Scene.scene.add(pointLight);
let ambientLight = new THREE.AmbientLight(0xffffff, 0.025);
Scene.scene.add(ambientLight);

/*
// whole bunch of colorful directional lighting
for (let l of [
	[0, 0, 5, 0xff0000],
	[0, 5, 0, 0xffff00],
	[5, 0, 0, 0xff00ff],
	[0, 0, -5, 0x00ff00],
	[0, -5, 0, 0x00ffff],
	[-5, 0, 0, 0x0000ff],
]) {
	let directionalLight = new THREE.DirectionalLight(l[3], 0.2);
	directionalLight.position.set(l[0], l[1], l[2]);
	Scene.scene.add(directionalLight);
}
*/

// controls
let controls = new TrackballControls(Scene.camera, Scene.renderer.domElement);
controls.rotateSpeed = 2;
controls.zoomSpeed = 0.3;
controls.panSpeed = 0.1;
controls.dynamicDampingFactor = 0.1;
Scene.controls = controls;

Scene.camera.position.z = 20;  // move camera away from origin
document.getElementById("main").appendChild(Scene.renderer.domElement);  // add renderer to document
Scene.renderer.domElement.id = "threecanvas";
Scene.scene.background = Scene.theme.background;
resize_canvas();

// main animation loop
const animate = function() {
	const camera = Scene.camera;

	pointLight.position.set(camera.position.x, camera.position.y, camera.position.z);

	// update matrix world
	camera.updateMatrixWorld();
	// render scene
	Scene.renderer.render(Scene.scene, camera);
	// update trackball controls
	Scene.controls.update();
	// highlight hovered over face
	select_face();

	// process step in the animation queue
	const step = Animations.shift();
	if (step && step.type === "rotation") {
		execute_rotation(step.parent_face, step.angle);
	}
	
	requestAnimationFrame(animate);
}

set_click_type(0);
const init_shape = create_shape("Dodecahedron");
Scene.scene.add(init_shape);
console.log("objects in scene:", Scene.scene.children);
generate_polyhedra_list();
animate();