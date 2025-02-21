import Deck from "../classes/Deck.ts"
import Player from "../classes/Player";
import Hand from "./Hand.tsx";
import "../components/Hand.css"
import PlayerHeader from "./PlayerHeader.tsx";

const playerCount = 4;
const startingHandSize = 7;

function DisplayHand(player: Player) {
    return <div key={player.id}>
        <PlayerHeader player={player}></PlayerHeader>
        <Hand player={player}></Hand>
    </div>
}

function DisplayGame(playerList: Array<Player>) {
    return <div className="hand-container">
        {playerList.map(
            (player) => (DisplayHand(player))
        )}
    </div>
}

export default function Game() {
    const deck = new Deck();
    const playerList = Array<Player>(playerCount);

    for (let i = 0; i < playerCount; i++) {
        let player = new Player(i, `Player ${i + 1}`, deck);
        for (let i = 0; i < startingHandSize; i++) {
            player.draw();
        }
        playerList.push(player);
    }

    return DisplayGame(playerList)
}