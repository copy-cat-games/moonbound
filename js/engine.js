var Engine = {
    panels: {
        // these appear in the same order as they do in index.html and styles.css
        battlespace: null,
        deck_button: null,
        discard_button: null,
        stats_panel: null,
        health_bar: null,
        energy_bar: null,
        stats_effects: null,
        play_cards_button: null,
        cards: null,
        notifications: null,
    },
    
    current_battle: null,
    
    init: function() {
        // stuff we should do before starting the game
        
        // set up the panels
        this.panels.battlespace       = document.getElementById("battlespace");
        this.panels.deck_button       = document.getElementById("deck-button");
        this.panels.discard_button    = document.getElementById("discard-button");
        this.panels.stats_panel       = document.getElementById("stats-panel");
        this.panels.health_bar        = document.getElementById("health-bar");
        this.panels.energy_bar        = document.getElementById("energy-bar");
        this.panels.stats_effects     = document.getElementById("stats-effects");
        this.panels.play_cards_button = document.getElementById("play-cards-button");
        this.panels.cards             = document.getElementById("cards-panel");
        this.panels.notifications     = document.getElementById("notifications");
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
    
    clear_notifications: function() {
        /*
            clears the notifications panel
            to do this, you must delete every child element of
            Engine.panels.notifications
        */
    },
    
    create_element: function(data) {
        var elt       = document.createElement(data.tag);
        elt.className = data.class;
        elt.id        = data.id;
        elt.innerHTML = data.contents;
        
        return elt;
    }
};