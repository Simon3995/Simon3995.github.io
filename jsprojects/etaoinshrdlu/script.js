var alphabet = "abcdefghijklmnopqrstuvwxyz";
var text = "";
var histogram = [];
var highestValue = 0;

var trailIndex = [];
for (i=0; i<26; i++) {
	trailIndex[alphabet[i]] = i;
}
var trailFreq = [];
for (i=0; i<26; i++) {
	trailFreq[alphabet[i]] = 0;
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

clearHist();

function hist() {
	text = document.getElementById("textbox").value;
	text = text.toLowerCase();
	
	clearHist();
	for (i=0; i<text.length; i++) {
		if (alphabet.includes(text[i])) {
			histogram[alphabet.indexOf(text[i])].freq++;
		}
	}
	
	histogram.sort(function(x,y) {
		return y.freq - x.freq;
	});
}

function update() {
	//trail position
	for (i=0; i<26; i++) {
		trailIndex[alphabet[i]] = (realIndex(alphabet[i])+3*trailIndex[alphabet[i]])/4;
	}
	
	//trail freq
	for (i=0; i<26; i++) {
		trailFreq[alphabet[i]] = (histogram[i].freq+6*trailFreq[alphabet[i]])/7;
	}
	
	drawHist();
	window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);

function clearHist() {
	histogram = [];
	for (i=0; i<26; i++) {
		histogram[i] = {
			letter: alphabet[i],
			freq: 0,
		}
	}
}

function drawHist() {
	ctx.clearRect(0,0,c.width,c.height);
	ctx.fillStyle = "#AED8EC";
	
	if (text != "") {
		highestValue = 0;
		for (j=0; j<26; j++) {
			if (trailFreq[alphabet[j]] > highestValue) {
				highestValue = trailFreq[alphabet[j]];
			}
		}
	}
	if (highestValue < 1) highestValue = 1;
	//draw bars
	for (j=0; j<26; j++) {
		ctx.fillRect(trailIndex[histogram[j].letter]*c.width/26+c.width/130,c.height-20,0.8*c.width/26,-((c.height-20)/highestValue)*trailFreq[alphabet[j]]);
	}
	
	ctx.fillStyle = "#EEFCFF";
	ctx.font = "15px Arial";
	//draw letters
	for (j=0; j<26; j++) {
		ctx.fillText(histogram[j].letter.toUpperCase(), 8+trailIndex[histogram[j].letter]*c.width/26+c.width/130,c.height-5);
	}
}

function realIndex(str) {
	for (k=0; k<26; k++) {
		if (histogram[k].letter == str) return k;
	}
	return -1;
}

window.addEventListener("keypress", function(e) {
	if (e.code.includes("Key")) {
		playMultiSound("pop");
	}
}, false);