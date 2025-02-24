import Player from "../classes/Player"
import { useTargetStore, useUpdateStore } from "../store"
import "./PlayerHeader.css"

interface PlayerHeaderProp {
    player: Player
}

export default function PlayerHeader({ player }: PlayerHeaderProp) {
    useUpdateStore();
    let [health, mana, money] = player.getStats()
    return <div className="player-header">
        <PlayerNameplate player={player}></PlayerNameplate>
        {`\tHealth: ${health}:\tMana: ${mana}:\tMoney: ${money}`}
    </div>
}

function onPlayerClick(player: Player, setTargetPlayer: (player: Player) => void) {
    setTargetPlayer(player);
}

export function PlayerNameplate({ player }: PlayerHeaderProp) {
    const { targetPlayer, setTargetPlayer } = useTargetStore();
    return <div onClick={() => onPlayerClick(player, setTargetPlayer)}>
        <strong>{player.name}</strong>
    </div>
}