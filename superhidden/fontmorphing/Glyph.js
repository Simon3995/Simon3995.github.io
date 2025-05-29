class Glyph {
    constructor (font, glyph) {
        this.x = 0;
        this.y = 0;
        this.height = Math.abs(font.ascender - font.descender) / global_scale;
        this.loops = path_to_polygons(get_glyph(font, (glyph == " ") ? "." : glyph).path, this.height);
        this.bbox = this.calculate_bounding_box();
        this.glyph = glyph;

        let center = this.calculate_center();
        this.cx = center.x;
        this.cy = center.y;
        this.stretch_x = 1;
        this.stretch_y = 1;
    }

    // update internal stats of this glyph
    update_stats() {
        this.bbox = this.calculate_bounding_box();
        let center = this.calculate_center();
        this.cx = center.x;
        this.cy = center.y;
    }

    // full drawing stack
    draw_all(alt) {
        this.fill(alt == "a" ? "#0000ff33" : "#ff000033");
        this.draw_outline();
        //this.draw_verts(alt == "a" ? "dodgerblue" : "red");
        this.draw_bbox();
        //this.draw_center();
        //this.draw_stats(alt);
    }

    // calculate the four bbox values for this glyph
    calculate_bounding_box() {
        let xmin = Infinity;
        let xmax = -Infinity;
        let ymin = Infinity;
        let ymax = -Infinity;
        for (let loop of this.loops) {
            for (let vert of loop) {
                if (vert.x > xmax) xmax = vert.x;
                if (vert.x < xmin) xmin = vert.x;
                if (vert.y > ymax) ymax = vert.y;
                if (vert.y < ymin) ymin = vert.y;
            }
        }
        return [xmin, ymin, xmax, ymax];
    }

    // get vertex loops in array form, with offset in x,y added
    get_arr_loops() {
        let arr = structuredClone(this.loops);
        for (const loop of arr) {
            for (let i=0; i<loop.length; i++) {
                // apply offset
                let x = loop[i].x + this.x;
                let y = loop[i].y + this.y;

                // apply stretch around center
                x = this.sx(x);
                y = this.sy(y);

                loop[i] = [x, y];
            }
        }
        //arr.sort((a,b) => shoelace_area(b) - shoelace_area(a));
        return arr;
    }

    // return the height of the bbox of this glyph
    bbox_height() {
        return this.bbox[3] - this.bbox[1];
    }

    // return the width of the bbox of this glyph
    bbox_width() {
        return this.bbox[2] - this.bbox[0];
    }

    // stretch x coordinate around center
    sx(x) {
        const center_x = this.x + this.cx;
        return center_x + (x - center_x) * this.stretch_x;
    }

    // inverse of sx
    isx(x) {
        const center_x = this.x + this.cx;
        return center_x + (x - center_x) / this.stretch_x
    }

    // stretch y coordinate around center
    sy(y) {
        const center_y = this.y + this.cy;
        return center_y + (y - center_y) * this.stretch_y;
    }

    // inverse of sy
    isy(y) {
        const center_y = this.y + this.cy;
        return center_y + (y - center_y) / this.stretch_y;
    }

    // move this glyph so that it's centered at (x,y)
    center(x, y) {
        this.x = x - this.cx;
        this.y = y - this.cy;
        this.update_stats();
    }

    // calculate the center point of this glyph
    calculate_center() {
        let x = (this.bbox[0] + this.bbox[2]) / 2;
        let y = (this.bbox[1] + this.bbox[3]) / 2;
        return { x, y }
    }

    // return the number of vertices in this glyph
    vert_count() {
        return this.loops.flat().length;
    }

    vert_counts() {
        return this.loops.map(loop => loop.length);
    }

    // subdivide this glyph to a specific number of vertices
    subdivide_to(vert_amts) {
        if (vert_amts.length != this.loops.length) {
            console.error("vert_amts length does not match this.loops length");
            return;
        }
        
        // for each loop
        for (let i=0; i<this.loops.length; i++) {
            let target_amt = vert_amts[i];

            // until amt matches
            while (this.loops[i].length < target_amt) {
                let longest_idx = 0;
                let longest_len = 0;

                // find longest edge
                for (let j=0; j<this.loops[i].length; j++) {
                    let next_idx = (j+1) % this.loops[i].length;
                    let edge_len = line_segment_length(
                        this.loops[i][j],
                        this.loops[i][next_idx]
                    );

                    if (edge_len > longest_len) {
                        longest_len = edge_len;
                        longest_idx = j
                    }
                }

                let j = longest_idx;
                let next_idx = (j+1) % this.loops[i].length;
                let new_vert = {
                    x: (this.loops[i][j].x + this.loops[i][next_idx].x) / 2,
                    y: (this.loops[i][j].y + this.loops[i][next_idx].y) / 2
                };

                this.loops[i].splice(next_idx, 0, new_vert);
            }
        }
    }

    // draw the outline of this glyph
    draw_outline() {
        let loops = this.get_arr_loops();
        
        ctx.strokeStyle = "#888888";
        for (let loop of loops) {
            ctx.beginPath();
            ctx.moveTo(loop[0][0], loop[0][1]);
            for (let i=1; i<loop.length; i++) {
                ctx.lineTo(loop[i][0], loop[i][1]);
            }
            ctx.closePath();
            ctx.stroke();
        }
    }

    // draw a rectangle for the bounding box of this glyph
    draw_bbox() {
        ctx.strokeStyle = "lime";
        ctx.strokeRect(
            this.sx(this.bbox[0] + this.x),
            this.sy(this.bbox[1] + this.y),
            this.stretch_x * Math.abs(this.bbox[2] - this.bbox[0]),
            this.stretch_y * Math.abs(this.bbox[3] - this.bbox[1])
        );
    }

    // draw a dot for the origin of this glyph
    draw_origin() {
        const size = 6;
        ctx.fillStyle = "orange";
        ctx.fillRect(
            this.x - size/2,
            this.y - size/2,
            size,
            size
        );
    }

    // draw a dot for the center of this glyph
    draw_center() {
        const size = 6;
        ctx.fillStyle = "blue";
        ctx.fillRect(
            this.x + this.cx - size/2,
            this.y + this.cy - size/2,
            size,
            size
        )
    }

    // draw the vertices of this glyph as small dots
    draw_verts(color) {
        ctx.fillStyle = color;
        const size = 3;
        for (let loop of this.loops) {
            for (let vert of loop) {
                ctx.fillRect(
                    this.sx(vert.x - size/2 + this.x),
                    this.sy(vert.y - size/2 + this.y),
                    size,
                    size
                );
            }
        }
    }

    // fill the shape of this glyph with a solid colour
    fill(color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        for (let loop of this.loops) {
            ctx.moveTo(this.sx(loop[0].x + this.x), this.sy(loop[0].y + this.y))
            for (let i=1; i<loop.length; i++) {
                ctx.lineTo(this.sx(loop[i].x + this.x), this.sy(loop[i].y + this.y));
            }
            ctx.closePath();
        }
        ctx.fill('evenodd');
    }

    // display some stats about this glyph
    draw_stats(alt) {
        ctx.font = "10px monospace";
        ctx.textAlign = alt == "a" ? "right" : "left";
        ctx.fillStyle = alt == "a" ? "dodgerblue" : "red";
        let s = 12;
        let x = this.sx(this.bbox[alt == "a" ? 0 : 2] + this.x);
        let y = this.sy(this.bbox[3] + this.y);
        ctx.fillText(`x = ${this.x.toFixed(3)}`, x, y += s);
        ctx.fillText(`y = ${this.y.toFixed(3)}`, x, y += s);
        ctx.fillText(`cx = ${this.cx.toFixed(3)}`, x, y += s);
        ctx.fillText(`cy = ${this.cy.toFixed(3)}`, x, y += s);
        ctx.fillText(`height = ${this.height}`, x, y += s);
        ctx.fillText(`loops = ${this.loops.length}`, x, y += s);
        ctx.fillText(`verts = ${this.vert_counts()}`, x, y += s);
    }
}