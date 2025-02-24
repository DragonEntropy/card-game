import Card from "./Card"
import Player from "./Player";

export default class GameData {
    public incomingDamage: number = 0;
    public proposedDamage: number = 0;
    public proposedBlock: number = 0;
    public playerList: Array<Player>;
    public playerActionIndex: number = 0;
    public playerCurrentIndex: number = 0;
    public turnIndex: number = 0;
    public subTurnIndex: number = 0;

    public oldSelectedCards: Array<Card> = [];
    public selectedCards: Array<Card> = [];

    constructor(playerList: Array<Player>) {
        this.playerList = playerList;
    }

    getCard(index: number) {
        return this.selectedCards[index];
    }

    selectCard(card: Card) {
        // Check that card is from the correct player's hand
        if (this.playerList[this.playerCurrentIndex].getHand().findIndex((playerCard: Card) => (playerCard.id == card.id)) == -1) {
            return false;
        }

        // Check if card is already in queue and remove it
        if (this.deselectCard(card)) {
            console.log("Success: Deselecting card");
            return false;
        }

        let meta = card.data.meta;

        // Only allow defense in defense phase
        if (this.subTurnIndex) {
            if (!(card.data.tags.includes("defense"))) {
                console.log("Failure: Cannot play non-defense card in defense phase");
                return false;
            }
        }

        else {
            // Only allow attack in attack phase
            if (!(card.data.tags.includes("attack"))) {
                console.log("Failure: Cannot play non-attack card in action phase");
                return false;
            }

            // Only allow stackable attacks on top of existing attacks, otherwise clear hand
            if (!meta["stackable"] && this.selectedCards.length > 0) {
                this.selectedCards = [];
                console.log("Clearing hand: Cannot play non-stackable attack card ontop of a stackable attack");
            }
        }

        this.selectedCards.push(card);
        return true;
    }

    deselectCard(card: Card) {
        let index = this.selectedCards.findIndex((c) => (c.id === card.id));
        if (index >= 0) {
            this.selectedCards.splice(index, 1);
            return true;
        }

        return false;
    }

    nextPlayer() {
        do {
            this.playerActionIndex = (this.playerActionIndex + 1) % this.playerList.length;
        } while(this.playerList[this.playerActionIndex].getStats()[0] <= 0);
        this.playerCurrentIndex = this.playerActionIndex;
    }

    playCards() {
        let player = this.playerList[this.playerCurrentIndex];
        let playerHand = player.getHand();
        for (let card of this.selectedCards) {
            let cardIndex = playerHand.findIndex((playerCard: Card) => (playerCard.id == card.id));
            if (cardIndex > -1) {
                if (player.playCardFromHand(cardIndex)) {
                    player.draw();
                }
            }
        }
    }

    commitActions(targetPlayer: Player, setTargetPlayer: (player: Player) => void) {

        // Check player is attacking another player
        if (!this.subTurnIndex && targetPlayer.id < 0) {
            console.log("No player selected");
            return false;
        }
    
        // Apply components of all cards
        this.proposedDamage = 0;
        this.proposedBlock = 0;
        for (let card of this.selectedCards) {
            for (let component of card.data.components) {
                component({ card: card.data, gameData: this });
            }
        }

        // First resolve incoming damage
        let netDamage = this.incomingDamage - this.proposedBlock
        let attackId = this.playerCurrentIndex;
        let defendId = this.playerList.findIndex((player) => (player.id == targetPlayer.id));
        if (netDamage > 0) {
            this.playerList[attackId].alterHealth(-netDamage);
            console.log(`${this.playerList[attackId].name} has taken ${netDamage} damage!`);
        }
        this.incomingDamage = this.proposedDamage;

        if (this.incomingDamage) {
            console.log(`${this.playerList[attackId].name} threatens ${this.playerList[defendId].name} with ${this.incomingDamage} damage`);
        }

        // Force player to defend if damage is proposed
        if (this.proposedDamage > 0) {
            if (attackId !== defendId) {
                console.log(`${targetPlayer.name} is now defending against ${this.incomingDamage} damage!`);
                this.subTurnIndex++;
                setTargetPlayer(this.playerList[attackId]);
                this.playCards();
                this.playerCurrentIndex = defendId;
                this.oldSelectedCards = this.selectedCards;
                this.selectedCards = [];
                return true;
            }

            // If a player attacks themselves, damage them immediately
            else {
                if (this.incomingDamage > 0) {    
                    this.playerList[attackId].alterHealth(-this.incomingDamage);
                    console.log(`${this.playerList[attackId].name} has taken ${this.incomingDamage} damage!`);
                }
            }
        }


        // Otherwise go next player
        this.subTurnIndex = 0;
        this.turnIndex++;
        this.playCards();
        this.nextPlayer();
        this.oldSelectedCards = [];
        this.selectedCards = [];
        return true;
    }
}