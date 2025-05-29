class GlyphMorph {
    constructor(pair, method) {
        this.pair = pair;
        this.glyph_a = this.pair.glyph_a;
        this.glyph_b = this.pair.glyph_b;
        this.ax = this.glyph_a.x;
        this.ay = this.glyph_a.y;
        this.bx = this.glyph_b.x;
        this.by = this.glyph_b.y;
        this.frame_count = 100;

        switch(method) {
            case "linear":
                this.frames = this.morph_linear();
                break;
            case "voronoi":
                this.frames = this.morph_voronoi();
                break;
            case "physical":
                this.frames = this.morph_physical();
                break;
            default:
                console.error("Invalid morphing method");
                break;
        }
    }

    morph_linear() {
        let la = this.glyph_a.get_arr_loops();
        let lb = this.glyph_b.get_arr_loops();
        let frames = [];
        
        // for each loop
        for (let l = 0; l < la.length; l++) {
            // find offset with smallest total distance
            let costs = [];
            for (let offset = 0; offset < la[l].length; offset++) {
                costs[offset] = 0;
                for (let i = 0; i < la[l].length; i++) {
                    let dist_x = la[l][i][0] - lb[l][(i+offset)%lb[l].length][0];
                    let dist_y = la[l][i][1] - lb[l][(i+offset)%lb[l].length][1];
                    let dist = Math.hypot(dist_x, dist_y);
                    costs[offset] += dist;
                }
            }

            let ofs = min_idx(costs)

            for (let i = 0; i < this.frame_count; i++) {
                if (!frames[i]) frames[i] = [];
                let factor = i / (this.frame_count - 1);
                let itp_loop = [];

                // push interpolated loop
                for (let j = 0; j < la[l].length; j++) {
                    let itp_x = (1 - factor) * la[l][j][0] + factor * lb[l][(j+ofs)%lb[l].length][0];
                    let itp_y = (1 - factor) * la[l][j][1] + factor * lb[l][(j+ofs)%lb[l].length][1];
                    itp_loop.push([itp_x, itp_y]);
                }
                frames[i].push(itp_loop);
            }
        }

        return frames;
    }

    morph_linear_hungarian() {
        let la = this.glyph_a.get_arr_loops();
        let lb = this.glyph_b.get_arr_loops();

        // for each loop
        for (let l = 0; l < la.length; l++) {
            let costs = [];
            // get distance for all vert pairs within loop
            for (let i = 0; i < la[l].length; i++) {
                costs[i] = [];
                for (let j = 0; j < lb[l].length; j++) {
                    let dist_x = la[l][i][0] - lb[l][j][0];
                    let dist_y = la[l][i][1] - lb[l][j][1];
                    let dist = Math.hypot(dist_x, dist_y);
                    costs[i][j] = dist;
                }
            }
            let pairs = computeMunkres(costs);
            console.log(pairs);
            for (let i = 0; i < pairs.length; i++) {
                ctx.strokeStyle = "lime";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(...la[l][pairs[i][0]]);
                ctx.lineTo(...lb[l][pairs[i][1]]);
                ctx.stroke();
            }
        }

        // TODO: calculate frames

        return [];
    }

    morph_voronoi() {
        // TODO
        return [];
    }

    morph_physical() {
        // TODO
        return [];
    }

    draw_frame(value = 0, x = 20, y = 120) {
        const frame = Math.round((this.frame_count - 1) * value)
        const bsx = this.glyph_b.sx;
        const bsy = this.glyph_b.sy;

        let loops = this.frames[frame];
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        for (let loop of loops) {
            const x0 = (1-value)*this.glyph_a.isx(loop[0][0]) + value*this.glyph_b.isx(loop[0][0]);
            const y0 = (1-value)*this.glyph_a.isy(loop[0][1]) + value*this.glyph_b.isy(loop[0][1]);
            const origin_x = (1 - value) * this.glyph_a.x + value * this.glyph_b.x;
            const origin_y = (1 - value) * this.glyph_a.y + value * this.glyph_b.y;
            const offset_x = x - origin_x;
            const offset_y = y - origin_y;
            ctx.moveTo(
                x0 + offset_x,
                y0 + offset_y
            );
            for (let i=1; i<loop.length; i++) {
                const xcoord = (1-value)*this.glyph_a.isx(loop[i][0]) + value*this.glyph_b.isx(loop[i][0]);
                const ycoord = (1-value)*this.glyph_a.isy(loop[i][1]) + value*this.glyph_b.isy(loop[i][1]);
                ctx.lineTo(
                    xcoord + offset_x,
                    ycoord + offset_y
                );
            }
            ctx.closePath();
        }
        ctx.fill('evenodd');

        // draw origin
        // const s = 5;
        // ctx.fillStyle = `hsl(${-value*120}, 100%, 50%)`;
        // ctx.fillRect(
        //     x - s,
        //     y - s,
        //     2*s,
        //     2*s
        // );
    }
}