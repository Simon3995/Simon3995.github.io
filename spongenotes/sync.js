// fetches and returns the data in objects.json
async function fetch_objects() {
    try {
        const res = await fetch("objects.json");
        const data = await res.json();
        const board = document.getElementById("board");
        Objects = data;
        for (let i=0; i<data.length; i++) {
            Objects[i] = new TextBox().from_json(data[i]);
        }
    } catch (e) {
        console.error("Error fetching objects:", e);
    }
}

// replaces the contents of objects.json
async function push_objects(objects) {
    try {
        const response = await fetch("save.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objects)
        });
        return response;
    } catch (e) {
        console.error("Error pushing objects:", e);
    }
}

// checks version.txt and fetches objects if the client is behind
async function check_version() {
    try {
        const res = await fetch("version.php");
        const newVersion = await res.text();
        
        if (newVersion != currentVersion) {
            currentVersion = newVersion;
            await fetch_objects(); // only fetch if there's new data
        }
    } catch (e) {
        console.error("Error checking version:", e);
    }
}

// check for new version often
// setInterval(function () {
//     check_version();
// }, 500);