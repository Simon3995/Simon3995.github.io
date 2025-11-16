function colCheck(shapeA, shapeB) {
	let vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2));
	let vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2));
		
	let hWidths = Math.abs(shapeA.width / 2) + Math.abs(shapeB.width / 2);
	let hHeights = Math.abs(shapeA.height / 2) + Math.abs(shapeB.height / 2);
	let colDir = null;

	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
		
		if (Level.boxes[y].type == 0) {
				
			var oX = hWidths - Math.abs(vX),
				oY = hHeights - Math.abs(vY);
			if (oX >= oY) {
				if (vY > 0) {
					colDir = "t";
					shapeA.y += oY;
				} else {
					colDir = "b";
					shapeA.y -= oY;
				}
			} else {
				if (vX > 0) {
					colDir = "l";
					shapeA.x += oX;
				} else {
					colDir = "r";
					shapeA.x -= oX;
				}
			}
		
		} else if (Level.boxes[y].type == 1) {
			death();
			/* HIT AN ENEMY */
			} else if (Level.boxes[y].type == 2) {
			victory();
		}
	}
	
	return colDir;
}

function death() {
	//play_multi_sound("death");
	lastfitness = player.x;
	nn[networkNumber][0][2] = deathwall;
	deathwall = -300;
	player.velX = 0;
	player.velY = 0;
	
	for (k = 1; k <= blood.amt; k++) {
	
		blood.velx[k] = (Math.random() * 30) - 15;
		blood.vely[k] = (Math.random() * 12) - 6;
		blood.vector[k] = Math.sqrt(blood.velx[k] * blood.velx[k] + 8 * blood.vely[k] * blood.vely[k]);
		if (blood.vector[k] >= blood.limit){
			blood.velx[k] *= blood.limit / blood.vector[k];
			blood.vely[k] *= blood.limit / blood.vector[k];
		}
		
		blood.x[k] = player.x;
		blood.y[k] = player.y;
		
	}
	
	player.x = Level.spawn_x;
	player.y = Level.spawn_y;
	genAlg();
}

function victory() {
	saveNetwork();
	//play_multi_sound("win");
	lastfitness = Level.finish_x;
	nn[networkNumber][0][2] = deathwall;
	deathwall = -300;
	player.velX = 0;
	player.velY = 0;
	player.x = Level.spawn_x;
	player.y = Level.spawn_y;
	genAlg();
}

function genAlg() {
	if (networkNumber < nnPerGen) {
		nn[networkNumber][0][1] = lastfitness; // stores fitness
		nn[networkNumber][0][2] = deathwall;
		networkNumber++; // select new network
		nn[networkNumber] = JSON.parse(JSON.stringify(baseNetwork)); // is supposed to replace the currently selected network with the baseNetwork of the generation
		for (i=1; i<=evolveAmt; i++) {
			evolveGate = (Math.floor(gatesAmt * Math.random()) + 1);
			evolve();
		} // make new variation of currently selected network
	} else {
		generation++; // start new generation
		
		lastBaseNet = baseNetwork;
		
		for (i=1;i<=nnPerGen;i++) {
			if (nn[i][0][1] > baseNetwork[0][1]) {
				baseNetwork = nn[i];
			} else if (nn[i][0][1] = baseNetwork[0][1]) {
				if (nn[i][0][2] < baseNetwork[0][2]) {
					baseNetwork = nn[i];
				}
			}
		} //Testing fitness, replace baseNetwork if another network is better
		
		if (baseNetwork == lastBaseNet) {
			continuity++;
		} else {
			continuity = 0;
			evolveAmt = 1;
		}
		
		if (continuity > 4) {
			if (evolveAmt < 10) {
				evolveAmt++;
			}
		}
		
		networkNumber = 1; // start working with the first network again
		nn[networkNumber] = JSON.parse(JSON.stringify(baseNetwork));
	
	}
}

