const addShape = function(shape, name, loc) {
	// define wireframe geometry
	let wireframe = new THREE.Geometry();
	
	// define & push vertices to wireframe
	for (let vert of shape.verts) {
		let vertex = new THREE.Vector3(...vert);
		wireframe.vertices.push(vertex);
	}
	
	// define faces
	for (let face of shape.faces) {
		// define face geometry
		let facegeom = new THREE.Geometry();
		
		// define & push vertices to face geometry
		for (let vert of face) {
			let vertex = new THREE.Vector3(...shape.verts[vert]);
			facegeom.vertices.push(vertex);
		}
		
		// fill face geometry
		for (let i=1; i+1 < facegeom.vertices.length; i++) {
			facegeom.faces.push(new THREE.Face3(0, i, i+1));
		}
		
		// compute normals
		facegeom.computeVertexNormals();
		facegeom.computeFaceNormals();
		
		// translate
		facegeom.translate(loc.x, loc.y, loc.z);
		
		// define object
		let object = new THREE.Mesh(facegeom, new THREE.MeshBasicMaterial({
			color: 0xffffff,
			side: THREE.BackSide,
			flatShading: true,
			polygonOffset: true,
			polygonOffsetFactor: 1,
			polygonOffsetUnits: 1,
		}));
		
		// add object to scene
		object.name = name;
		scene.add(object);
		
		// *******************************
		
		// push face to wireframe geometry
		for (let i=1; i+1 < face.length; i++) {
			wireframe.faces.push(new THREE.Face3(face[0],face[i],face[i+1]));
		}
	}
	
	// compute normals
	wireframe.computeVertexNormals();
	wireframe.computeFaceNormals();
	
	// translate
	wireframe.translate(loc.x, loc.y, loc.z);
	
	// define object
	let object = new THREE.LineSegments(new THREE.EdgesGeometry(wireframe, 0.5), new THREE.LineBasicMaterial({
		color: 0x303030,
		linewidth: 1,
	}));
	
	// add object to scene
	object.name = name;
	scene.add(object);
	
	updateMaterials();
}

const removeShape = function(name) {
	// cannot remove root object
	if (name == "shape_0") return;
	
	// collect this branch
	let branchNames = collectBranch(getBranch(name, treeStructure.root));
	
	// remove mesh objects
	for (let i = scene.children.length - 1; i>=0; i--) {
		if (branchNames.includes(scene.children[i].name)) {
			scene.remove(scene.children[i]);
		}
	}
	
	// cut off branch in treeStructure
	cutBranch(name);
	
	// update materials / tree structure view
	updateMaterials();
}

// returns array of all shape names in a branch
const collectBranch = function(branch) {
	let names = [];
	names.push(branch.name);
	if (branch.children) {
		for (child of branch.children) {
			names = names.concat(collectBranch(child));
		}
	}
	return names;
}

// cut off a branch in the tree structure
const cutBranch = function(name, branch = treeStructure.root) {
	if (branch.children) {
		for (let i=0; i<branch.children.length; i++) {
			if (branch.children[i].name == name) {
				branch.children.splice(i,1);
				return;
			} else {
				cutBranch(name, branch.children[i]);
			}
		}
	}
}

