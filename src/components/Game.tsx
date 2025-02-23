import Deck from "../classes/Deck.ts"
import Player from "../classes/Player";
import Hand from "./Hand.tsx";
import "../components/Hand.css"
import "../components/CardDisplay.css"
import PlayerHeader from "./PlayerHeader.tsx";
import GameData from "../classes/GameData.ts";
import CardQueue from "./CardQueue.tsx";

const playerCount = 4;
const startingHandSize = 7;

function DisplayHand(player: Player, gameData: GameData) {
    return <div key={player.id}>
        <PlayerHeader player={player}></PlayerHeader>
        <Hand player={player} gameData={gameData}></Hand>
    </div>
}

function DisplayGame(playerList: Array<Player>, gameData: GameData) {
    return <>
        <div className="hands-container">
            {playerList.map(
                (player) => (DisplayHand(player, gameData))
            )}
        </div>
        <div className="card-queue-container">
            <CardQueue gameData={gameData}></CardQueue>
        </div>
    </>
}

export default function Game() {
    const deck = new Deck();
    const playerList = Array<Player>(0);
    const gameData = new GameData(playerList);

    for (let i = 0; i < playerCount; i++) {
        let player = new Player(i, `Player ${i + 1}`, deck);
        for (let i = 0; i < startingHandSize; i++) {
            player.draw();
        }
        playerList.push(player);
    }

    return DisplayGame(playerList, gameData);
}