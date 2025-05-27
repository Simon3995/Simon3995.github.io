let info = document.getElementById("info");
let socket = new WebSocket("wss://websocket-server-test-440u.onrender.com");
let list = [];
info.innerHTML = "Connecting... Please wait.";

socket.onopen = e => {
    info.innerHTML = "Connected!";
}

socket.onclose = e => {
    info.innerHTML = "Connection closed.";
}

socket.onerror = e => {
    info.innerHTML = "Connection error occurred.";
}

socket.onmessage = e => {
    reader = new FileReader();
    reader.readAsText(e.data);
    reader.onload = x => {
        list = JSON.parse(reader.result);
    }
}