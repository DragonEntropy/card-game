import jsonData from "../assets/data.json"
import Card, { AttackCard, DefenseCard, HybridCard } from "../classes/Card"

var data: Record<string, Record<string, any>> = jsonData;

export default function createCardData(id: string) {
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

export function generateCard() {
    var cardId = Math.floor(2 * Math.random());
    switch (cardId) {
        case (0):
            return createCardData("a1");
        case (1):
            return createCardData("d1");
        case (2):
            return createCardData("h2-4");
    }
}