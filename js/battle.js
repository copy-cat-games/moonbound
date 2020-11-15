// a battle generator. just begging for a fight
// how animations are handled... not my problem for now

function* Battle(enemies, player, reward) {
    var players_turn = true;
    var state        = null;
    var turns        = 0;
    
    while (!state) {
        if (players_turn) {
            turns += 1;
            // player attacks
            var cards = yield {
                enemies: enemies,
                player: player,
            };
            
            Engine.notify("this is your " + (function(n) {
                // lol ciac wtf
                if (Math.floor(n / 10) == 1) {
                    return n + "th";
                }
                switch (n % 10) {
                    case 1:
                        return n + "st";
                    case 2:
                        return n + "nd";
                    case 3:
                        return n + "rd";
                    default:
                        return n + "th";
                }
            })(turns) + " turn.");
            
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