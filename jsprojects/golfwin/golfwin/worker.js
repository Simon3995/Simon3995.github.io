importScripts('ball.js', 'field.js', 'obstacle.js', 'util.js');

onmessage = data => {
    data = data.data;
    data.field.walls = data.field.walls.map(wall => new Wall(wall.x1, wall.y1, wall.x2, wall.y2));
    const foundMoves = [];
    for (let i = data.startX; i < data.endX; i += data.stepSize) {
        for (let j = 0; j < data.height; j += data.stepSize) {
            let x = i + Math.round(data.stepSize * Math.random());
            let y = j + Math.round(data.stepSize * Math.random());
            const ballCopy = new Ball(data.ball.x, data.ball.y);
            ballCopy.velX = data.strength * (ballCopy.x - x) / (1 - 1 / data.friction);
            ballCopy.velY = data.strength * (ballCopy.y - y) / (1 - 1 / data.friction);
            let result = ballCopy.moveFrame(data.field, false);
            if (result) {
                foundMoves.push({x, y});
            }
        }
    }
    postMessage(foundMoves);
}