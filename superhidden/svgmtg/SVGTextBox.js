class SVGTextBox extends SVGObject {
    constructor(svgElement, text, x, y, width, height, fontSize = 16, lineHeight = null) {
        super(svgElement, x, y);
        this.width = width;
        this.height = height;
        this.fontSize = fontSize;
        this.lineHeight = lineHeight !== null ? lineHeight : fontSize * 1.2;

        this.textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        this.textElement.setAttribute('font-size', fontSize);
        this.groupElement.appendChild(this.textElement);

        this.numLines = 0;

        this._render(text);
    }

    _render(text) {
        // split text into words array
        const words = text.split(/\s+/).filter(w => w.length > 0);
        const lines = [];
        let current = '';

        // define function to measure the width of a string
        const measure = (str) => {
            const probe = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            probe.textContent = str;
            this.textElement.appendChild(probe);
            const w = probe.getComputedTextLength();
            this.textElement.removeChild(probe);
            return w;
        };

        // build lines array, + optional remainder line
        for (const word of words) {
            const candidate = current ? current + ' ' + word : word;
            if (current && measure(candidate) > this.width) {
                lines.push(current);
                current = word;
            } else {
                current = candidate;
            }
        }
        if (current) lines.push(current);

        // position tspan elements
        this.textElement.setAttribute('y', this.fontSize);
        lines.forEach((line, i) => {
            const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan.setAttribute('x', 0);
            if (i > 0) tspan.setAttribute('dy', this.lineHeight);
            tspan.textContent = line;
            this.textElement.appendChild(tspan);
        });

        this.numLines = lines.length;
    }

    setColor(color) {
        this.textElement.setAttribute('fill', color);
    }
}