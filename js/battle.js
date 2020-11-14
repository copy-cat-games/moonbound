// a battle generator. just begging for a fight
// how animations are handled... not my problem for now

function* Battle(enemies, player, reward) {
    var players_turn = true;
    var state        = null;
    
    while (!state) {
        if (players_turn) {
            // player attacks
            var cards = yield {
                enemies: enemies,
                player: player,
            };
            
            if (cards.primary == null) {
                throw new Error("cards is not valid! no primary card played!");
            }
            
            // update the enemies
            enemies = enemies.filter(enemy => {
                return enemy.health > 0;
            });
            
            if (enemies.length == 0) {
                state = "won";
            }
        } else {
            // enemy (or enemies) strikes
            enemies.forEach(enemy => {
                enemies.attack(player);
            });
            
            if (player.health == 0) {
                state = "lost";
            }
        }
        
        // toggle
        player_turn = !players_turn;
    }
    
    return state;
}

// example battle data
var example_battle = {
    enemy: null,
};