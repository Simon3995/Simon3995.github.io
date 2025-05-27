const improvement_data = function(n) {
    let data = {
        pre: [],
        post: []
    }
    
    for (let i = 0; i < n; i++) {
        console.log(`Now processing group ${i}...`);
        summon_players();
        data.pre.push(play_game());
        play_rounds(50);
        data.post.push(play_game());
    }

    Progress.innerHTML = "Finished!";

    return JSON.stringify(data);
}

const gce_data = function(n) {
    let data = {
        pre: [],
        post: []
    }
    
    for (let i=0; i<n; i++) {
        let players = [];
        for (let j=0; j<16; j++) players.push(new Agent());

        pre_scores = [];
        for (let j=0; j<4; j++) {

            console.log(`Processing group ${j} from set ${i}...`);

            Players = players.slice(4*j, 4*j + 4);
            play_rounds(50);
            pre_scores.push(play_game());
        }
        data.pre.push(Math.min(...pre_scores));

        Players = [players[0], players[4], players[8], players[12]];
        data.post.push(play_game());
    }

    return JSON.stringify(data);
}

