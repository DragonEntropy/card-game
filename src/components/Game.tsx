import Deck from "../classes/Deck.ts"
import Player from "../classes/Player";
import CardDisplay from "./CardDisplay.tsx";

const playerCount = 4;
const startingHandSize = 7;

function DisplayHand(player: Player) {
    return <div>
        {player.getHand().map((card) => (
            <CardDisplay card={card}></CardDisplay>
        ))}
    </div>
}

function DisplayGame(playerList: Array<Player>) {
    return <div>
        {playerList.map(
            (player) => (DisplayHand(player))
        )}
    </div>
}

export default function Game() {
    const deck = new Deck();
    const playerList = Array<Player>(playerCount);

    for (let i = 0; i < playerCount; i++) {
        let player = new Player(i, `Player ${i + 1}`);
        for (let i = 0; i < startingHandSize; i++) {
            player.draw(deck);
        }
        playerList.push(player);
    }

    return DisplayGame(playerList)
}