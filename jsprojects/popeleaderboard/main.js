// synchronous xml http request on the main thread lmao I don't even care
const load_file = function(path) {
    let request = new XMLHttpRequest();
    request.open('GET', path, false);
    request.send();
    return request.responseText;
}

const date_string = function(date) {
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
}

const years_since = function(date) {
    const input_date = new Date(date);
    const current_date = new Date();
    const diff_in_ms = current_date - input_date;
    return diff_in_ms / (1000 * 60 * 60 * 24 * 365.25);
}

const build_table = function(data) {
    const table_div = document.getElementById("table");
    let str = "<table>";
    str += "<tr>";
    str += "<th>#</th>";
    str += "<th>Name</th>";
    str += "<th>Papacy Began</th>";
    str += "<th>Papacy Ended</th>";
    str += "<th>Reign</th>";
    str += "</tr>";
    
    for (let i=0; i<data.length; i++) {
        const start_date = new Date(data[i][6]);
        const end_date = new Date(data[i][7]);
        const approx = ["Peter","Linus","Anacletus"].includes(data[i][1]);
        
        str += (data[i][7] === "NA") ? '<tr id="current">' : "<tr>";
        str += `<td>${i+1}</td>`;
        str += `<td>${data[i][1]}</td>`;

        if (data[i][7] === "NA") {
            // current pope
            str += `<td>${date_string(start_date)}</td>`;
            str += `<td>-</td>`;
            str += `<td>${humanizeDuration(new Date() - start_date, { units: ["y", "mo", "d"], round: true })}</td>`;
        } else {
            if (approx) {
                str += `<td>${start_date.getFullYear()}</td>`;
                str += `<td>${end_date.getFullYear()}</td>`;
                str += `<td>${humanizeDuration(end_date - start_date, { units: ["y"], round: true })}</td>`;
            } else {
                str += `<td>${date_string(start_date)}</td>`;
                str += `<td>${date_string(end_date)}</td>`;
                str += `<td>${humanizeDuration(end_date - start_date, { units: ["y", "mo", "d"], round: true })}</td>`;
            }
        }

        str += "</tr>";
    }

    str += "</table>";
    table_div.innerHTML = str;
}

const to_ordinal = function(num) {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = num % 100;
    const suffix = (value > 10 && value < 20) ? "th" : suffixes[(value % 10)] || "th";
    return num + suffix;
}

const main = function() {
    const raw_data = load_file("popes.csv");
    const parsed_data = CSV.parse(raw_data);
    parsed_data.shift(); // remove headers
    
    // current pope
    parsed_data.push([267,"Leo XIV","Leo",14,"NA","1955-09-14T00:00:00Z","2025-05-08T00:00:00Z","NA",69,"NA",years_since("2025-05-08T00:00:00Z")]);
    
    parsed_data.sort((a, b) => b[10] - a[10]);
    build_table(parsed_data);
    console.log(parsed_data);
}

main();