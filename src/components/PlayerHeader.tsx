import Player from "../classes/Player"
import "./PlayerHeader.css"

interface PlayerHeaderProp {
    player: Player
}

export default function PlayerHeader({ player }: PlayerHeaderProp) {
    let [health, mana, money] = player.getStats()
    return <div className="player-header">
        <strong>{player.name}:</strong>
        {`\tHealth: ${health}:\tMana: ${mana}:\tMoney: ${money}`}
    </div>
}