const snapObject = function(hostObj) {
	// keep track of center for tree structure
	let center = new THREE.Vector3(0,0,0);
	// number of vertices of snapping faces
	let vertAmt = hostObj.object.geometry.vertices.length;
	// get three host vertices
	let hostVerts = hostObj.object.geometry.vertices.slice(0,3);
	// get three new vertices
	let newVerts = getSnapVerts(shapes[add_shape], vertAmt);
	// get new shape name
	let shapeName = "shape_" + num();
	// create new shape
	addShape(shapes[add_shape], shapeName, {x:0, y:0, z:0});
	
	// step one --- translation / first vertex
	let translateX = hostVerts[0].x - newVerts[0].x;
	let translateY = hostVerts[0].y - newVerts[0].y;
	let translateZ = hostVerts[0].z - newVerts[0].z;
	
	translateFull(
		shapeName,
		translateX,
		translateY,
		translateZ
	);
	
	// update newVerts
	for (let i=2; i>=0; i--) {
		newVerts[i].x += translateX;
		newVerts[i].y += translateY;
		newVerts[i].z += translateZ;
	}
	
	// update center
	center.add(new THREE.Vector3(translateX, translateY, translateZ));
	
	// step two --- rotation / second vertex
	let v1 = new THREE.Vector3(
		hostVerts[1].x - hostVerts[0].x,
		hostVerts[1].y - hostVerts[0].y,
		hostVerts[1].z - hostVerts[0].z
	);
	let v2 = new THREE.Vector3(
		newVerts[1].x - newVerts[0].x,
		newVerts[1].y - newVerts[0].y,
		newVerts[1].z - newVerts[0].z
	);
	
	// only do step two if necessary, to avoid NaN errors
	if (!v1.equals(v2)) {
		let cross = new THREE.Vector3().crossVectors(v1, v2);
		// check for null vector (0,0,0)
		if (Math.abs(cross.x) < 1e-8 &&
			Math.abs(cross.y) < 1e-8 &&
			Math.abs(cross.z) < 1e-8) {
				cross = new THREE.Vector3(-(v1.y+v1.z), v1.x, v1.x);
		}
		rotateAroundAxis(shapeName, cross, hostVerts[0], -v1.angleTo(v2));
		
		// update newVerts
		for (let i=2; i>=0; i--) {
			newVerts[i].x -= hostVerts[0].x;
			newVerts[i].y -= hostVerts[0].y;
			newVerts[i].z -= hostVerts[0].z;
			newVerts[i].applyAxisAngle(cross, -v1.angleTo(v2));
			newVerts[i].x += hostVerts[0].x;
			newVerts[i].y += hostVerts[0].y;
			newVerts[i].z += hostVerts[0].z;
		}
		
		// update center
		center.sub(hostVerts[0]);
		center.applyAxisAngle(cross, -v1.angleTo(v2));
		center.add(hostVerts[0]);
	}
	
	applyModifications(shapeName);
	
	// step three --- rotation / third vertex
	let correctEdge = v1.clone();
	
	v1 = new THREE.Vector3(
		hostVerts[2].x - hostVerts[1].x,
		hostVerts[2].y - hostVerts[1].y,
		hostVerts[2].z - hostVerts[1].z
	).projectOnPlane(correctEdge);
	v2 = new THREE.Vector3(
		newVerts[2].x - newVerts[1].x,
		newVerts[2].y - newVerts[1].y,
		newVerts[2].z - newVerts[1].z
	).projectOnPlane(correctEdge);
	rotateAroundAxis(shapeName, correctEdge, hostVerts[0], -v1.angleTo(v2));
	
	// update newVerts
	for (let i=2; i>=0; i--) {
		newVerts[i].x -= hostVerts[0].x;
		newVerts[i].y -= hostVerts[0].y;
		newVerts[i].z -= hostVerts[0].z;
		newVerts[i].applyAxisAngle(correctEdge, -v1.angleTo(v2));
		newVerts[i].x += hostVerts[0].x;
		newVerts[i].y += hostVerts[0].y;
		newVerts[i].z += hostVerts[0].z;
	}
	
	// update center
	center.sub(hostVerts[0]);
	center.applyAxisAngle(correctEdge, -v1.angleTo(v2));
	center.add(hostVerts[0]);
	
	// make sure rotation was in right direction
	if (newVerts[2].distanceTo(hostVerts[2]) > 1e-7) {
		rotateAroundAxis(shapeName, correctEdge, hostVerts[0], v1.angleTo(v2) * 2);
		
		// update center
		center.sub(hostVerts[0]);
		center.applyAxisAngle(correctEdge, v1.angleTo(v2) * 2);
		center.add(hostVerts[0]);
	}
	/* Note: Margin of error 1e-7 was chosen because of a snapping error
	 * with tetrahedra. Tighter margins would cause the rotation to fail.
	 */
	
	applyModifications(shapeName);
	
	// host point for future rotation (average of all vertices of host face)
	let hostVerts_all = hostObj.object.geometry.vertices;
	let hostPoint = new THREE.Vector3();
	for (vert of hostVerts_all) {
		hostPoint.add(vert);
	}
	hostPoint.multiplyScalar(1 / hostVerts_all.length);
	
	// add to tree structure
	let branch = getBranch(hostObj.object.name, treeStructure.root);
	console.log("Get Face Normal From:");
	console.log(hostObj);
	branch.children.push({
		name: shapeName,
		loc: [center.x, center.y, center.z],
		children: [],
		rotatePoint: hostPoint,
		rotateAxis: hostObj.face.normal,
		rotateAngle: 2*Math.PI / hostVerts_all.length,
	});
	if (treeView) resetTreeStructure(true);
}

