import Card from "./Card";
import Deck from "./Deck";

export interface Effects {
    cold_level: number,
    fog: number,
    dazed: number,
    dream: number,
    darkness: number
}

export default class Player {
    public readonly id: number;
    public readonly name: string;
    protected hand: Array<Card> = [];
    protected deck: Deck;

    protected health = 40;
    protected mana = 10;
    protected money = 20;
    public effects : Effects = {
        cold_level: 0, 
        fog: 0,
        dazed: 0,
        dream: 0,
        darkness: 0
    };

    constructor(id: number, name: string, deck: Deck) {
        this.id = id;
        this.name = name;
        this.deck = deck;
    }

    draw() {
        this.hand.push(this.deck.generateCard(this.hand.length));
    }

    getHand(): ReadonlyArray<Card> {
        return this.hand;
    }

    getStats() {
        return [this.health, this.mana, this.money];
    }

    playCardFromHand(index: number) {
        if (index >= this.hand.length) {
            return false;
        }

        let playedCard = this.hand.splice(index, 1)[0];
        this.hand.forEach((card, i) => {
            card.updateHandIndex(i);
        })
        return true;
    }

    alterHealth(deltaHealth: number) {
        this.health = Math.min(99, this.health + deltaHealth);
    }

    alterMana(deltaMana: number) {
        this.mana += deltaMana;
    }
}