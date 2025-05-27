const load_file = function(filename) {
    let request = new XMLHttpRequest();
    request.open('GET', `maps/${filename}.map`, false);
    request.send();
    let result = request.responseText.split("&");
    Map = JSON.parse(result[0]);
    
    document.getElementById("title0").innerHTML = Map.title[0];
    document.getElementById("title1").innerHTML = Map.title[1];

    bg_chunk = calculate_chunks({"white":["boundary"]}, ["white"]);

    update_map();
    chunkmenu = [];
    update_ui();
}