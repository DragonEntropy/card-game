import CardData, { AttackCard, DefenseCard, HybridCard } from "./CardData";
import jsonData from "../assets/data.json"
import Card from "./Card";

var data: Record<string, Record<string, any>> = jsonData;

export default class Deck {
    private cardList: Array<CardData> = [];
    constructor() {
        for (let id in data) {
            this.cardList.push(this.createCard(id));
        }
    }

    generateCard(index: number) {
        let randomIndex = Math.floor(this.cardList.length * Math.random());
        return new Card(this.cardList[randomIndex], index);
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
                return new CardData(data[id]);
        }
    }
}