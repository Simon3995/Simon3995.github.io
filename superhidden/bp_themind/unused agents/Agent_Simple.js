class Agent {
    update_game_state(private_game_state) {
        this.state = copy(private_game_state);
    }

    get_action() {
        const time = this.state.time_since_last_card;
        if (time > 10 && this.state.shurikens) {
            return "shuriken";
        }
        if (this.state.hand.length && 2 * Math.random() ** 9 * time > this.state.hand[0] - this.state.top_card) {
            return "play";
        }
        return "wait";
    }

    get_eagerness() {
        return Math.random();
    }

    reflect(actions) {
        return;
    }
}