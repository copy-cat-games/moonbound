var example_card = {
    name: "Example Card",
    art: "/path/to/sprite.png",
    element: "water",
    description: "a dummy card. just occupies a slot.",
    cost: 1, // cost in energy
    primary: function(battle, player) {
        // primary effect
    },
    secondary: function(battle, other, player) {
        // secondary effect
        // if the card does not have a secondary effect, set this to null
    },
    apply: function(other) {
        // when another card is applied
    },
    
    /*
        so how does this work? let's say we have card A and card B.
        card A is the primary, and card B is the secondary card.
        
        first, apply the secondary card to the first:
        
            A.apply(B);
        
        then, within A.apply(), call B.secondary()
        
            if (other != null) {
                other.secondary()
            }
    */
};