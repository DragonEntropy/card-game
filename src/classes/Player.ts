import Card from "./Card";
import Deck from "./Deck";

export default class Player {
    public readonly id: number;
    public readonly name: string;
    protected hand: Array<Card> = [];

    protected health = 40;
    protected mana = 10;
    protected money = 20;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    draw(deck: Deck) {
        this.hand.push(deck.generateCard());
    }

    getHand(): ReadonlyArray<Card> {
        return this.hand;
    }

    playCardFromHand(index: number) {
        if (index >= this.hand.length) {
            return false;
        }

        let playedCard = this.hand.splice(index)[0];
    }
}