class StringMorph {
    constructor(string, font_a, font_b, align_method, morph_method) {
        this.string = string;
        this.value = Number(document.getElementById("morph").value);
        this.font_a = font_a;
        this.font_b = font_b;
        this.spacing = 2;

        this.glyph_morphs = [];
        for (const glyph of string) {
            const pair = new GlyphPair(glyph, font_a, font_b);
            pair.align(align_method);
            const glyph_morph = new GlyphMorph(pair, morph_method);
            this.glyph_morphs.push(glyph_morph)
        }
    }

    draw(x = 30, y = 0) {
        let running_width = x;
        for (let i=0; i<this.string.length; i++) {
            // don't draw spaces
            if (this.glyph_morphs[i].pair.glyph != " ") {
                this.glyph_morphs[i].draw_frame(this.value, running_width, c.height/2 + 120 * global_scale);
            }

            const advance_a = fonts[this.font_a].getAdvanceWidth(this.string[i]) * this.spacing;
            const advance_b = fonts[this.font_b].getAdvanceWidth(this.string[i]) * this.spacing;

            // start kerning from second glyph
            let kerning_a;
            let kerning_b;
            if (i < this.string.length-1) {
                const curr_a = fonts[this.font_a].charToGlyph(this.string[i]);
                const next_a = fonts[this.font_a].charToGlyph(this.string[i+1]);
                const curr_b = fonts[this.font_b].charToGlyph(this.string[i]);
                const next_b = fonts[this.font_b].charToGlyph(this.string[i+1]);
                kerning_a = fonts[this.font_a].getKerningValue(curr_a, next_a) * kerning_scale[this.font_a] * global_scale;
                kerning_b = fonts[this.font_b].getKerningValue(curr_b, next_b) * kerning_scale[this.font_b] * global_scale;
            } else {
                kerning_a = 0;
                kerning_b = 0;
            }
            
            const itp_advance = (1 - this.value) * (advance_a + kerning_a) * letter_spacing[this.font_a]
                                  + (this.value) * (advance_b + kerning_b) * letter_spacing[this.font_b];
            running_width += itp_advance * global_scale;
        }
    }
}