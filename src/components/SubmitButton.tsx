import GameData from "../classes/GameData";
import Player from "../classes/Player";
import { useTargetStore, useUpdateStore } from "../store";

interface SubmitButtonProps {
    gameData: GameData
}

function submitActions(gameData: GameData, setState: (state: boolean) => void, targetPlayer: Player) {
    if (gameData.selectedCards.length > 0) {
        // Go next phase
        setState(true);
        gameData.commitActions(targetPlayer);
    }
}

export default function SubmitButton({ gameData: GameData }: SubmitButtonProps) {
    let {state, setState} = useUpdateStore();
    let {targetPlayer, setTargetPlayer} = useTargetStore();
    return <div>
        <button onClick={() => submitActions(GameData, setState, targetPlayer)}></button>
    </div>
}