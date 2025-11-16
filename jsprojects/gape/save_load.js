function saveNetwork() {
	temp = baseNetwork[0];
	for (i=1; i<=gatesAmt; i++) {
		temp += "[" + baseNetwork[i];
	}
	prompt("Saved Network:",temp);
}

function loadNetwork() {
	baseNetwork = prompt("You can paste a neural network here.").split("["); 
	for (i=0;i<=gatesAmt;i++) {
		baseNetwork[i] = baseNetwork[i].split(",");
		if (baseNetwork[i][1] == "false") {
			baseNetwork[i][1] = false;
		} else if (i != 0){
			for (j=2;j<=10;j++) {
				if (j != 8) {
					if (j != 9) {
						baseNetwork[i][j] = Number(baseNetwork[i][j]);
					}
				}
			}
		}
		Number(baseNetwork[0][1]);
		Number(baseNetwork[0][2]);
	}
	player.x = -1000;
	nn[networkNumber][0][1] = -1000;
	generation = 1;
	networkNumber = 1;
	baseNetwork[0][1] = 0;
	generationFitness[0] = baseNetwork[0][1];
}

function load_level(filename) {
    // load file
    let request = new XMLHttpRequest();
    request.open('GET', `levels/${filename}.json`, false);
    request.send();
    let result = request.responseText;

    // parse
    Level = JSON.parse(result);
    canvas.width = Level.width;
    canvas.height = Level.height;
    player.x = Level.spawn_x;
    player.y = Level.spawn_y;
}