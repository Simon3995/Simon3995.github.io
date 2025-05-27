let inputs = document.getElementsByTagName('input');

for (let input of inputs) {
    switch (input.type) {
        case "number":
            input.addEventListener("change", function(e) {
                card[e.target.id] = e.target.value;
            }, false);
        case "text":
            input.addEventListener("keyup", function(e) {
                card[e.target.id] = e.target.value;
            }, false);
            break;
        case "checkbox":
            input.addEventListener("change", function(e) {
                card[e.target.id] = e.target.checked;
            }, false);
            break;
    }
}