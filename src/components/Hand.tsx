import Player from "../classes/Player";
import { useUpdateStore } from "../store";
import CardDisplay from "./CardDisplay";

interface handProps {
    player: Player
}

export default function Hand({ player }: handProps) {
    useUpdateStore();

    return <div className="hand" key={player.id}>
        {player.getHand().map((card) => (
            <div key={card.id}>
                <CardDisplay card={card} player={player} key={card.id}></CardDisplay>
            </div>
        ))}
    </div>
}