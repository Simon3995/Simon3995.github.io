importScripts('ball.js', 'field.js', 'obstacle.js', 'util.js');

function find_hit(x, y, data, ballCopy) {
    ballCopy.x = data.ball.x;
    ballCopy.y = data.ball.y;
    ballCopy.velX = data.strength * (ballCopy.x - x) / (1 - 1 / data.friction);
    ballCopy.velY = data.strength * (ballCopy.y - y) / (1 - 1 / data.friction);
    if (!ballCopy.moveFrame(data.field, false)) return false;

    let tx = x;
    let ty = y;
    let bx = data.ball.x;
    let by = data.ball.y;
    while (Math.abs(tx - bx) > data.stepSize || Math.abs(ty - by) > data.stepSize) {
        let mx = (tx + bx) / 2;
        let my = (ty + by) / 2;
        ballCopy.x = data.ball.x;
        ballCopy.y = data.ball.y;
        ballCopy.velX = data.strength * (ballCopy.x - mx) / (1 - 1 / data.friction);
        ballCopy.velY = data.strength * (ballCopy.y - my) / (1 - 1 / data.friction);
        if (ballCopy.moveFrame(data.field, false)) {
            tx = mx;
            ty = my;
        } else {
            bx = mx;
            by = my;
        }
    }
    return { x: (tx + bx) / 2, y: (ty + by) / 2 };
}

onmessage = data => {
    data = data.data;
    data.field.walls = data.field.walls.map(wall => new Wall(wall.x1, wall.y1, wall.x2, wall.y2));
    const foundMoves = [];
    const ballCopy = new Ball(data.ball.x, data.ball.y);
    // inefficient loop probably but we just loop over all edge pixels and if it's not within range we skip it.
    for (let i = 0; i < data.width; i += data.stepSize) {
        const x = i + Math.random() * data.stepSize;
        if (angle(x - data.width / 2, Math.sin(data.start), - data.height / 2, Math.cos(data.start)) < data.angle) {
            const result = find_hit(x, 0, data, ballCopy);
            if (result) {
                foundMoves.push({ x: result.x, y: result.y });
            }
        }
        if (angle(x - data.width / 2, Math.sin(data.start), data.height / 2, Math.cos(data.start)) < data.angle) {
            const result = find_hit(x, data.height, data, ballCopy);
            if (result) {
                foundMoves.push({ x: result.x, y: result.y });
            }
        }
    }

    for (let j = 0; j < data.width; j += data.stepSize) {
        const y = j + Math.random() * data.stepSize;
        if (angle(- data.width / 2, Math.sin(data.start), y - data.height / 2, Math.cos(data.start)) < data.angle) {
            const result = find_hit(0, y, data, ballCopy);
            if (result) {
                foundMoves.push({ x: result.x, y: result.y });
            }
        }
        if (angle(data.width / 2, Math.sin(data.start), y - data.height / 2, Math.cos(data.start)) < data.angle) {
            const result = find_hit(data.width, y, data, ballCopy);
            if (result) {
                foundMoves.push({ x: result.x, y: result.y });
            }
        }
    }

    postMessage(foundMoves);
}