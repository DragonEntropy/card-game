import GameData from "../classes/GameData";
import Player from "../classes/Player";
import { useUpdateStore } from "../store";
import CardDisplay from "./CardDisplay";

interface handProps {
    player: Player,
    gameData: GameData
}

export default function Hand({ player, gameData }: handProps) {
    useUpdateStore();

    return <div className="hand" key={player.id}>
        {player.getHand().map((card) => (
            <div key={card.id}>
                <CardDisplay card={card} gameData={gameData} key={card.id}></CardDisplay>
            </div>
        ))}
    </div>
}