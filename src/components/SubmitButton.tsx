import GameData from "../classes/GameData";
import Player from "../classes/Player";
import { useTargetStore, useUpdateStore } from "../store";
import "./Button.css"

interface SubmitButtonProps {
    gameData: GameData
}

function submitActions(gameData: GameData, setState: (state: boolean) => void, targetPlayer: Player, setTargetPlayer: (player: Player) => void) {
    // Go next phase if allowed
    gameData.commitActions(targetPlayer, setTargetPlayer);
    setState(true);
}

export default function SubmitButton({ gameData: GameData }: SubmitButtonProps) {
    let {state, setState} = useUpdateStore();
    let {targetPlayer, setTargetPlayer} = useTargetStore();
    return <div>
        <button className="button" onClick={() => submitActions(GameData, setState, targetPlayer, setTargetPlayer)}> Submit </button>
    </div>
}