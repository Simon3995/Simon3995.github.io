class TextBox {
    constructor(text = "", x = 0, y = 0) {
        this.raw_text = text;
        this.line_height = 10;
        this.width = 120;
        this.lines = this.get_lines(this.raw_text);
        this.x = x;
        this.y = y;
        
        this.height = this.line_height * this.lines.length;
    }

    // reconstruct a proper instance of the class from loaded json data
    from_json(obj) {
        this.raw_text = obj.raw_text;
        this.line_height = obj.line_height;
        this.width = obj.width;
        this.lines = obj.lines;
        this.x = obj.x;
        this.y = obj.y;
        this.height = obj.height;
        return this;
    }

    // TODO
    get_lines(raw_text) {
        const words = this.raw_text.split(/\s+/);
        const lines = [];
        let current_line = "";

        // loop through all words
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const test_line = current_line ? current_line + " " + word : word;
            const metrics = ctx.measureText(test_line);
            console.log(metrics);
            const test_width = metrics.width;

            if (test_width <= this.width) {
                current_line = test_line;
            } else {
                if (current_line) {
                    lines.push(current_line);
                }
                current_line = word;
            }
        }

        // remainder
        if (current_line) {
            lines.push(current_line);
        }

        return lines;
    }

    draw() {
        const padding = 5;

        ctx.strokeStyle = "#0ff8";
        ctx.beginPath();
        ctx._roundRect(
            this.x - padding,
            this.y - padding,
            this.width + 2 * padding,
            this.height + 2 * padding,
            5
        );
        ctx._stroke();

        ctx.fillStyle = "white";
        ctx.textBaseline = "top";
        let ry = this.y;
        for (const line of this.lines) {
            ctx._fillText(line, this.x, ry);
            ry += this.line_height;
        }
    }
}