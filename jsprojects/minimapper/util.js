// convert real coordinates to viewport coordinates
const r2v = function({x, y}) {
    return {
        x: (x - rx) * zoom + c.width/2,
        y: -(y + ry) * zoom + c.height/2
    }
}

// convert viewport coordinates to real coordinates
const v2r = function({x, y}) {
    return {
        x: rx + (x - c.width/2) / zoom,
        y: -ry - (y - c.height/2) / zoom
    }
}

// intersection of two arrays
const isct = function(a, b) {
    return a.filter(val => b.includes(val));
}

// union of two arrays
const union = function(a, b) {
    return [...new Set([...a, ...b])];
}

// get list of zones containing this node id
const node_zones = function(id) {
    id = Number(id);
    let zones = [];
    for (let name in Map.zones)
        if (Map.zones[name].nodes.includes(id))
            zones.push(zone.name);
    return zones;
}

// get list of zones containing this link id
const link_zones = function(id) {
    id = Number(id);
    let zones = [];
    for (let name in Map.zones)
        if (Map.zones[name].links.includes(id))
            zones.push(name);
    return zones;
}

const obj2arr = function(obj) {
    let arr = [];
    for (let key in obj) {
        arr.push(obj[key]);
    }
    return arr;
}

// get list of links connected to this node
const get_links_from_node = function(node_id) {
    let links = [];
    for (let id in Map.links) {
        id = Number(id);
        let link = Map.links[id];
        if (link.n1 === node_id || link.n2 === node_id) {
            links.push(id);
        }
    }
    return links;
}

// get name of zone at these coordinates
const get_zone_at_coords = function(x, y) {
    // slightly randomized points far outside the map
    let farx = 5000 + Math.random();
    let fary = 4000 + Math.random();

    for (let name in Map.zones) {
        let zone = Map.zones[name];
        // ignore boundary
        if (name == "boundary") continue;
        
        let intersections = 0;
        for (let id of zone.links) {
            let n1 = Map.nodes[Map.links[id].n1];
            let n2 = Map.nodes[Map.links[id].n2];
            if (lines_isct(n1.x, n1.y, n2.x, n2.y, x, y, farx, fary)) {
                intersections++;
            }
        }
        if (intersections % 2) {
            return name;
        }
    }
    return null;
}

// check if intersection between two line segments
const lines_isct = function(a, b, c, d, p, q, r, s) {
    let det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
}

// calculate new chunks based on given chunk definitions
// will only re-calculate colors in active array
const calculate_chunks = function(cdefs, active=[]) {
    let chunks = {};
    
    // region chunks
    for (let color in cdefs) {
        if (!active.includes(color)) {
            chunks[color] = Map.chunks[color];
            continue;
        }

        let zones = cdefs[color];

        // init new chunk
        let chunk = [];

        //************ Add Loops *************
        // list all links in exactly 1 included zone
        let inc_l = [];
        
        for (let id in Map.links) {
            id = Number(id);
            if (isct(link_zones(id), zones).length == 1)
                inc_l.push(id);
        }
        
        // list all nodes in >=1 incl and >=1 excl zone
        let incl = [];
        let excl = [];
        for (let name in Map.zones) {
            let zone = Map.zones[name];
            if (zones.includes(name)) {
                incl = union(incl, zone.nodes);
            } else {
                excl = union(excl, zone.nodes);
            }
        }
        
        let inc_n = isct(incl, excl);
        
        let l, n, iterations = 0;
        outer:
        while (true) {
            if (inc_n.length <= 0) break outer;

            // start a new loop
            let loop = [];
            let node_id = inc_n.pop();
            let link_id;
            n = Map.nodes[node_id];
            loop.push(n);
            
            inner:
            while (true) {
                // prevent infinite loop
                if (iterations++ > Object.keys(Map.nodes).length) {
                    console.error("Error in calculate_chunks: too many iterations. Check for mistakes in map file");
                    return;
                }
                
                // wtf?
                link_id = isct(inc_l, get_links_from_node(node_id))[0]
                l = Map.links[link_id];                         // get the first included link connected to current node
                if (!inc_l.includes(link_id)) break inner;
                inc_l.splice(inc_l.indexOf(link_id), 1);        // remove it from the included links
                node_id = (l.n1 === node_id) ? l.n2 : l.n1;
                n = Map.nodes[node_id];                         // get the other node attached to this link
                if (!inc_n.includes(node_id)) break inner;
                inc_n.splice(inc_n.indexOf(node_id), 1);        // remove it from the included nodes
                loop.push(n);
            }
            chunk.push(loop);
        }
        chunks[color] = chunk;
    }
    return chunks;
}

// update map after a change
const update_map = function() {
    // updates chunks for color being painted and last removed color, skips everything else
    Map.chunks = calculate_chunks(Map.cdefs, [paintcolor, last_removed]);
}

// unpaints a zone
const unpaint = function(zone) {
    // update cdefs
    for (let color in Map.cdefs) {
        if (Map.cdefs[color].includes(zone)) {
            Map.cdefs[color].splice(Map.cdefs[color].indexOf(zone), 1);
            last_removed = color;
        }
        if (!Map.cdefs[color].length) delete Map.cdefs[color];
    }

    // update chunkmenu
    for (let i=0; i<chunkmenu.length; i++) {
        if (chunkmenu[i].zones.includes(zone)) {
            chunkmenu[i].zones.splice(chunkmenu[i].zones.indexOf(zone), 1);
        }
        if (!chunkmenu[i].zones.length) {
            chunkmenu.splice(i, 1);
        }
    }
}

// paints a zone
const paint = function(zone, color) {
    // region already painted
    if ((Map.cdefs[color]) && Map.cdefs[color].includes(zone)) return;

    unpaint(zone);
    
    // update cdefs
    if (Map.cdefs[color]) {
        Map.cdefs[color].push(zone);
        get_chunkmenu(color).zones.push(zone);
    } else {
        Map.cdefs[color] = [zone];
        chunkmenu.push({
            color: color,
            zones: [zone],
            name: "new group"
        });
    }
}

// converts rgb(r, g, b) format into #rrggbb
const rgbstring2hex = function(rgb) {
    rgb = rgb.split("(")[1].split(")")[0].split(", ");
    rgb = rgb.map(x => parseInt(x).toString(16));
    rgb = rgb.map(x => x.length<2 ? "0"+x : x)
    return "#" + rgb.join("");
}

// returns chunkmenu entry with given color
const get_chunkmenu = function(color) {
    for (let e of chunkmenu) {
        if (e.color == color) return e;
    }
    return;
}