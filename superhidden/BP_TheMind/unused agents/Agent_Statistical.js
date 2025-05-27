class Agent {
    constructor() {
        this.game = {};
    }
    
    update_game_state(private_game_state) {
        this.game = private_game_state;
        return;
    }

    get_action() {
        // amount of cards still in play
        let amt = cards_amt();

        // average distance between two consecutive cards left in play
        let spread = (Settings.decksize - this.game.top_card) / amt;
        
        // distance between top card and my lowest card
        let dist = this.game.hand[0] - this.game.top_card;
        
        let speed_factor = 0.002;

        if (spread / (dist * speed_factor) < this.game.time_since_last_card) {
            return "play";
        } else {
            return "wait";
        }
    }

    get_eagerness() {
        return Math.random();
    }

    reflect(actions) {
        // the statistical agent cannot reflect
        return;
    }
}