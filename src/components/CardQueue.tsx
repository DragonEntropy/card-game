import GameData from "../classes/GameData";
import { useTargetStore, useUpdateStore } from "../store";
import CardDisplay from "./CardDisplay";
import SubmitButton from "./SubmitButton";

export interface gameDataProp {
    gameData: GameData
}


export default function CardQueue({ gameData }: gameDataProp) {
    useUpdateStore();
    let { targetPlayer, setTargetPlayer } = useTargetStore();
    let activePlayer = gameData.playerList[gameData.playerCurrentIndex > -1 ? gameData.playerCurrentIndex : gameData.playerActionIndex];

    return <div>
        {(targetPlayer.id >= 0)
            && <>
                <strong>{activePlayer.name}</strong> attacks <strong>{targetPlayer.name}</strong>
            </>}
        {gameData.selectedCards.map((card) => (
            <div key={card.id}>
                {
                    <CardDisplay card={card} gameData={gameData} inHand={false}></CardDisplay>
                }
            </div>
        ))}
        <SubmitButton gameData={gameData}></SubmitButton>
    </div>
}