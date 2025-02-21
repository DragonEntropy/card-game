import Card from "./Card";
import Deck from "./Deck";

export default class Player {
    public readonly id: number;
    public readonly name: string;
    protected hand: Array<Card> = [];
    protected deck: Deck;

    protected health = 40;
    protected mana = 10;
    protected money = 20;

    constructor(id: number, name: string, deck: Deck) {
        this.id = id;
        this.name = name;
        this.deck = deck;
    }

    draw() {
        this.hand.push(this.deck.generateCard(this.hand.length));
        console.log(this.hand.length);
    }

    getHand(): ReadonlyArray<Card> {
        return this.hand;
    }

    getStats() {
        return [this.health, this.mana, this.money];
    }

    playCardFromHand(index: number) {
        console.log(index, this.hand.length);
        if (index >= this.hand.length) {
            return false;
        }

        let playedCard = this.hand.splice(index, 1)[0];
        this.hand.forEach((card, i) => {
            card.updateHandIndex(i);
        })
        return true;
    }
}