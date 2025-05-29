// THREE.js setup
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1e15);
camera.position.x = -1e12;
camera.position.y = 5e11;
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x222222, 1);
document.body.appendChild(renderer.domElement);
let controls = new THREE.OrbitControls(camera, renderer.domElement);

// global variables
let Bodies = [];
let G = 6.674e-11;  // gravitational constant
let paused = false;
let focus = 0;