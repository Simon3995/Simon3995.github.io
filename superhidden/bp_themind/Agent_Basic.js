class Agent {
    constructor() {
        this.game = {};
        this.patience = Math.random() * 30;
        this.shuriken_patience = Math.random() * 30;
        this.learn_factor = 0.01;
        this.shuriken_learn_factor = 0.01;
        this.time_f = normal_sample(1, 0.156);
    }

    update_game_state(private_game_state) {
        // 10% randomness in time since last card
        private_game_state.time_since_last_card *= this.time_f;

        this.game = private_game_state;
    }

    get_action() {
        const time = this.game.time_since_last_card;
        
        // check if shuriken threshold has been reached
        if (time > this.shuriken_patience && this.game.shurikens) {
            return "shuriken";
        }

        const diff = this.game.hand[0] - this.game.top_card;                // diff. between own lowest card and top card on deck
        const cards = this.game.total_cards;                                // how many cards in all players' hands
        const exp_diff = (Settings.decksize - this.game.top_card) / cards;  // expected average distance between two subsequent cards

        if (time > this.patience * diff / exp_diff) {
            return "play";
        }

        return "wait";
    }

    // not implemented in this version
    get_eagerness() {
        return Math.random();
    }

    reflect(actions) {
        // i played too soon => patience up
        if (actions[this.game.player_id].valid === false) {
            let action = actions[this.game.player_id];
            this.patience += (action.played_card - action.skipped_cards.sort((a,b)=>a-b)[0]) * this.learn_factor;
        }
        
        // someone else played too soon and skipped me => patience down
        for (const action of actions) {
            if (action.skipped_players[this.game.player_id]) {
                this.patience -= (action.played_card - action.skipped_players[this.game.player_id].cards.sort((a,b)=>a-b)[0]) * this.learn_factor;
            }
        }

        // a shuriken was played and my card was lowest => patience down and shuriken patience up
        if (actions[3].shuriken_cards.length) {
            if (actions[3].shuriken_cards[this.game.player_id] === Math.min(...actions[3].shuriken_cards)) {
                this.patience -= this.learn_factor;
                this.shuriken_patience += this.shuriken_learn_factor;
            }
        }

        // count how many players requested shuriken
        let requests = 0;
        for (const player of actions) {
            if (player.actions === "shuriken") requests++;
        }

        // i requested shuriken but >=half of players didn't => shuriken patience up
        if (requests <= 2 && actions[this.game.player_id].action === "shuriken") {
            this.shuriken_patience += this.shuriken_learn_factor;
        }

        // >=half of players requested shuriken but i didn't => shuriken patience down
        if (requests >= 2 && actions[this.game.player_id].action !== "shuriken") {
            this.shuriken_patience -= this.shuriken_learn_factor;
        }

        // neither patience may be negative
        this.patience = Math.max(0, this.patience);
        this.shuriken_patience = Math.max(0, this.shuriken_patience);
    }
}