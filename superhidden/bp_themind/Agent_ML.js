class Agent {

    /*
    NOTES:
    - currently we train the network at random intervals. Better logic needed?
    - better integration for player_id needed
    */

    constructor() {
        this.state_size = Math.floor(Math.random() * 400) + 100;
        this.bias = init_vector_rand(this.state_size);
        this.bias_out = init_vector_rand(3);
        this.W_in = init_matrix_rand(7, this.state_size);
        this.W_x = init_matrix_rand(this.state_size, this.state_size);
        this.W_out = init_matrix_rand(this.state_size, 3);
        this.state = init_vector_rand(this.state_size);
        this.memory = [];
        this.latest_out = [0, 0, 0];
        this.learn_factor = Math.max(0.1, Math.random()) / 1;
        this.time_f = normal_sample(1, 0.156);
    }

    update_game_state(private_game_state) {
        const game = private_game_state;
        game.time_since_last_card *= this.time_f;
        this.game = game;
        const input_vector = [
            Math.tanh(game.time_since_last_card/100 - 1),
            Math.min(...game.hand)/Settings.decksize * 2 - 1,
            game.top_card/Settings.decksize * 2 - 1,
            game.level/Settings.levels * 2 - 1,
            game.total_cards/64 * 2 - 1,
            game.lives/6 * 2 - 1,
            game.shurikens/3 * 2 - 1
        ];
        const term1 = m_multiply(this.W_x, this.state);
        const term2 = m_multiply(this.W_in, input_vector);
        const sum = v_add(v_add(term1, term2), this.bias);
        this.state = v_apply_func(sum, Math.tanh);
        // set player_id
        this.id = game.player_id;
    }

    get_action() {
        Time++;
        const out = v_add(this.bias_out, m_multiply(this.W_out, this.state));
        this.latest_out = out;

        // Whatever the largest output is, we pick it
        if (out[0] >= out[1] && out[0] >= out[2]) {
            return "wait";
        } else if (out[1] >= out[2]) {
            return "play";
        }
        return "shuriken";
    }

    reflect(actions) {
        // add this to memory
        const expected = this.get_desired(actions);
        this.memory.push([this.state, this.latest_out, expected]);

        // we train
        this.train();

        this.memory = [];
    }

    get_eagerness() {
        return 0;
    }

    // train the network based on its current memory
    train() {
        let weight_adjust = init_matrix(this.state_size, 3, 0);
        let bias_adjust = init_vector(3, 0);
        // for each item in memory
        for (const mem of this.memory) {
            const mem_state = mem[0];
            const mem_out = mem[1];
            const mem_exp = mem[2];
            for (const row in this.bias_out) {
                const derivative_C_y = 2 * Math.tanh(mem_out[row]) - 2 * mem_exp[row];
                const derivative_y_z = Math.cosh(mem_out[row]) ** -2;
                for (const column in this.state) {
                    const derivative_z_W = mem_state[column];
                    weight_adjust[column][row] -= this.learn_factor * derivative_C_y * derivative_z_W * derivative_y_z;
                }
                bias_adjust[row] -= this.learn_factor * derivative_C_y * derivative_y_z;
            }
        }
        this.W_out = m_add(weight_adjust, this.W_out);
        this.bias_out = v_add(bias_adjust, this.bias_out);

        // to avoid the memory getting infinitely large, we delete some of it
        // this.memory = this.memory.slice(this.memory.length / 2);
    }

    // based on actions this round, we try to figure out what the optimal play would've been
    get_desired(actions) {
        /*
        We check for some specific scenarios and check what we should've done
        1- everyone waited and there are still available shurikens
            - We should use a shuriken
        2- we played a card that was not the lowest
            - We should wait
        3- a card was played which is higher than yours
            - We should play
        4- everyone waited
            - We should play
        
        last- other/no mistakes
            - Our output was probably fine
        */

        // scenario 1
        const all_waited = actions.every(action => action.action === "wait");
        if (all_waited && this.game.shurikens > 0) {
            return [-1, -1, 1];
        }

        // scenario 2
        if (actions[this.id].valid === false) return [1, -1, -1];

        // scenario 3
        for (const action of actions) {
            if (action.valid === false && action.skipped_players.find(player => player && player.id === this.id)) {
                return [-1, 1, -1];
            }
        }

        // scenario 4
        if (all_waited) {
            return [-1, 1, -1];
        }

        // last scenario
        switch (actions[this.id].action) {
            case "wait":
                return [1, -1, -1];
                break;
            case "play":
                return [-1, 1, -1];
                break;
            case "shuriken":
                return [-1, -1, 1];
                break;
        }

        // If no case matched, throw an error
        throw "No available desired case, actions provided:\n" + JSON.stringify(actions, 1, 4);

    }
}
