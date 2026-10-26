class SVGMagicCreatureCard extends SVGMagicCard {
    constructor (svgElement, x = 0, y = 0) {
        super(svgElement, x, y);
        
        // reference image
        // this.background = new SVGImage(this, "./assets/dina_soul_steeper.jpg", -315, -440, 630, 880);
        // this.background.setOpacity(0.4);

        // TODO: check whether SVGDiv is compatible with all browsers

        // card background
        this.cardBack = new SVGRect(this, -315, -440, 630, 880);
        this.cardBack.setColor("#00ff0040");
        this.cardBack.setCornerRadius(30);

        // title
        this.title = new SVGText(this, "Dina, Soul Steeper", -260, -365, 31, 500);

        // cost
        this.cost = new SVGDiv(this, `
            <div class="cost">${sym('b')}${sym('g')}</div>
        `, -275, -392, 550, 100);

        // type
        this.type = new SVGDiv(this, `
            <div class="type">Legendary Creature – Dryad Druid</div>
        `, -260, 62, 520, 100);

        // description
        let box = [-260, 120, 520, 280];
        // this.descriptionRect = new SVGRect(this, ...box);
        // this.descriptionRect.setColor("#ff000040"); // rect for debug
        this.description = new SVGDiv(this, `
            <div class="carddesc">
                <p>Whenever you gain life, each opponent loses 1 life.</p>
                <p>${sym('1')}, Sacrifice another creature: Dina, Soul Steeper gets +X/+0 until end of turn, where X is the sacrificed creature's power.</p>
                <p class="flavor">Her concoctions corroded metal and fortified organic tissue. They would be studied for generations.</p>
            </div>
        `, ...box);

        // power/toughness
        this.stats = new SVGText(this, "1/3", 210, 380, 32);

        // card credits
        this.credit = new SVGDiv(this, `
            <p class="credit">Hello these are the card credits</p>
            <p class="credit">This is another line of credits</p>
        `, -275, 386, 520, 280);
    }
}