let Game;
let Players;
let Settings = {
    decksize: 250,
    levels: 16,
};
let Detailed_Log = false;
let Time = 0;
let Progress = document.getElementById("progress");

// repeat game n times and return an array of scores
const play_rounds = function (n) {
    let scores = [];
    let patiences = [[], [], [], []];
    for (let i = 0; i < n; i++) {
        scores.push(play_game());

        patiences[0].push(Players[0].patience);
        patiences[1].push(Players[1].patience);
        patiences[2].push(Players[2].patience);
        patiences[3].push(Players[3].patience);
    }
    return { scores, patiences };
}

// deal n cards to each player for level n
const deal_cards = function (level) {
    let deck = [...Array(Settings.decksize + 1).keys()];
    deck.shift();
    shuffle(deck);
    for (const id in Players) {
        // empty hands
        Game.hands[id] = [];

        // deal n cards for level n
        for (let i = 0; i < level; i++) {
            Game.hands[id].push(deck.pop());
        }

        // sort hands
        Game.hands[id].sort((a, b) => a - b);
    }
}

// full reset game state object
const reset_game_state = function () {
    Game = {
        players: 4,
        lives: 4,
        shurikens: 1,
        top_card: 0,
        level: 0,
        time_since_last_card: 0,
        hands: [[], [], [], []],
        lowest_possible: [0, 0, 0, 0],
        shuriken_requests: [false, false, false, false],
        eagerness: [0, 0, 0, 0],
    };
}

// summons 4 new agents
const summon_players = function () {
    Players = [
        new Agent(),
        new Agent(),
        new Agent(),
        new Agent()
    ];
}

// returns game state with only target player's hand visible
const privatize_game_state = function (player_id) {
    let prv_state = copy(Game);
    let cards = 0;
    for (const hand of prv_state.hands) cards += hand.length;
    prv_state.hand = copy(prv_state.hands[player_id]);
    delete prv_state.hands;
    prv_state.player_id = player_id;
    prv_state.total_cards = cards;
    return prv_state;
}

// how many cards are still in hands
const cards_amt = function () {
    let amt = 0;
    for (const hand of Game.hands) {
        amt += hand.length;
    }
    return amt;
}

// main event loop
const play_game = function () {
    reset_game_state();

    // inform agents of reset game state
    if (Detailed_Log) console.log("Privatizing game states and informing agents");
    for (const id in Players) {
        let priv_state = privatize_game_state(id);
        Players[id].update_game_state(priv_state);
    }

    // loop over levels
    for (let i = 1; i <= Settings.levels; i++) {
        //console.log("%cStarting level " + i, "color:aqua");
        Game.level = i;
        Game.top_card = 0;
        Game.time_since_last_card = 0;
        deal_cards(i);

        // rewards
        if (i % 3 == 0) {
            //console.log("%cReward: +1 Shuriken", "color:lawngreen");
            Game.shurikens++;
        } else if (i % 3 == 1) {
            //console.log("%cReward: +1 Life", "color:lawngreen");
            Game.lives++;
        }

        // loop until cards or lives have been depleted
        while (Game.lives && cards_amt()) {
            let actions = [];
            for (const id in Players) {
                actions[id] = {
                    player: id,
                    valid: true,
                    action: null,
                    played_card: null,
                    skipped_players: [],
                    skipped_cards: [],
                    shuriken_cards: []
                };
                let agent = Players[id];
                agent.update_game_state(privatize_game_state(id));
                Game.eagerness[id] = agent.get_eagerness();
                let action = agent.get_action();
                if (Detailed_Log) console.log(`Player ${id} chose action ${action}`);

                Game.shuriken_requests[id] = false;

                actions[id].action = action;
                
                if (Game.time_since_last_card > 100 * Settings.decksize) action = "play";

                if (Game.time_since_last_card > Settings.decksize * 100) actions[id].action = action = "play";

                switch (action) {
                    case "wait":
                        break;
                    case "play":
                        if (Game.hands[id].length < 1) {
                            if (Detailed_Log) console.log(`Player ${id} doesn't have any cards.`);
                            break;
                        }

                        // get played card
                        const card = Game.hands[id].shift();
                        Game.top_card = card;
                        Game.time_since_last_card = 0;
                        actions[id].played_card = card;
                        if (Detailed_Log) console.log(`Card ${card} was played.`);

                        // check if any other player has lower cards
                        const is_valid = Game.hands.every(
                            hand => hand.every(
                                card => card > Game.top_card
                            )
                        );

                        // if mistake, remove all lower cards from hands
                        if (!is_valid) {
                            actions[id].valid = false;
                            Game.lives--;
                            //console.log(`%cInvalid card played! (${Game.lives} lives left)`, "color:lightcoral");
                            // check if lives depleted
                            if (Game.lives < 1) {
                                //console.log(`Game over at level ${Game.level}.`)
                                return Game.level;
                            }

                            // remove all lower (skipped) cards
                            for (const player in Players) {
                                if (Game.hands[player][0] < card) {
                                    actions[id].skipped_players[player] = {
                                        id: player,
                                        cards: []
                                    };
                                }
                                while (Game.hands[player][0] < card) {
                                    actions[id].skipped_cards.push(Game.hands[player][0]);
                                    actions[id].skipped_players[player].cards.push(Game.hands[player][0]);
                                    Game.hands[player].shift();
                                }
                            }
                        }
                        break;
                    case "shuriken":
                        if (Detailed_Log) console.log(`Player ${id} has requested a shuriken.`)
                        Game.shuriken_requests[id] = true;
                        break;
                }
            }

            Game.time_since_last_card++;

            // check if all agents request shuriken
            if (Game.shurikens && Game.shuriken_requests.every(r => r)) {
                Game.shurikens--;
                Game.time_since_last_card = 0;
                //console.log("%cPlayers agreed to play a shuriken.", "color:lawngreen");
                //console.log(`%c${Game.shurikens} shurikens left.`, "color:lawngreen");

                // for all players who still have cards
                for (const hand in Game.hands) {
                    actions[Game.players - 1].shuriken_cards[hand] = Infinity;
                    if (Game.hands[hand].length) {
                        const shuriken_card = Game.hands[hand].shift();
                        Game.lowest_possible[hand] = shuriken_card + 1;
                        actions[Game.players - 1].shuriken_cards[hand] = shuriken_card;
                    }
                }
                for (const id in Players) {
                    Game.eagerness[id] = 0;
                    Game.shuriken_requests[id] = false;
                }
            }
            //console.log(actions);
            for (const agent of Players) {
                agent.reflect(actions);
            }
        }
    }
    
    return Game.level;
}

summon_players();
reset_game_state();