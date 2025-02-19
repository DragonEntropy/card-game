import Card from "./Card";

export default class Player {
    public readonly id: number;
    public readonly name: string;
    protected hand: Array<Card> = []

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}