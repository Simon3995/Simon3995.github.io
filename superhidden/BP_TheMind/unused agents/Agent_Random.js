class Agent {
    update_game_state(private_game_state) {
        return;
    }

    get_action() {
        if (Math.random() > 0.5) return "shuriken";
        return ["wait", "play", "shuriken"][Math.floor(Math.random() * 3)];
    }

    get_eagerness() {
        return Math.random();
    }

    reflect(actions) {
        //console.log(actions);
        return;
    }
}