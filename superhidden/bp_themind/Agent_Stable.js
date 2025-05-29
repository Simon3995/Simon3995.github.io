class Agent {
    constructor() {
        this.game = {};
        this.speed = 0.01;
        this.time_f = normal_sample(1, 0.156);
    }
    
    update_game_state(private_game_state) {
        this.game = private_game_state;
        this.game.time_since_last_card *= this.time_f;
        return;
    }

    get_action() {
        let time = this.game.time_since_last_card;
        let card = this.game.hand[0];

        if (time >= card / (this.speed * Settings.decksize)) {
            return "play";
        } else {
            return "wait";
        }
    }

    get_eagerness() {
        return Math.random();
    }

    reflect(actions) {
        // the stable agent cannot reflect
        return;
    }
}