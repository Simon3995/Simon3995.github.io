// scene object
let scene = new THREE.Scene();

// camera object
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.z = 7.5;

// scene renderer object
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x181818, 1);
document.body.appendChild(renderer.domElement);

// lighting
let pointLight = new THREE.PointLight(0xffffff, 1.0, 100);
scene.add(pointLight);
let ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// controls
let controls = new THREE.TrackballControls(camera, renderer.domElement);

// create first shape
let shapeName = "shape_"+num();
addShape(shapes[init_shape], shapeName, loc={x:0,y:0,z:0});

// set tree structure root to this object
treeStructure.root = {
	name: shapeName,
	loc: [0,0,0],
	children: [],
}