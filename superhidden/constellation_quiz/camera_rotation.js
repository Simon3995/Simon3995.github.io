function set_random_target() {
    spherical.theta = Math.random() * Math.PI * 2;
    spherical.phi = Math.acos( 2 * Math.random() - 1);
    spherical.radius = 10;

    target.position.setFromSpherical( spherical );

    const rand_vect = new THREE.Vector3(Math.random()-.5, Math.random()-.5, Math.random()-.5);
    rotationMatrix.lookAt( target.position, camera.position, rand_vect );
    targetQuaternion.setFromRotationMatrix( rotationMatrix );

    maxRotSpeed = 0;
}