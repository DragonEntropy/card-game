import Card, { AttackCard, DefenseCard, HybridCard } from "./Card";
import jsonData from "../assets/data.json"

var data: Record<string, Record<string, any>> = jsonData;

export default class Deck {
    private cardList: Array<Card> = [];
    constructor() {
        for (let id in data) {
            this.cardList.push(this.createCard(id));
        }
    }

    generateCard() {
        let index = Math.floor(this.cardList.length * Math.random());
        return this.cardList[index];
    }

    createCard(id: string) {
        let tag = data[id]["tag"];
        switch (tag) {
            case "attack":
                return new AttackCard(data[id]);

            case "defense":
                return new DefenseCard(data[id]);

            case "hybrid":
                return new HybridCard(data[id]);
            
            default:
                return new Card(data[id]);
        }
    }
}