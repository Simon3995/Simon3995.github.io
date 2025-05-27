const update = function() {
    ctx.clearRect(0, 0, c.width, c.height);
    fill_card_regions();
    draw_card_text();
    draw_mana_cost(card.manacost);
    requestAnimationFrame(update);
}
update();