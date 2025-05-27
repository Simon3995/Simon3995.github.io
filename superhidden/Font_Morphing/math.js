// interpolate straight line segment, exclude starting point
function interpolate_line(p0, p1, resolution) {
    let points = [];
    for (let i = 1; i <= resolution; i++) {
        let t = i / resolution;
        let x = (1 - t) * p0.x + t * p1.x;
        let y = (1 - t) * p0.y + t * p1.y;
        points.push({ x, y });
    }
    return points;
}

// interpolate a quadratic bezier curve with given resolution, exclude starting point
function interpolate_quad_curve(p0, p1, p2, resolution) {
    let points = [];
    for (let i = 1; i <= resolution; i++) {
        let t = i / resolution;
        let x = (1 - t) ** 2 * p0.x + 2 * t * (1 - t) * p1.x + t * t * p2.x;
        let y = (1 - t) ** 2 * p0.y + 2 * t * (1 - t) * p1.y + t * t * p2.y;
        points.push({ x, y });
    }
    return points;
}

// interpolate a cubic bezier curve with given resolution, exclude starting point
function interpolate_cubic_curve(p0, p1, p2, p3, resolution) {
    let points = [];
    for (let i = 1; i <= resolution; i++) {
        let t = i / resolution;
        let x = 
            (1 - t) ** 3 * p0.x + 
            3 * (1 - t) ** 2 * t * p1.x + 
            3 * (1 - t) * t ** 2 * p2.x + 
            t ** 3 * p3.x;
        let y = 
            (1 - t) ** 3 * p0.y + 
            3 * (1 - t) ** 2 * t * p1.y + 
            3 * (1 - t) * t ** 2 * p2.y + 
            t ** 3 * p3.y;

        points.push({ x, y });
    }
    return points;
}

function line_segment_length(p0, p1) {
    return Math.hypot(p0.x - p1.x, p0.y - p1.y);
}

// approximate the length of a quadratic bezier curve by interpolating
function approx_len_quad_curve(p0, p1, p2) {
    let points = interpolate_quad_curve(p0, p1, p2, 5);
    let current_point = p0;
    let total_dist = 0;

    for (const point of points) {
        total_dist += Math.hypot(current_point.x - point.x, current_point.y - point.y);
        current_point = point;
    }

    return total_dist;
}

// approximate the length of a quadratic bezier curve by interpolating
function approx_len_cubic_curve(p0, p1, p2) {
    let points = interpolate_cubic_curve(p0, p1, p2, 5);
    let current_point = p0;
    let total_dist = 0;

    for (const point of points) {
        total_dist += Math.hypot(current_point.x - point.x, current_point.y - point.y);
    }

    return total_dist;
}

// convert an SVG-like path from a font object to an array of polygons
function path_to_polygons(path, size) {
    let polygons = [];
    let this_polygon = [];
    let len, res, pts;
    let resolution_factor = 50 / (size * global_scale);

    // convert to polygons
    for (const cmd of path.commands) {
        switch (cmd.type) {
            case "M":
                this_polygon.push({ x:cmd.x, y:cmd.y });
                break;
            case "L":
                len = line_segment_length(this_polygon.last(), { x:cmd.x, y:cmd.y });
                if (len == 0) continue;
                res = Math.max(1, Math.round(len * resolution_factor));
                pts = interpolate_line(this_polygon.last(), { x:cmd.x, y:cmd.y }, res);
                this_polygon.push(...pts);
                break;
            case "Q":
                len = approx_len_quad_curve(this_polygon.last(), { x:cmd.x1, y:cmd.y1 }, { x:cmd.x, y:cmd.y });
                if (len == 0) continue;
                res = Math.max(1, Math.round(len * resolution_factor));
                pts = interpolate_quad_curve(this_polygon.last(), { x:cmd.x1, y:cmd.y1 }, { x:cmd.x, y:cmd.y }, res);
                this_polygon.push(...pts);
                break;
            case "C":
                len = approx_len_cubic_curve(this_polygon.last(), { x:cmd.x1, y:cmd.y1 }, { x:cmd.x2, y:cmd.y2 }, { x:cmd.x, y:cmd.y });
                if (len == 0) continue;
                res = Math.max(1, Math.round(len * resolution_factor));
                pts = interpolate_cubic_curve(this_polygon.last(), { x:cmd.x1, y:cmd.y1 }, { x:cmd.x2, y:cmd.y2 }, { x:cmd.x, y:cmd.y }, res);
                this_polygon,push(...pts);
                break;
            case "Z":
                polygons.push(this_polygon);
                this_polygon = [];
                break;
            default:
                console.error("Unknown path command type - ", cmd);
                break;
        }
    }

    for (let polygon of polygons)
        for (let i=0; i<polygon.length; i++)
            polygon[i].y *= -1; // flip y-axis

    for (let polygon of polygons) {
        // normalize
        for (let i=0; i<polygon.length; i++) {
            const factor = 500;
            polygon[i].x = (polygon[i].x) * factor / size;
            polygon[i].y = (polygon[i].y) * factor / size;
        }
    }

    // TODO: Sort by area here?
    // currently sorting by array length which is a bit hacky but it seems to work so
    polygons.sort((a,b) => b.length - a.length);

    return polygons;
}

