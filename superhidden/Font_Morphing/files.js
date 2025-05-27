// load a font file asynchronously
async function load_font(path) {
    const response = await fetch(path);
    const data = await response.arrayBuffer();
    const font = opentype.parse(data);
    return font;
}

// retrieve a specific glyph from a font
function get_glyph(font, letter) {
    const unicode = letter.codePointAt(0);
    for (const index in font.glyphs.glyphs) {
        const glyph = font.glyphs.glyphs[index];
        if (glyph.unicode == unicode) return glyph;
    }
    return null;
}