/*
	nn[network][gate][1] = boolean (indicates whether or not gate is functional)
	nn[network][gate][2] = inputA X
	nn[network][gate][3] = inputA Y
	nn[network][gate][4] = inputA Type
	nn[network][gate][5] = inputB X
	nn[network][gate][6] = inputB Y
	nn[network][gate][7] = inputB Type
	nn[network][gate][8] = type of gate
	nn[network][gate][9] = output type
	nn[network][gate][10] = output strength
*/
function evolve() {
	nn[networkNumber][evolveGate] = [];	
	if (Math.random() > 0.2) {
		nn[networkNumber][evolveGate][1] = true;
		nn[networkNumber][evolveGate][2] = Math.floor(Math.random() * Math.sqrt(eye.amt)) + 1;
		nn[networkNumber][evolveGate][3] = Math.floor(Math.random() * Math.sqrt(eye.amt)) + 1;
		nn[networkNumber][evolveGate][4] = Math.floor(Math.random() * 3 + 1);
		nn[networkNumber][evolveGate][5] = Math.floor(Math.random() * Math.sqrt(eye.amt)) + 1;
		nn[networkNumber][evolveGate][6] = Math.floor(Math.random() * Math.sqrt(eye.amt)) + 1;
		nn[networkNumber][evolveGate][7] = Math.floor(Math.random() * 3 + 1);
		//alert("A randomized gate has been placed in nn[" + networkNumber + "][" + evolveGate + "]");
		randomGate = Math.floor(Math.random() * 8);
		
		if (randomGate == 0) {
			nn[networkNumber][evolveGate][8] = "BUFFER";
		
		} else if (randomGate == 1) {
			nn[networkNumber][evolveGate][8] = "NOT";
		
		} else if (randomGate == 2) {
			nn[networkNumber][evolveGate][8] = "AND";
		
		} else if (randomGate == 3) {
			nn[networkNumber][evolveGate][8] = "XOR";
		
		} else if (randomGate == 4) {
			nn[networkNumber][evolveGate][8] = "NAND";
		
		} else if (randomGate == 5) {
			nn[networkNumber][evolveGate][8] = "XNOR";
		
		} else if (randomGate == 6) {
			nn[networkNumber][evolveGate][8] = "OR";
		
		} else if (randomGate == 7) {
			nn[networkNumber][evolveGate][8] = "NOR";
		
		}
		
		randomOutput = Math.random();
		if (randomOutput < 1 / 3) {
			nn[networkNumber][evolveGate][9] = "left";
		} else if (randomOutput < 2 / 3) {
			nn[networkNumber][evolveGate][9] = "right";
		} else nn[networkNumber][evolveGate][9] = "up";
		
		nn[networkNumber][evolveGate][10] = 4 * Math.random() - 2;
	} else {
		nn[networkNumber][evolveGate][1] = false;
	}	
}

function calculate_output() {
    nnOut.up = 0;
	nnOut.left = 0;
	nnOut.right = 0;
	
	for (i=1; i <= gatesAmt; i++) {
		if (nn[networkNumber][i][1]) {
			if (sensorOutput[nn[networkNumber][i][2]][nn[networkNumber][i][3]] == nn[networkNumber][i][4]) {
				gateIn.A = true;
			} else {
				gateIn.A = false;
			}
			if (sensorOutput[nn[networkNumber][i][5]][nn[networkNumber][i][6]] == nn[networkNumber][i][7]) {
				gateIn.B = true;
			} else {
				gateIn.B = false;
			}
			if (nn[networkNumber][i][8] === "BUFFER") {
				var gateOut = BUFFER(gateIn.A);
			}
			if (nn[networkNumber][i][8] === "AND") {
				var gateOut = AND(gateIn.A,gateIn.B);
			}	
			if (nn[networkNumber][i][8] === "NAND") {
				var gateOut = NAND(gateIn.A,gateIn.B);
			}	
			if (nn[networkNumber][i][8] === "NOR") {
				var gateOut = NOR(gateIn.A,gateIn.B);
			}	
			if (nn[networkNumber][i][8] === "XNOR") {
				var gateOut = XNOR(gateIn.A,gateIn.B);
			}	
			if (nn[networkNumber][i][8] === "XOR") {
				var gateOut = XOR(gateIn.A,gateIn.B);
			}	
			if (nn[networkNumber][i][8] === "OR") {
				var gateOut = OR(gateIn.A,gateIn.B);
			}	
			if (nn[networkNumber][i][8] === "NOT") {
				var gateOut = NOT(gateIn.A);
			}	
			
			if (gateOut) {	
				if (nn[networkNumber][i][9] === "up") {
					nnOut.up += nn[networkNumber][i][10];
				} else if (nn[networkNumber][i][9] === "right") {
					nnOut.right += nn[networkNumber][i][10];
				} else if (nn[networkNumber][i][9] === "left") {
					nnOut.left += nn[networkNumber][i][10];
				}
			} 
		}
	}
	
	nnUp = false;
	nnRight = false;
	nnLeft = false;
	
	if (nnOut.right - 1 > nnOut.left) {
		nnRight = true;
	} else {
		if (nnOut.left - 1 > nnOut.right) {
			nnLeft = true;
		}
	}
	if (nnOut.up >= 1) {
		nnUp = true;
	}

    if (nnUp) {
        // up arrow
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 2;
            //play_multi_sound("jump");
        }
    }
    if (nnRight) {
        // right arrow
        if (player.velX < player.speed) {
            player.velX++;
        }
    }
    if (nnLeft) {
        // left arrow
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }
}

function move_deathwall() {
    deathwall += 3;
	if (deathwall >= player.x) death();
}

function handle_player_physics() {
    player.velX *= friction;
	player.velY += gravity;
    
	player.grounded = false;
	
	for (y = 0; y < Level.boxes.length; y++) {
        
		let dir = colCheck(player, Level.boxes[y]);
		
		if (dir === "l" || dir === "r") {
			player.velX = 0;
			if(!(nnUp)) {player.jumping = false;}
		} else if (dir === "b") {
			player.grounded = true;
			if(!keys[38]){player.jumping = false;}
		} else if (dir === "t") {
			player.velY *= -1;
		}
	}
    
	if (player.grounded) {
		player.velY = 0;
	}
	
	if (player.y > canvas.height) {
		death();
	}
    
	player.x += player.velX;
	player.y += player.velY;
}