// calculate the area of overlap between two glyphs
// takes offset in x and y into account
function xor_area(glyph_a, glyph_b) {
    let la = glyph_a.get_arr_loops();
    let lb = glyph_b.get_arr_loops();

    // find difference polygon
    let xor = polygonClipping.xor(la, lb);

    // compute overlap area & diff area using shoelace formula
    let xor_area = 0;
    let xor_flat = xor.flat();
    for (let i=0; i<xor_flat.length; i++) {
        xor_area += shoelace_area(xor_flat[i]);
    }

    return xor_area;
}

function jaccard_index(glyph_a, glyph_b) {
    let la = glyph_a.get_arr_loops();
    let lb = glyph_b.get_arr_loops();

    // find intersection and union
    let isct = polygonClipping.intersection(la, lb);
    let union = polygonClipping.union(la, lb);

    // find area of intersection
    let isct_area = 0;
    let isct_flat = isct.flat();
    for (let i=0; i<isct_flat.length; i++) {
        isct_area += shoelace_area(isct_flat[i]);
    }

    // find area of union
    let union_area = 0;
    let union_flat = union.flat();
    for (let i=0; i<union_flat.length; i++) {
        union_area += shoelace_area(union_flat[i]);
    }

    // jaccard index
    return (isct_area / union_area);
}

function precalc(font_a, font_b) {
    // pre-calculate all maxarea ovelaps ALFASLAB-JUDSON
    let msds = []
    for (let glyph of glyphlist) {
        let pair = new GlyphPair(font_a, font_b, glyph);
        pair.draw();
        let msd = pair.align_maxarea();
        msd[0] = glyph;
        msds.push(msd);
        console.log(`Glyph "${glyph}" processed!`);
    }
    console.log(JSON.stringify(msds));
    return msds;
}

// positive if CCW, negative if CW
function signed_triangle_area(ax, ay, bx, by, cx, cy) {
    let result = ax * (by - cy);
    result += bx * (cy - ay);
    result += cx * (ay - by);
    result /= 2;
    return result;
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

const average = array => array.reduce((a,b) => a + b) / array.length;

// https://rosettacode.org/wiki/Shoelace_formula_for_polygonal_area#JavaScript
// VVVVV

// shoelaceArea :: [(Float, Float)] -> Float
const shoelace_area = (vertices) => abs(
    uncurry(subtract)(
        ap(zip)(compose(tail, cycle))(
            vertices
        )
        .reduce(
            (a, x) => [0, 1].map(b => {
                const n = Number(b);

                return a[n] + (
                    x[0][n] * x[1][Number(!b)]
                );
            }),
            [0, 0]
        )
    )
) / 2;

// abs :: Num -> Num
const abs = x =>
    // Absolute value of a given number
    // without the sign.
    0 > x ? -x : x;

// ap :: (a -> b -> c) -> (a -> b) -> (a -> c)
const ap = f =>
    // Applicative instance for functions.
    // f(x) applied to g(x).
    g => x => f(x)(
        g(x)
    );

// compose (<<<) :: (b -> c) -> (a -> b) -> a -> c
const compose = (...fs) =>
    // A function defined by the right-to-left
    // composition of all the functions in fs.
    fs.reduce(
        (f, g) => x => f(g(x)),
        x => x
    );

// cycle :: [a] -> Generator [a]
const cycle = function* (xs) {
    // An infinite repetition of xs,
    // from which an arbitrary prefix
    // may be taken.
    const lng = xs.length;
    let i = 0;

    while (true) {
        yield xs[i];
        i = (1 + i) % lng;
    }
};

// length :: [a] -> Int
const length = xs =>
    // Returns Infinity over objects without finite
    // length. This enables zip and zipWith to choose
    // the shorter argument when one is non-finite,
    // like cycle, repeat etc
    "GeneratorFunction" !== xs.constructor
    .constructor.name ? (
        xs.length
    ) : Infinity;

// subtract :: Num -> Num -> Num
const subtract = x =>
    y => y - x;

// tail :: [a] -> [a]
const tail = xs =>
    // A new list consisting of all
    // items of xs except the first.
    "GeneratorFunction" !== xs.constructor
    .constructor.name ? (
        Boolean(xs.length) ? (
            xs.slice(1)
        ) : undefined
    ) : (take(1)(xs), xs);

// take :: Int -> [a] -> [a]
// take :: Int -> String -> String
const take = n =>
    // The first n elements of a list,
    // string of characters, or stream.
    xs => "GeneratorFunction" !== xs
    .constructor.constructor.name ? (
        xs.slice(0, n)
    ) : Array.from({
        length: n
    }, () => {
        const x = xs.next();

        return x.done ? [] : [x.value];
    }).flat();

// uncurry :: (a -> b -> c) -> ((a, b) -> c)
const uncurry = f =>
    // A function over a pair, derived
    // from a curried function.
    (...args) => {
        const [x, y] = Boolean(args.length % 2) ? (
            args[0]
        ) : args;

        return f(x)(y);
    };

// zip :: [a] -> [b] -> [(a, b)]
const zip = xs => ys => {
    const
        n = Math.min(length(xs), length(ys)),
        vs = take(n)(ys);

    return take(n)(xs)
        .map((x, i) => [x, vs[i]]);
};

function min_idx(a) {
    let lowest = 0;
    for (let i = 1; i < a.length; i++) {
        if (a[i] < a[lowest]) lowest = i;
    }
    return lowest;
}   