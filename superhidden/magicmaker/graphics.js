const draw_mana_cost = function(c, x, y) {
    let s = 24;
    let i = 0;

    for (let color of c.toLowerCase().split("").reverse().join("")) {
        try {
            ctx.drawImage(mana_img[color], 444-(s/2)-(i*26), 52-(s/2), s, s);
            i++;
        } catch (e) {/* OH NO! anyway, */}
    }

    // any color
    let others = c.match(/(?<=\[).+?(?=\])/g);
    if (others) {
        for(let cost of others) {
            ctx.fillStyle = "#bbbbbb";
            ctx.beginPath();
            ctx.arc(444-(i*26), 52, s/2, 0, 2*Math.PI, true);
            ctx.fill();

            ctx.fillStyle = "black";
            ctx.font = "25px Beleren";
            ctx.textAlign = "center";
            ctx.fillText(cost, 444-(i*26), 60, 20);

            i++;
        }
    }
}

const fill_card_regions = function() {
    // background
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(0, 0, c.width, c.height);
    background_border();
    ctx.fill("evenodd");

    // title
    ctx.fillStyle = "#dddddd";
    ctx.beginPath();
    title_border();
    card_type_border();
    ctx.fill();
    ctx.stroke();

    // description
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    description_border();
    ctx.fill();
    ctx.stroke();

    // power/toughness
    if (card.showPowerToughness) {
        ctx.fillStyle = "#dddddd";
        ctx.beginPath();
        power_toughness_border();
        ctx.fill();
        ctx.stroke();
    }
}

const draw_card_text = function() {
    // title
    ctx.fillStyle = "black";
    ctx.font = "25px Beleren";
    ctx.textAlign = "left";
    ctx.fillText(card.title, 42, 61, 415);

    // card type
    ctx.fillText(`${card.type}${card.subtype?" - "+card.subtype:""}`, 42, 422, 415);

    // power-toughness
    if (card.showPowerToughness) {
        ctx.textAlign = "center";
        ctx.fillText(`${card.power}/${card.toughness}`, 430, 653, 65);
    }

    // description
    ctx.textAlign = "left";
    ctx.font = "25px ElegantGaramond";
    let desc = card.description;
    let lines = getLines(ctx, desc, 398);
    for (let i in lines) {
        ctx.fillText(lines[i], 50, 470 + 27*i);
    }

    // meta text
    ctx.fillStyle = "#ffffffaa";
    ctx.font = "16px ElegantGaramond";
    ctx.fillText(card.meta, 24, 670, 362);
}

// from https://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element
const getLines = function(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}