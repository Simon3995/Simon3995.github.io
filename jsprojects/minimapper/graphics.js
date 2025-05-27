// update the canvas resolution to match its size
const update_canvas_res = function() {
    c.width = c.getBoundingClientRect().width;
    c.height = c.getBoundingClientRect().height;
}

// draw all links with given color and line width
const draw_links = function(color, width) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    for (let id in Map.links) {
        let link = Map.links[id];
        let n1 = Map.nodes[link.n1];
        let n2 = Map.nodes[link.n2];
        ctx.beginPath();
        ctx.moveTo(r2v(n1).x, r2v(n1).y);
        ctx.lineTo(r2v(n2).x, r2v(n2).y);
        ctx.stroke();
    }
}

// fill chunks with solid color
const fill_chunks = function(chunks, outline=true) {
    for (color in chunks) {
        ctx.fillStyle = color;
        ctx.beginPath();
        for (loop of chunks[color]) {
            ctx.moveTo(r2v(loop[0]).x, r2v(loop[0]).y);
            for (let point of loop) ctx.lineTo(r2v(point).x, r2v(point).y);
        }
        ctx.fill('evenodd');

        // draw the outline in the same color as the fill
        // this prevents strange gaps when turning off borders
        if (outline) draw_chunk_outlines([chunks[color]], color, .5);
    }
}

// draw chunk outlines with given line width
const draw_chunk_outlines = function(chunks, color, width) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    for (color in chunks) {
        ctx.beginPath();
        for (loop of chunks[color]) {
            ctx.moveTo(r2v(loop[0]).x, r2v(loop[0]).y);
            for (let point of loop) ctx.lineTo(r2v(point).x, r2v(point).y);
        }
        ctx.closePath();
        ctx.stroke();
    }
}