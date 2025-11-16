function draw_board() {
    // white background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, c.width, c.height);

    // connectors
    let l;
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#888";
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            for (let b = 0; b < 8; b++) {
                if (board[i][j] & (1 << b)) {
                    // account for diagonals
                    l = (b % 2) ? 50 * Math.sqrt(2) : 50;
                    
                    ctx.beginPath();
                    ctx.moveTo(100 + 100*i, 100 + 100*j);
                    ctx.lineTo(
                        100 + 100*i + l*Math.sin(2*Math.PI * b/8),
                        100 + 100*j - l*Math.cos(2*Math.PI * b/8)
                    )
                    ctx.stroke();
                }
            }
        }
    }

    // centers
    let s = 40;
    for (let i = 0; i<size; i++) {
        for (let j=0; j<size; j++) {
            ctx.fillStyle = ["#c32626","#de5353","#f77c53","#ffa250","#ffc527","#aaba41","#519c52","#00a0c4","#2f62c8"][validity_straight(i,j)];
            ctx.fillRect(100 + 100*i-(s/2), 100 + 100*j-(s/2), s, s);
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.font = "bold 30px Arial";
            if (board[i][j] != undefined) {
                ctx.fillText(board[i][j], 100+100*i, 110+100*j, s);
            } else {
                // draw "-" for empty nodes
                ctx.fillText("-", 100+100*i, 110+100*j, s);
            }
        }
    }
}