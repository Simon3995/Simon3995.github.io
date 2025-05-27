// number of sound channels
var channel_max = 100;
audiochannels = new Array();
for (a=0; a < channel_max; a++) {
	audiochannels[a] = new Array();
	audiochannels[a]['channel'] = new Audio();
	audiochannels[a]['finished'] = -1;
}

// play a sound
function playMultiSound(s, instrument) {
	for (let a = 0; a < audiochannels.length; a++) {
		thistime = new Date();
		if (audiochannels[a]['finished'] < thistime.getTime()) {
			audiochannels[a]['finished'] = thistime.getTime() + 1000;
			audiochannels[a]['channel'].src = "sounds/" + instrument + "/" + instrument + s + ".mp3";
			audiochannels[a]['channel'].volume = 1;
			audiochannels[a]['channel'].load();
			audiochannels[a]['channel'].play();
			break;
		}
	}
}

/*********/

var currentNote = -1;

function updateNote(note, forcePlay) {
	if ((note != currentNote && mousedown) || forcePlay) playMultiSound(note, "piano");
	currentNote = note;
}