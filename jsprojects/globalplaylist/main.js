let player;
const BACKEND_URL = "https://global-playlist.onrender.com";
const socket = io(BACKEND_URL);
debug();

// youtube api calls this when ready
function onYouTubeIframeAPIReady() {
    syncWithServer();
}

async function syncWithServer() {
    const response = await fetch(`${BACKEND_URL}/state`);
    const state = await response.json();

    updateUI(state);
}

function formatTime(ms) {
    if (!ms) return "-";
    const date = new Date(ms);
    
    // Formats date as "Feb 23"
    const datePart = date.toLocaleDateString([], { 
        day: 'numeric',
        month: 'short', 
        year: 'numeric'
    });
    
    // Formats time as "10:52 PM"
    const timePart = date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
    });

    return `${datePart}, ${timePart}`;
}

function formatFullDuration(totalSeconds) {
    if (totalSeconds <= 0) return "0s";

    const d = Math.floor(totalSeconds / (3600 * 24));
    const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);

    const parts = [];
    if (d > 0) parts.push(`${d}d`);
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0 || parts.length === 0) parts.push(`${s}s`);

    return parts.join(' ');
}

function updateUI(state) {
    const statusEl = document.getElementById('status');
    const upcomingList = document.getElementById('upcoming-list');
    
    // 1. Current Video Info
    if (state.type === 'video' && state.current) {
        statusEl.innerHTML = `Now playing: <span class="title">${state.current.title}</span> by <span class="author">${state.current.channel}</span>`;
        document.getElementById('start-time').innerText = formatTime(state.current.startTime);
        document.getElementById('end-time').innerText = formatTime(state.current.endTime);
        loadVideo(state.current.youtube_id, state.current.seekTo);
    } else {
        document.getElementById('start-time').innerText = "-";
        document.getElementById('end-time').innerText = "-";
    }

    // 2. Queue Stats
    document.getElementById('queue-count').innerText = state.totalQueued || 0;
    document.getElementById('full-queue-finish').innerText = state.overallEndTime ? formatTime(state.overallEndTime) : "-";
    document.getElementById("played-count").innerHTML = state.totalPlayed;

    // 3. Upcoming List
    upcomingList.innerHTML = "";
    if (state.upcoming && state.upcoming.length > 0) {
        state.upcoming.forEach(vid => {
            const li = document.createElement('p');
            li.innerHTML = `<span class="timestamp">[${formatTime(vid.startTime)}]</span> ${vid.title}`;
            upcomingList.appendChild(li);
        });
    } else {
        upcomingList.innerHTML = "<p>No videos scheduled</p>";
    }

    // 4. Streak Length
    streakElement = document.getElementById("uninterrupted-time");
    if (!state.streakStart) {
        streakElement.innerText = "0s";
    } else {
        const now = Date.now();
        const diffInSeconds = Math.floor((now - state.streakStart) / 1000);
        streakElement.innerText = diffInSeconds > 0 ? formatFullDuration(diffInSeconds) : "0s";
    }
}

function loadVideo(id, startSeconds) {
    if (!player) {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: id,
            playerVars: {
                'start': startSeconds,
                'autoplay': 1,
                'mute': 1,
                'rel': 0,
                'controls': 0,
                'disablekb': 1,
                'modestbranding': 1
            },
            events: {
                'onReady': (e) => {
                    e.target.mute();
                    e.target.playVideo();
                },
                'onStateChange': onPlayerStateChange
            }
        });
    } else {
        player.loadVideoById({
            videoId: id,
            startSeconds: startSeconds
        });
    }
}

function onPlayerStateChange(event) {
    // check if the video has ended (0 = ended)
    if (event.data === YT.PlayerState.ENDED) {
        console.log("Video finished! Fetching next item from timeline...");
        syncWithServer();
    }
}

function unmute() {
    if (player) {
        player.unMute();
        player.setVolume(80);
        document.getElementById('unmute-btn').style.display = 'none';
    }
}

// listen for sync signals from other users
socket.on('sync', () => {
    // first check number of videos in queue
    const queue_len = Number(document.getElementById("queue-count").innerHTML);

    // only sync immediately if queue is empty
    if (queue_len < 1) {
        console.log("Playlist updated by another user. Syncing...");
        syncWithServer();
    }
});

// submit new video
async function submitVideo() {
    const url = document.getElementById("videoUrl").value;
    const res = await fetch(`${BACKEND_URL}/add-video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
    });
    const data = await res.json();
    if (data.error) {
        alert(data.error);
    } else {
        alert("Video added succesfully!");
    }
    
    document.getElementById('videoUrl').value = '';
}

// put placeholder text on page even if there is no connection
function debug() {
    document.getElementById("status").innerHTML = `Now playing: <span class="title">Debug Video</span> by <span class="author">Debug Channel</span>`;

    document.getElementById("start-time").innerHTML = "Feb 24, 2026, 15:36";
    document.getElementById("end-time").innerHTML = "Feb 24, 2026, 16:40";
    document.getElementById("queue-count").innerHTML = "42";
    document.getElementById("full-queue-finish").innerHTML = "Mar 4, 2026, 05:25";

    document.getElementById("upcoming-list").innerHTML += `<p><span class="timestamp">[Feb 26, 2026, 16:34]</span> A YouTube Video</p>`;
    document.getElementById("upcoming-list").innerHTML += `<p><span class="timestamp">[Feb 26, 2026, 16:34]</span> A YouTube Video</p>`;
    document.getElementById("upcoming-list").innerHTML += `<p><span class="timestamp">[Feb 26, 2026, 16:34]</span> A YouTube Video</p>`;
    document.getElementById("upcoming-list").innerHTML += `<p><span class="timestamp">[Feb 26, 2026, 16:34]</span> A YouTube Video with a very long name that is probably not going to fit on a single line</p>`;
    document.getElementById("upcoming-list").innerHTML += `<p><span class="timestamp">[Feb 26, 2026, 16:34]</span> A YouTube Video with a very long name that is probably not going to fit on a single line</p>`;
}