let player;
const BACKEND_URL = "https://global-playlist.onrender.com";
const socket = io(BACKEND_URL);

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

function updateUI(state) {
    const statusEl = document.getElementById('status');
    const upcomingList = document.getElementById('upcoming-list');
    
    // 1. Current Video Info
    if (state.type === 'video' && state.current) {
        statusEl.innerText = `Now playing: ${state.current.title}`;
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

    // 3. Upcoming List
    upcomingList.innerHTML = "";
    if (state.upcoming && state.upcoming.length > 0) {
        state.upcoming.forEach(vid => {
            const li = document.createElement('li');
            li.innerText = `[${formatTime(vid.startTime)}] ${vid.title}`;
            upcomingList.appendChild(li);
        });
    } else {
        upcomingList.innerHTML = "<li>No videos scheduled</li>";
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
        
        // small delay to let the database/server catch up if needed
        setTimeout(() => {
            syncWithServer();
        }, 1000);
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
    console.log("Playlist updated by another user. Syncing...");
    syncWithServer();
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
    if (data.error) alert(data.error);
    document.getElementById('videoUrl').value = '';
}