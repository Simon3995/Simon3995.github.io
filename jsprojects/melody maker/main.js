// define piano structure
var piano = [1,0,1,0,1,1,0,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,0,1,1];
var loopLength = 64;
// define melody
var melody = [];
resetMelody();
// define canvas
var c = document.getElementById("c");
var ctx = c.getContext("2d");
var scalar;
var horizontalStretch;
fitCanvas();
c.height = scalar * piano.length;
// more init
var input;
var input = document.createElement('input');
input.type = 'file';
var mousedown = false;
var gridX, gridY;
var erasing = false;
var time = 0;
var playing = false;

// start program loop
setInterval(function() {
	main();
}, 16);

// main loop
function main() {
	if (playing) time++;
	
	if (playing && time%8 == 0) {
		for (let i=0; i<piano.length; i++) {
			if (melody[Math.floor(time/8)][i]) {
				playMultiSound(i, "piano");
			}
		}
	}
	
	if (time > (loopLength-1)*8) {
		playing = false;
		time = 0;
	}
	
	drawCanvas();
}

// function to download data to a file, copied from https://stackoverflow.com/questions/13405129/javascript-create-and-save-file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

// load a melody
function loadMelody() {
	input.click();
}

// clear all notes
function resetMelody() {
	for (let i=0; i<loopLength; i++) {
		melody[i] = [];
		for (let j=0; j<piano.length; j++) {
			melody[i][j] = 0;
		}
	}
}

// play the melody
function play() {
	playing = true;
	time = -3;
}

// stop playing the melody
function stop() {
	playing = false;
	time = 0;
}

// transpose the whole melody up by a semitone
function transposeUp() {
	for (let i=0; i<melody.length; i++) {
		for (let j=melody[i].length-1; j>=0; j--) {
			melody[i][j] = melody[i][j-1] ? 1 : 0;
		}
	}
}

// transpose the whole melody down by a semitone
function transposeDown() {
	for (let i=0; i<melody.length; i++) {
		for (let j=0; j<melody[i].length; j++) {
			melody[i][j] = melody[i][j+1] ? 1 : 0;
		}
	}
}

input.onchange = e => { 
	var file = e.target.files[0]; 
	var reader = new FileReader();
	reader.readAsText(file,'UTF-8');
	reader.onload = readerEvent => {
		melody = JSON.parse(readerEvent.target.result); // this is the content!
		loopLength = melody.length;
		fitCanvas();
	}
}