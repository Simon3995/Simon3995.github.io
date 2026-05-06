import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { set_click_type, select_face, resize_canvas } from './controller.js';
import { create_shape, execute_rotation } from './model.js';
import { generate_polyhedra_list } from './sidebar.js';
import { set_fs_shape, animate_fs } from './face_selector.js';
import { reload_theme, update_theme_inputs } from './themes.js';
import { create_debug_point } from './debug.js';

export const Settings = {
	/** Click Types
	 * 0: Add Shape
	 * 1: Delete Shape
	 * 2: Rotate View
	 * 3: Center View on Object
	 * 4: Rotate Branch
	 */
	click_type: 0,
	tree_view: false,
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
	add_shape: "Bilunabirotunda",
	controls: {},
}

// queue object for animations
export const Animations = [];

// lighting
let pointLight = new THREE.PointLight(0xffffff, 3, 0, 0);
Scene.scene.add(pointLight);
let ambientLight = new THREE.AmbientLight(0xffffff, 0.025);
Scene.scene.add(ambientLight);

Scene.camera.position.z = 20;  // move camera away from origin
document.getElementById("main").appendChild(Scene.renderer.domElement);  // add renderer to document
Scene.renderer.domElement.id = "threecanvas";
Scene.renderer.setClearColor(0x000000, 0);

// controls
let controls = new TrackballControls(Scene.camera, Scene.renderer.domElement);
controls.rotateSpeed = 2;
controls.zoomSpeed = 0.3;
controls.panSpeed = 0.1;
controls.dynamicDampingFactor = 0.1;
Scene.controls = controls;

resize_canvas();

// main animation loop
const animate = function() {
	const camera = Scene.camera;
	pointLight.position.set(camera.position.x, camera.position.y, camera.position.z);
	camera.updateMatrixWorld();

	select_face();

	Scene.renderer.render(Scene.scene, camera);
	Scene.controls.update();

	// process step in the animation queue
	const step = Animations.shift();
	if (step && step.type === "rotation") {
		execute_rotation(step.parent_face, step.angle);
	}
	
	// animate the face selector
	animate_fs();

	requestAnimationFrame(animate);
}

set_click_type(0);
const init_shape = create_shape(Scene.add_shape);
Scene.scene.add(init_shape);
generate_polyhedra_list();
set_fs_shape(Scene.add_shape);
reload_theme(Scene.scene);
update_theme_inputs();
animate();
