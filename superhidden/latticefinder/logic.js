// init board to shuffled state
function init_board_shuffle() {
    let board = [];
    let set = new Set([...Array(size**2).keys()]);
    
    for (let i = 0; i < size; i++) {
        board[i] = [];
        for (let j = 0; j < size; j++) {
            let item = Array.from(set)[Math.floor(Math.random()*set.size)];
            board[i][j] = item;
            set.delete(item);
        }
    }

    return board;
}

// init board to empty state
function init_board_empty() {
    let board = [];
    let size = 16;

    for (let i = 0; i < size; i++) {
        board[i] = Array(16).fill(null);
    }

    return board;
}

// swap the nodes at location (x1, y1) and (x2, y2)
function swap(x1, y1, x2, y2) {
    let temp = board[x1][y1];
    board[x1][y1] = board[x2][y2];
    board[x2][y2] = temp;
}

function pop(set) {
    for (let item of set) {
        set.delete(item);
        return item;
    }
}

// get a random x or y coordinate within board size bounds
function randcoord() {
    return Math.floor(Math.random() * size);
}

// return a random invalid node
function rand_invalid() {
    let inv = []
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (validity_straight(i, j) < 8) inv.push({ x:i, y:j });
        }
    }
    return inv[Math.floor(Math.random() * inv.length)];
}

// helper function for backtracking
//   - check duplicates
//   - check if node (x, y) correctly connects to the nodes before it
function bt_valid(x, y) {
    // check for duplicates
    let seen = new Set();
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] == undefined) continue;

            if (seen.has(board[i][j])) {
                return false; // duplicate found
            }
            seen.add(board[i][j]);
        }
    }

    // TODO: check connections
}

// assign a validity score to the entire board
function board_validity() {
    let val = 0;
    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            val += validity_straight(i, j);
        }
    }

    return val;
}

// assign a validity score to one node, allowing bent connections
function validity(x, y) {
    let a, b, c, d, val = 0;
    
    // up
    a = (board[x][y] & (1<<0)) != 0;
    b = (board[x][y-1] != undefined) ? (board[x][y-1] & (1<<4)) != 0 : false;
    if (a == b) val++;

    // down
    a = (board[x][y] & (1<<4)) != 0;
    b = (board[x][y+1] != undefined) ? (board[x][y+1] & (1<<0)) != 0 : false;
    if (a == b) val++;

    // right
    a = (board[x][y] & (1<<2)) != 0;
    b = (board[x+1]?.[y] != undefined) ? (board[x+1][y] & (1<<6)) != 0 : false;
    if (a==b) val++;

    // left
    a = (board[x][y] & (1<<6)) != 0;
    b = (board[x-1]?.[y] != undefined) ? (board[x-1][y] & (1<<2)) != 0 : false;
    if (a==b) val++;

    // top right
    a = (board[x][y-1] & (1<<3)) != 0;
    b = (board[x+1]?.[y-1] & (1<<5)) != 0;
    c = (board[x][y] & (1<<1)) != 0;
    d = (board[x+1]?.[y] & (1<<7)) != 0;
    if (a+b+c+d != 1) val++;

    // bottom right
    a = (board[x][y] & (1<<3)) != 0;
    b = (board[x+1]?.[y] & (1<<5)) != 0;
    c = (board[x][y+1] & (1<<1)) != 0;
    d = (board[x+1]?.[y+1] & (1<<7)) != 0;
    if (a+b+c+d != 1) val++;

    // top left
    a = (board[x-1]?.[y-1] & (1<<3)) != 0;
    b = (board[x][y-1] & (1<<5)) != 0;
    c = (board[x-1]?.[y] & (1<<1)) != 0;
    d = (board[x][y] & (1<<7)) != 0;
    if (a+b+c+d != 1) val++;

    // bottom left
    a = (board[x-1]?.[y] & (1<<3)) != 0;
    b = (board[x][y] & (1<<5)) != 0;
    c = (board[x-1]?.[y+1] & (1<<1)) != 0;
    d = (board[x][y+1] & (1<<7)) != 0;
    if (a+b+c+d != 1) val++;

    return val;
}

// assign a validity score to one node, allowing only straight connections
function validity_straight(x, y) {
    let a, b, c, d, n, val = 0;
    
    // up
    a = (board[x][y] & (1<<0)) != 0;
    b = (board[x][y-1]) ? (board[x][y-1] & (1<<4)) != 0 : false;
    n = board[x][y-1];
    if (n === null || a === b) val++;

    // down
    a = (board[x][y] & (1<<4)) != 0;
    b = (board[x][y+1]) ? (board[x][y+1] & (1<<0)) != 0 : false;
    n = board[x][y+1];
    if (n === null || a === b) val++;

    // right
    a = (board[x][y] & (1<<2)) != 0;
    b = (board[x+1]?.[y]) ? (board[x+1][y] & (1<<6)) != 0 : false;
    n = board[x+1]?.[y];
    if (n === null || a === b) val++;

    // left
    a = (board[x][y] & (1<<6)) != 0;
    b = (board[x-1]?.[y]) ? (board[x-1][y] & (1<<2)) != 0 : false;
    n = board[x-1]?.[y];
    if (n === null || a === b) val++;

    // top right
    a = (board[x][y] & (1<<1)) != 0;
    b = (board[x+1]?.[y-1] & (1<<5)) != 0;
    n = board[x+1]?.[y-1];
    if (n === null || a === b) val++;

    // bottom right
    a = (board[x][y] & (1<<3)) != 0;
    b = (board[x+1]?.[y+1] & (1<<7)) != 0;
    n = board[x+1]?.[y+1];
    if (n === null || a === b) val++;

    // top left
    a = (board[x-1]?.[y-1] & (1<<3)) != 0;
    b = (board[x][y] & (1<<7)) != 0;
    n = board[x-1]?.[y-1];
    if (n === null || a === b) val++;

    // bottom left
    a = (board[x][y] & (1<<5)) != 0;
    b = (board[x-1]?.[y+1] & (1<<1)) != 0;
    n = board[x-1]?.[y+1];
    if (n === null || a === b) val++;

    return val;
}