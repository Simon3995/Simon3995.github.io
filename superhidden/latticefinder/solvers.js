// attempts to solve a shuffled board by swapping random nodes
function swap_solve() {
    draw_board();
    let validity_pre = board_validity();
    info.innerHTML = `Board Validity: ${validity_pre} (${(validity_pre/20.48).toFixed(2)}%)`;

    // attempt swap
    if (validity_pre < 2048) {
        for (let i=0; i<speed; i++) {
            let inv = rand_invalid();
            let x2 = randcoord();
            let y2 = randcoord();
            swap(inv.x, inv.y, x2, y2);
            let validity_post = board_validity();
            if (validity_post < validity_pre) swap(inv.x, inv.y, x2, y2);
            if (validity_post == 2048) {
                document.documentElement.style.backgroundColor = "green";
                break;
            }
        }
        if (validity_pre == board_validity()) {
            drought++;
            //console.log(drought);
            if (drought > 2000) {
                for (let j = 0; j < 2; j++) {
                    swap(randcoord(), randcoord(), randcoord(), randcoord());
                    drought = 0;
                }
            }
        } else {
            drought = 0;
        }
    }

    requestAnimationFrame(swap_solve);
}

function backtrack_solve() {
    draw_board(); // optional to draw every frame — can be skipped for more speed

    let steps = 0;
    while (steps < 8000) {
        // 0. check if complete
        if (y === 16) {
            console.log("Solved!");
            return true;
        }

        // 1. assign or increment value
        if (board[x][y] == null) {
            board[x][y] = 0;
        } else {
            board[x][y]++;
        }

        // 2. check for overflow
        if (board[x][y] === 256) {
            board[x][y] = null;

            // backtrack
            if (x === 0 && y === 0) {
                console.log("No solution.");
                return false;
            }

            if (x === 0) {
                x = 15;
                y--;
            } else {
                x--;
            }

            steps++;
            continue; // retry previous cell next step
        }

        // 3. if current assignment is valid, advance
        if (!reject_solution()) {
            x++;
            if (x === 16) {
                x = 0;
                y++;
            }
        }

        steps++;
    }

    // 4. schedule next frame
    requestAnimationFrame(backtrack_solve);
}

// check if this board state is impossible to complete into a valid solution
function reject_solution() {
    // check for duplicates
    let seen = new Set();
    for (let row of board) {
        for (let val of row) {
            if (val === null) continue;
            if (seen.has(val)) return true;
            seen.add(val);
        }
    }

    if (validity_straight(x, y) < 8) return true;

    // valid!
    return false;
}