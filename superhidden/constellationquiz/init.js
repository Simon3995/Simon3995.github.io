// load and parse star data
const star_data = parseCSV(load_file("brightstars.csv"));
const name_data = parseCSV(load_file("names.csv"));

// THREE.js initialization
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create stars
let positions = [];
let sizes = [];

for (let star of star_data) {
    const index = star[0]
    const hr_catalog = star[1];
    const constellation = star[2];
    const longitude = star[3];
    const latitude = star[4];
    const app_mag = star[5];
    const conv_mag = Math.min(1, 1.5 * 10**(-0.2*app_mag));
    const scale = 150;
    
    positions.push(...ll2xyz(longitude, latitude, scale));
    sizes.push( conv_mag * 20 );
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
geometry.setAttribute( 'size', new THREE.Float32BufferAttribute(sizes, 1) );

const material = new THREE.ShaderMaterial({
    uniforms: {
        color: { value: new THREE.Color( 0xffffff ) },
        pointTexture: { value: new THREE.TextureLoader().load( 'circle.png' ) }
    },
    vertexShader: document.getElementById("vertexshader").textContent,
    fragmentShader: document.getElementById("fragmentshader").textContent,

    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true
});

const points = new THREE.Points( geometry, material );
scene.add( points );

// camera rotation
const spherical = new THREE.Spherical();
const rotationMatrix = new THREE.Matrix4();
const targetQuaternion = new THREE.Quaternion();
let maxRotSpeed = 0;

const targetGeometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
const targetMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const target = new THREE.Mesh( targetGeometry, targetMaterial );
target.visible = false;
scene.add(target);