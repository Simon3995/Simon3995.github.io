let input = document.getElementById("textinput");
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
ctx.textAlign = "center";
ctx.font = "15px Arial";

c.onclick = e => {
    list.push({
        x: e.clientX - c.offsetLeft,
        y: e.clientY - c.offsetTop,
        text: input.value,
    });

    while (list.length > 20) list.shift();

    socket.send(JSON.stringify(list));
}

function drawList() {
    for (let item of list) {
        ctx.fillStyle = "dodgerblue";
        ctx.fillRect(item.x-5, item.y-5, 10, 10);
        ctx.fillStyle = "black";
        ctx.fillText(item.text, item.x, item.y-10);
    }
}

function update() {
    ctx.clearRect(0, 0, c.width, c.height);
    drawList();
    requestAnimationFrame(update);
}
update();