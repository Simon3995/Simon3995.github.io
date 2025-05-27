function update() {
    renderer.render(scene, camera);

    if (!camera.quaternion.equals(targetQuaternion)) {
        maxRotSpeed += 0.0015;
        let angle = camera.quaternion.angleTo(targetQuaternion);
        camera.quaternion.rotateTowards(targetQuaternion, Math.min(maxRotSpeed, angle/15));
    }

    requestAnimationFrame(update);
}

update();