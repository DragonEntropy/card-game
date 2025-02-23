import Card from "./Card"
import Player from "./Player";

export default class GameData {
    public selectedCards: Array<Card> = [];
    public proposedDamage: number = 0;
    public proposedBlock: number = 0;
    public subturnIndex: number = 0;
    public playerList: Array<Player>;
    public playerActionIndex: number = 0;
    public playerDefendIndex: number = -1;

    constructor(playerList: Array<Player>) {
        this.playerList = playerList;
    }

    getCard(index: number) {
        return this.selectedCards[index];
    }

    selectCard(card: Card) {
        // Check if card is already in queue and remove it
        if (this.deselectCard(card)) {
            console.log("Success: Deselecting card");
            return false;
        }

        let meta = card.data.meta;

        // Only allow defense in defense phase
        if (this.subturnIndex) {
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

    commitActions(targetPlayer: Player) {
        // Check player is attacking another player
        if (!this.subturnIndex && targetPlayer.id < 0) {
            return false;
        }
    
        // Apply components of all cards
        this.proposedDamage = 0;
        for (let card of this.selectedCards) {
            for (let component of card.data.components) {
                component({ card: card.data, gameData: this });
            }
        }

        // Force player to defend
        if (this.proposedDamage > 0) {
            let attack_id = this.playerList[this.subturnIndex ? this.playerDefendIndex : this.playerActionIndex].id;
            if (attack_id !== targetPlayer.id) {
                console.log("Defense phase!");
                this.subturnIndex++;
                this.playerDefendIndex = this.playerList.findIndex((player) => (player.id == targetPlayer.id));
            }
        }

        // Go next player
        if (!this.isDefensePhase) {

        }
    }
}