import CardData from "./CardData";

var globalCardCount = 0;

export default class Card {
    public readonly id;
    public readonly data;
    protected handIndex;

    constructor(cardData: CardData, index: number) {
        this.id = globalCardCount++;
        this.data = cardData;
        this.handIndex = index;
    }

    updateHandIndex(index: number) {
        this.handIndex = index;
    }

    getHandIndex() {
        return this.handIndex;
    }
}