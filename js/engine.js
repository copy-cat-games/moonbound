var Engine = {
    panels: {
        // these appear in the same order as they do in index.html and styles.css
        battlespace: null,
        deck_button: null,
        discard_button: null,
        stats_panel: null,
        play_cards_button: null,
        cards: null,
        notifications: null,
    },
    
    init: function() {
        // stuff we should do before starting the game
        
        // set up the panels
        this.panels.battlespace   = document.getElementById("battlespace");
        this.panels.notifications = document.getElementById("notifications");
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
    
    create_element: function(data) {
        var elt       = document.createElement(data.tag);
        elt.className = data.class;
        elt.id        = data.id;
        elt.innerHTML = data.contents;
        
        return elt;
    }
};