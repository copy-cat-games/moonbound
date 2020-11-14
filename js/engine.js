var Engine = {
    panels: {
        // these appear in the same order as they do in index.html and styles.css
        battlespace: null,
        stats_panel: null,
        health_bar: null,
        energy_bar: null,
        stats_effects: null,
        cards: null,
        notifications: null,
    },
    
    buttons: {
        deck: null,
        discard: null,
        play_cards: null,
    },
    
    current_battle: null,
    selected_primary: null,
    selected_secondary: null,
    
    init: function() {
        // stuff we should do before starting the game
        
        // set up the panels
        this.panels.battlespace       = document.getElementById("battlespace");
        this.panels.stats_panel       = document.getElementById("stats-panel");
        this.panels.health_bar        = document.getElementById("health-bar");
        this.panels.energy_bar        = document.getElementById("energy-bar");
        this.panels.stats_effects     = document.getElementById("stats-effects");
        this.panels.cards             = document.getElementById("cards-panel");
        this.panels.notifications     = document.getElementById("notifications");
        
        this.buttons.deck       = document.getElementById("deck-button");
        this.buttons.discard    = document.getElementById("discard-button");
        this.buttons.play_cards = document.getElementById("play-cards-button");
    },
    
    update_stats: function(player) {
        /*
            updates the health bar, the energy bar, and the status effects.
            i probably don't have to explain where each goes.
            
            you can assume that the player is going to have the following fields:
            - max_health
            - health
            - max_energy
            - energy
            
            you can also leave out status effects for now.
            we'll get to those later.
            so just update the health and energy bars.
        */
        
        /*
            oh! and before i forget to tell you:
            the health and energy bars are <canvas> elements,
            250 pixels wide and 30 pixels tall.
            you can draw text, or fill up the bar to show health and energy...
            i assume you know how to draw on a <canvas>
        */
        
        
    },
    
    notify: function(msg) {
        var notifications = this.panels.notifications;
        notifications.insertBefore(this.create_element({
            tag: "div",
            id: null,
            class: "notification",
            contents: msg,
        }), notifications.firstChild);
        
        // check for older messages to clear
        while (notifications.lastElementChild.offsetTop > 800) {
            notifications.removeChild(notifications.lastElementChild);
        }
    },
    
    show_info: function(level) {
        // turns the notifications panel into an info panel, when the map is shown.
        
        // we first need to clear the notifications
        this.clear_notifications();
        
        // then add the informations!
        this.panels.notifications.innerHTML = ""; // finish
    },
    
    clear_notifications: function() {
        /*
            clears the notifications panel
            to do this, you must delete every child element of
            Engine.panels.notifications
        */
    },
    
    display_cards: function(hand) {
        var card_rule = find_rule(document.styleSheets[0], ".card");
        var width     = 100, height = 190;
        if (hand.length > 11) {
            width  = 45;
            height = width * 1.9;
        } else if (hand.length > 5) {
            // edit the stylesheet
            width  = (540 / hand.length) - 7;
            height = width * 1.9;
        }
        
        set_rule(card_rule, "width", width + "px");
        set_rule(card_rule, "height", height + "px");
        
        var cards_panel = this.panels.cards;
        // first clear the card panel
        while (cards_panel.firstElementChild != null) {
            cards_panel.removeChild(cards_panel.firstElementChild);
        }
        // hand is an array of cards
        hand.forEach(card => {
            var card_elt = this.create_card_elt(card);
            card_elt.addEventListener("click", (event) => {
                event.preventDefault();
                if (event.which == 1) {
                    /*
                        left click
                        - check if a primary card is selected. if not, set this as the primary card.
                        - check if this card is selected as primary/secondary. if so, deselect this card
                        - otherwise, play an error sound
                    */
                    // YandereDev style! if statements for *days*
                    if (Engine.selected_primary == null && Engine.selected_secondary != card) {
                        Engine.selected_primary = card;
                        card_elt.className = "card primary";
                        card_elt.appendChild(primary_card_badge);
                    } else if (Engine.selected_secondary == null && Engine.selected_primary != card) {
                        Engine.selected_secondary = card;
                        card_elt.className = "card secondary";
                        card_elt.appendChild(secondary_card_badge);
                    } else if (Engine.selected_primary == card) {
                        Engine.selected_primary = null;
                        card_elt.className = "card";
                        card_elt.removeChild(primary_card_badge);
                    } else if (Engine.selected_secondary == card) {
                        Engine.selected_secondary = null;
                        card_elt.className = "card";
                        card_elt.removeChild(secondary_card_badge);
                    } else {
                        // play error sound
                        zzfx(1,.05,580,.13,.16,.15,3,.2,-44,19,463,.35,.15,0,0,.8,0,1,0,0);
                    }
                    
                } else if (event.which == 3) {
                    // right click
                }
            });
            this.panels.cards.appendChild(card_elt);
        });
    },
    
    create_card_elt: function(card) {
        var card_elt = this.create_element({
            tag: "div",
            class: "card",
        });
        card_elt.style.backgroundImage = "url(" + card.art + ")";
        
        // also got to add the event handlers... ugh...
        // i'll do it later
        
        return card_elt;
    },
    
    start_battle: function(battle) {
        battle.next(); // starts the battle
        // then initiate the player's turn
    },
    
    create_element: function(data) {
        var elt       = document.createElement(data.tag);
        elt.className = data.class || "";
        elt.id        = data.id || "";
        elt.innerHTML = data.contents || "";
        
        return elt;
    }
};

var primary_card_badge = (function() {
    var elt       = document.createElement("div");
    elt.id        = "primary-badge";
    elt.innerHTML = "1";
    return elt;
})();

var secondary_card_badge = (function() {
    var elt       = document.createElement("div");
    elt.id        = "secondary-badge";
    elt.innerHTML = "2";
    return elt;
})();

// sounds, that i found with the "random" button on https://killedbyapixel.github.io/ZzFX/
var sounds = {
    boop: function() {
        zzfx(4.3,.05,118,0,.01,.13,0,2,0,0,0,0,0,0,261,0,0,1.3,.14,0);
    },
    high: function() {
        zzfx(1,.05,13,0,0,.01,3,.09,-13,.6,-42,.01,0,0,0,0,0,1,.12,0);
    },
    hit: function() {
        zzfx(1.85,.05,1735,.02,0,.08,4,.77,-0.6,0,0,0,0,0,0,.1,.05,1,.02,.75);
    },
    machine: function() {
        zzfx(2,.05,101,.13,.14,.01,2,2.91,0,0,0,0,.19,0,232,0,.32,1,.05,.25);
    },
    pickup: function() {
        zzfx(1,.05,290,.03,0,0,1,1.19,-30,0,0,0,0,.9,0,0,0,1,.04,.01);
    },
    whoosh_whoosh: function() {
        zzfx(1.99,.05,1406,.02,.11,.05,3,.42,0,33,-2,.2,.05,.5,-0.5,.1,.34,1,.05,0);
    },
    zap: function() {
        zzfx(1,.05,107,.18,.14,0,4,.16,0,0,46,.03,.02,0,0,0,0,.64,.01,0);
    },
    zap2: function() {
        zzfx(1,.05,51,.07,.01,.17,4,0,0,28,0,0,0,.1,-0.1,0,0,.71,.01,.08);
    },
}