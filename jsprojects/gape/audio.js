let channel_max = 10;
let channels = [];

for (let i=0; i<channel_max; i++) {
	channels[i] = [];
	channels[i]['channel'] = new Audio();
	channels[i]['finished'] = -1;
}

function play_multi_sound(s) {
    for (let i=0; i<channels.length; i++) {
		let now = new Date();
		if (channels[i]['finished'] < now.getTime()) {
			channels[i]['finished'] = now.getTime() + document.getElementById(s).duration*1000;
			channels[i]['channel'].src = document.getElementById(s).src;
			channels[i]['channel'].load();
			channels[i]['channel'].play();
			break;
		}
	}
}