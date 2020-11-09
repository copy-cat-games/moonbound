class Player {
    constructor(deck, health) {
        this.deck     = deck;
        this.hand     = [];
        this.discards = [];
        
        this.energy  = this.max_energy;
        this.defense = 0; // how much damage is reduced. from 1 (all damage blocked) to 0 (no damage blocked)
        this.health  = health;
    }
    
    draw() {
        // draws a card from the deck, without replacement
        while (this.hand.length < this.max_hand_size) {
            this.hand.push(random_element(this.get_available_deck()));
        }
    }
    
    get_available_deck() {
        return this.deck.filter(card => {
            // if a card hasn't been picked, then it should not be found in the hand or the discard
            return this.hand.indexOf(card) == -1 && this.discards.indexOf(card) == -1;
        });
    }
    
    can_play(primary, secondary) {
        // checks if the player has enough energy to play those cards
        return this.energy >= (primary.cost + secondary.cost)
    }
    
    play(primary, secondary) {
        // the cards should already be checked! if they're not, you're doing something wrong. stop immediately!
        if (this.can_play(primary, secondary)) {
            console.error("there is not enough energy to play these cards! proceeding anyway...");
        }
        
        // remove them from the hand, throw them in discards
        this.hand = this.hand.filter(card => {
            return card != primary && card != secondary;
        });
        this.discards.push(primary);
        this.discards.push(secondary);
    }
    
    recycle() {
        // puts the discards back into the deck. or appears to.
        this.discards = [];
        // remember to call this.draw() separately!
    }
    
    deal_damage(damage) {
        this.health -= damage * (1 - this.defense);
    }
    
    start_turn() {
        // player starts their turn
        
        // first, replenish the deck and energy
        this.draw();
        this.energy = this.max_energy;
    }
}

Player.prototype.max_hand_size = 7;
Player.prototype.max_energy    = 4;