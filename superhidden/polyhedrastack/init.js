// mathematical constants
const PHI = (1+Math.sqrt(5))/2;
const SQRT2 = Math.SQRT2;

// util
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2(-1000, -1000);
let debug = false;
let shading = false;
let treeView = false;
let shapenum = 0;
let shapes = {};
let treeStructure = {};
let clickType;

let init_shape = "cube";
let add_shape = "cube";

const num = function() {
	return shapenum++;
}

/* Multiplies all entries in an array of vectors by some scalar.
 * mask is an optional parameter that indicates which indices of
 * the vectors should be scaled. If left empty it will scale the entire vector.
 */
const scaleVectorList = function(matrix, factor, mask) {
	if (mask === undefined) {
		mask = [0, 1, 2];
	}
	for (let vectorID in matrix) {
		for (let coordinate of mask) {
			matrix[vectorID][coordinate] *= factor;
		}
	}
	return matrix;
}

// Get branch with given name in given branch
const getBranch = function(name, branch = treeStructure.root) {
	if (branch.name == name) {
		return branch;
	}
	if (branch.children) {
		for (let child of branch.children) {
			if (getBranch(name, child)) return getBranch(name, child);
		}
	}
	
	return null;
}

// removes all points and lines in the scene
// Note: loops backwards because scene.children.length
// changes once items start getting removed
const resetTreeStructure = function(visible) {
	for (let i=scene.children.length-1; i>=0; i--) {
		if (scene.children[i].name == "treeStructure") {
			scene.remove(scene.children[i]);
		}
	}
	
	if (visible) drawTreeStructure(treeStructure.root);
}

// visualizes the tree structure within the model using points and lines
const drawTreeStructure = function(tree) {
	// create point for current object
	let node = new THREE.Geometry();
	node.vertices.push(new THREE.Vector3(...tree.loc));
	let material = new THREE.PointsMaterial({
		size: 10,
		sizeAttenuation: false,
		color: (tree.name == "shape_0") ? "#ffa02b" : "#00b7ff",
	});
	let object = new THREE.Points(node, material);
	object.name = "treeStructure";
	scene.add(object);
	
	if (tree.rotatePoint) {
		let rotatePoint = new THREE.Geometry();
		rotatePoint.vertices.push(tree.rotatePoint);
		let rotatePointMaterial = new THREE.PointsMaterial({
			size: 10,
			sizeAttenuation: false,
			color: "#00ff00",
		});
		let rp_obj = new THREE.Points(rotatePoint, rotatePointMaterial);
		rp_obj.name = "treeStructure";
		scene.add(rp_obj);
		
		let rotateAxis = new THREE.Geometry();
		rotateAxis.vertices.push(tree.rotatePoint);
		rotateAxis.vertices.push(new THREE.Vector3().addVectors(tree.rotatePoint, tree.rotateAxis));
		let rotateAxisMaterial = new THREE.LineBasicMaterial({
			color: "#ff0000",
			linewidth: 1,
		});
		let ra_obj = new THREE.LineSegments(rotateAxis, rotateAxisMaterial);
		ra_obj.name = "treeStructure";
		scene.add(ra_obj);
	}
	
	for (let child of tree.children) {
		// draw connecting line to next node
		let line = new THREE.Geometry();
		line.vertices.push(
			new THREE.Vector3(...tree.loc),
			new THREE.Vector3(...child.loc)
		);
		material = new THREE.LineBasicMaterial({
			color: "#ffffff",
			linewidth: 1,
		});
		object = new THREE.LineSegments(line, material);
		object.name = "treeStructure";
		scene.add(object);
		
		// repeat process for child object
		drawTreeStructure(child);
	}
}