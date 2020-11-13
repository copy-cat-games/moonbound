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
    selected_cards: [],
    
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
            this.panels.cards.appendChild(this.create_card_elt(card));
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
    
    on_click_card: function() {
        
    },
    
    create_element: function(data) {
        var elt       = document.createElement(data.tag);
        elt.className = data.class || "";
        elt.id        = data.id || "";
        elt.innerHTML = data.contents || "";
        
        return elt;
    }
};