let channel_max = 50;
audiochannels = new Array();
for (a=0; a < channel_max; a++) {
	audiochannels[a] = new Array();
	audiochannels[a]['channel'] = new Audio();
	audiochannels[a]['finished'] = -1;
}

const playMultiSound = function(s) {
	for (let a = 0; a < audiochannels.length; a++) {
		thistime = new Date();
		if (audiochannels[a]['finished'] < thistime.getTime()) {
			audiochannels[a]['finished'] = thistime.getTime() + 1000;
			audiochannels[a]['channel'].src = "sounds/" + s + ".wav";
			audiochannels[a]['channel'].load();
			audiochannels[a]['channel'].play();
			break;
		}
	}
}

const playSound = function(s) {
	switch (s) {
		case "capture":
			s += Math.floor(Math.random() * 5);
			playMultiSound(s);
			break;
		case "move":
			s += Math.floor(Math.random() * 3);
			playMultiSound(s);
			break;
		case "select":
			s += Math.floor(Math.random() * 1);
			playMultiSound(s);
			break;
	}
}