const getSnapVerts = function(shape, vertAmt) {
	let snapVerts = [];
	for (let face of shape.faces) {
		if (face.length == vertAmt) {
			for (let i=2; i>=0; i--) {
				snapVerts[2-i] = new THREE.Vector3(...shape.verts[face[i]]);
			}
			return snapVerts;
		}
	}
}

const translateFull = function(shapeid, x, y, z) {
	let translation_matrix = new THREE.Matrix4();
	translation_matrix.set(
		1, 0, 0, x,
		0, 1, 0, y,
		0, 0, 1, z,
		0, 0, 0, 1
	);
	
	for (let obj of scene.children) {
		if (obj.name == shapeid) {
			obj.applyMatrix4(translation_matrix);
		}
	}
}

const rotateAroundAxis = function(shapeid, ax, fp, th) {
	// normalize axis
	ax = ax.normalize();
	
	for (let obj of scene.children) {
		if (obj.name == shapeid) {
			// subtract fixed point
			obj.position.sub(new THREE.Vector3(fp.x, fp.y, fp.z));
			// apply rotation to object's position
			obj.position.applyAxisAngle(new THREE.Vector3(ax.x, ax.y, ax.z), th);
			// add fixed point back
			obj.position.add(new THREE.Vector3(fp.x, fp.y, fp.z));
			// apply rotation to object
			obj.rotateOnWorldAxis(ax, th);
		}
	}
}

const applyModifications = function(shapeid) {
	for (let obj of scene.children) {
		if (obj.name == shapeid) {
			obj.updateMatrix();
			obj.geometry.applyMatrix4(obj.matrix);
			obj.position.set(0,0,0);
			obj.rotation.set(0,0,0);
			obj.scale.set(1,1,1);
			obj.updateMatrix();
		}
	}
}

const centerObject = function(name) {
	// get location of clicked object
	let loc = [...getBranch(name).loc];
	
	// move all shapes to put clicked shape in center
	for (let obj of scene.children) {
		obj.position.x -= loc[0];
		obj.position.y -= loc[1];
		obj.position.z -= loc[2];
	}
	
	// update treeStructure
	for (let obj of scene.children) {
		// easy way to get all shape IDs in the scene
		if (obj.type == "LineSegments" && obj.name.includes("shape")) {
			for (let j=0; j<3; j++) {
				getBranch(obj.name).loc[j] -= loc[j];
			}
		}
	}
}

const rotateBranch = function(name) {
	// get all objects to be rotated
	let obj_names = collectBranch(getBranch(name, treeStructure.root));
	
	// get rotation axis and fixed point
	let branch = getBranch(name);
	
	// for all objects, do rotation
	for (let name of obj_names) {
		rotateAroundAxis(name, branch.rotateAxis, branch.rotatePoint, branch.rotateAngle);
	}
	
	// update treeStructure
	for (objname of obj_names) {
		let treebranch = getBranch(objname);
		console.log(treebranch);
		// update location after rotation
		let loc = new THREE.Vector3(...treebranch.loc);
		loc.sub(branch.rotatePoint);
		loc.applyAxisAngle(branch.rotateAxis.normalize(), branch.rotateAngle);
		loc.add(branch.rotatePoint);
		treebranch.loc = [loc.x, loc.y, loc.z];
		
		// update rotatePoint after rotation
		let rp = new THREE.Vector3().copy(treebranch.rotatePoint);
		rp.sub(branch.rotatePoint);
		rp.applyAxisAngle(branch.rotateAxis.normalize(), branch.rotateAngle);
		rp.add(branch.rotatePoint);
		treebranch.rotatePoint = rp;
		
		// update rotateAxis after rotation
		let ra = new THREE.Vector3().copy(treebranch.rotateAxis);
		ra.applyAxisAngle(branch.rotateAxis.normalize(), branch.rotateAngle);
		treebranch.rotateAxis = ra;
	}
	
	updateMaterials();
	
	/*
		TODO: rotation nearly unfucked!
		adding new shape to rotated shape is still fucked
	*/
}