const update = function() {
    ctx.fillStyle = bg_color;
    ctx.fillRect(0, 0, c.width, c.height);
    fill_chunks(bg_chunk, false);

    // draw borders
    if (innerborders) {
        // fill colors, then draw borders on top
        fill_chunks(Map.chunks);
        if (borders) draw_links("#000000", 0.75);
    } else {
        // draw borders, then fill colors on top
        if (borders) draw_links("#000000", 0.75);
        fill_chunks(Map.chunks);
    }
    
    // borders between chunks
    if (borders) draw_chunk_outlines(Map.chunks, "black", 1.5);

    // draw tooltip after delay
    if (tooltip && ++ttt == 10) {
        draw_tooltip();
    }

    requestAnimationFrame(update);
}

load_file("netherlands_provinces");
update_ui();

requestAnimationFrame(update);

