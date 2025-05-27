class GlyphPair {
    constructor(glyph, font_a, font_b) {
        this.font_a = fonts[font_a];
        this.font_b = fonts[font_b];
        this.font_a_name = font_a;
        this.font_b_name = font_b;
        this.glyph_a = new Glyph(this.font_a, glyph);
        this.glyph_b = new Glyph(this.font_b, glyph);
        this.glyph = glyph;

        this.center_overlap(c.width/2, c.height/2);
        this.match_loop_order();
        this.match_vert_counts();
    }

    // center the two glyphs at (x,y), overlapping
    center_overlap(x, y) {
        this.glyph_a.center(x, y);
        this.glyph_b.center(x, y);
    }

    // center the two glyphs at (x,y), side by side
    center_sbs(x, y) {
        let dist = (this.glyph_a.bbox_width() + this.glyph_b.bbox_width()) / 4 + 5;
        this.glyph_a.center(x - dist, y);
        this.glyph_b.center(x + dist, y);
    }

    // draw both glyphs
    draw() {
        this.glyph_a.draw_all("a");
        this.glyph_b.draw_all("b");
    }

    // find the best matching between loop order
    match_loop_order() {
        // get edge loops
        let loops_a = this.glyph_a.get_arr_loops();
        let loops_b = this.glyph_b.get_arr_loops();
        let loop_amt = loops_a.length;
        
        // make sure the loop counts match
        if (loops_a.length != loops_b.length) {
            console.error("Loop counts do not match!");
        }

        // build matrix of costs
        let costs = [];
        for (let i=0; i<loop_amt; i++) {
            costs[i] = [];
            for (let j=0; j<loop_amt; j++) {
                // area difference
                let area_a = shoelace_area(loops_a[i]);
                let area_b = shoelace_area(loops_b[j]);
                costs[i][j] = Math.abs(area_a - area_b) / 200;

                // center of mass difference
                let fixed_a = {
                    type: "MultiPolygon",
                    coordinates: polygonClipping.intersection([loops_a[i]])
                }
                let fixed_b = {
                    type: "MultiPolygon",
                    coordinates: polygonClipping.intersection([loops_b[j]])
                }
                let com_a = turf.centerOfMass(fixed_a).geometry.coordinates;
                let com_b = turf.centerOfMass(fixed_b).geometry.coordinates;
                let dist_x = com_a[0] - com_b[0];
                let dist_y = com_a[1] - com_b[1];
                let dist = Math.hypot(dist_x, dist_y);
                costs[i][j] += dist / 5;
            }
        }

        // munkres algorithm
        let idx_pairs = computeMunkres(costs);

        // reorder B loops
        // let new_loops = []
        // idx_pairs.forEach(([old_idx, new_idx]) => {
        //     new_loops[new_idx] = this.glyph_b.loops[old_idx];
        // });
        // this.glyph_b.loops = new_loops;
        this.glyph_b.loops = idx_pairs.map(([new_idx, old_idx]) => this.glyph_b.loops[old_idx]);
    }

    // subdivide edges to match the vert counts per-loop
    match_vert_counts() {
        // vert counts per loop
        let va = this.glyph_a.vert_counts();
        let vb = this.glyph_b.vert_counts();

        // check that number of loops between glyphs matches
        if (va.length != vb.length) {
            console.error("number of loops does not match!");
            return;
        }

        // pairwise maximum
        let max = va.map((val, idx) => Math.max(val, vb[idx]));

        // match
        this.glyph_a.subdivide_to(max);
        this.glyph_b.subdivide_to(max);
    }

    // general align method
    align(method) {
        if (method == "bbox") {
            this.align_bbox();
            return;
        }

        if (method == "maxarea") {
            this.align_maxarea_precalc();
            return;
        }

        if (method == "procrustes") {
            this.align_procrustes();
            return;
        }

        console.error(`Unknown align method: ${method}`);
    }

    // scale and move glyph b so that its bbox matches that of glyph a
    align_bbox() {
        this.center_overlap(c.width/2, c.height/2);
        
        // horizontal and vertical scaling factors
        let sh = this.glyph_a.bbox_width() / this.glyph_b.bbox_width();
        let sv = this.glyph_a.bbox_height() / this.glyph_b.bbox_height();

        this.glyph_b.stretch_x = sh;
        this.glyph_b.stretch_y = sv;
    }

    // scale and translate glyph b so that the area of overlap between a and b is maximized
    align_maxarea() {
        // approximate search
        let msd = [-Infinity, 0, 0, 1, 1]; // minimum symmetric difference
        for (let offset_x = -50; offset_x <= 50; offset_x += 10) {
            for (let offset_y = -50; offset_y <= 50; offset_y += 10) {
                for (let stretch_x = 0.2; stretch_x <= 1.8; stretch_x += 0.4) {
                    for (let stretch_y = 0.2; stretch_y <= 1.8; stretch_y += 0.4) {
                        this.center_overlap(c.width/2, c.height/2);
                        this.glyph_b.x += offset_x;
                        this.glyph_b.y += offset_y;
                        this.glyph_b.stretch_x = stretch_x;
                        this.glyph_b.stretch_y = stretch_y;
                        let sym_diff = jaccard_index(this.glyph_a, this.glyph_b);
                        if (sym_diff > msd[0]) {
                            msd = [sym_diff, offset_x, offset_y, stretch_x, stretch_y];
                        }
                    }
                }
            }
        }

        // precise search
        let msdp = [-Infinity, 0, 0, 1, 1]; // minimum symmetric difference precise
        for (let offset_x = msd[1]-10; offset_x <= msd[1]+10; offset_x += 2) {
            for (let offset_y = msd[2]-10; offset_y <= msd[2]+10; offset_y += 2) {
                for (let stretch_x = msd[3]-0.4; stretch_x <= msd[3]+0.4; stretch_x += 0.1) {
                    for (let stretch_y = msd[4]-0.4; stretch_y <= msd[4]+0.4; stretch_y += 0.1) {
                        this.center_overlap(c.width/2, c.height/2);
                        this.glyph_b.x += offset_x;
                        this.glyph_b.y += offset_y;
                        this.glyph_b.stretch_x = stretch_x;
                        this.glyph_b.stretch_y = stretch_y;
                        let sym_diff = jaccard_index(this.glyph_a, this.glyph_b);
                        if (sym_diff > msdp[0]) {
                            msdp = [sym_diff, offset_x, offset_y, stretch_x, stretch_y];
                        }
                    }
                }
            }
        }

        // apply best overlap
        this.center_overlap(c.width/2, c.height/2);
        this.glyph_b.x += msdp[1];
        this.glyph_b.y += msdp[2];
        this.glyph_b.stretch_x = msdp[3];
        this.glyph_b.stretch_y = msdp[4];

        return msdp;
    }

    align_maxarea_precalc() {
        // check if fonts are the same
        if (this.font_a_name == this.font_b_name) {
            this.align_bbox();
            return;
        }

        // ensure order is alphabetical
        if (this.font_a_name > this.font_b_name) {
            [this.font_a_name, this.font_b_name] = [this.font_b_name, this.font_a_name];
        }
        
        let p = precomputed[this.font_a_name + this.font_b_name];
        for (let msd of p) {
            if (msd[0] == this.glyph) {
                this.center_overlap(c.width/2, c.height/2);
                this.glyph_b.x += Number(msd[1]);
                this.glyph_b.y += Number(msd[2]);
                this.glyph_b.stretch_x = Number(msd[3]);
                this.glyph_b.stretch_y = Number(msd[4]);
                break;
            }
        }
    }

    // Procrustes Superimposition, unfinished
    align_procrustes() {
        // make sure that vertex counts match per-loop
        if (!arraysEqual(this.glyph_a.vert_counts(), this.glyph_b.vert_counts())) {
            console.error(
                "Vert counts do not match!",
                this.glyph_a.vert_counts(),
                this.glyph_b.vert_counts()
            );
        }
        
        let la = this.glyph_a.get_arr_loops();
        let lb = this.glyph_b.get_arr_loops();
        
        // get centers of mass
        let coords_a = polygonClipping.union(la);
        let coords_b = polygonClipping.union(lb);
        let fixed_a = {
            type: "MultiPolygon",
            coordinates: coords_a
        }
        let fixed_b = {
            type: "MultiPolygon",
            coordinates: coords_b
        }
        
        let com_a = turf.centerOfMass(fixed_a).geometry.coordinates;
        let com_b = turf.centerOfMass(fixed_b).geometry.coordinates;

        // align centers of mass
        this.glyph_b.x += com_a[0] - com_b[0];
        this.glyph_b.y += com_a[1] - com_b[1];

        // scaling
        let la_flat = la.flat();
        let lb_flat = lb.flat();
        
        let la_squares = la_flat.map((point) => {
            return (com_a[0] - point[0])**2 + (com_a[1] - point[1])**2;
        });
        let lb_squares = lb_flat.map((point) => {
            return (com_b[0] - point[0])**2 + (com_b[1] - point[1])**2;
        });

        let rmsd_a = Math.sqrt(average(la_squares));
        let rmsd_b = Math.sqrt(average(lb_squares));

        let b_scale_factor = rmsd_a / rmsd_b;
        this.glyph_b.stretch_x *= b_scale_factor;
        this.glyph_b.stretch_y *= b_scale_factor;
    }
}