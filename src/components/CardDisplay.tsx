import './CardDisplay.css';
import CardData, { AttackCard, DefenseCard, HybridCard } from "../classes/CardData";
import Player from "../classes/Player";
import Card from '../classes/Card';
import { useUpdateStore } from '../store';

interface cardProp {
    card: Card;
    player: Player;
}

function renderAttack(card: CardData) {
    if (card.getTag() === "attack") {
        return (card as AttackCard).attack
    } else if (card.getTag() === "hybrid") {
        return (card as HybridCard).attack
    }
    return ""
}

function renderDefense(card: CardData) {
    if (card.getTag() === "defense") {
        return (card as DefenseCard).defense
    } else if (card.getTag() === "hybrid") {
        return (card as HybridCard).defense
    }
    return ""
}

function onCardClick(card: Card, player: Player) {
    let success = player.playCardFromHand(card.getHandIndex());
    if (success) {
        player.draw();
    }
}

export default function CardDisplay({ card, player }: cardProp) {
    const { state, setState } = useUpdateStore();
    return <>
        <div className="card" onClick={() => {
            onCardClick(card, player);
            setState(true);
        }}>
            <div className="card-header">{card.data.name}</div>
            <img src={card.data.imagePath} alt={card.data.name} className="card-image" />
            <div className="footer">
                <div className="left-footer">{renderAttack(card.data)}</div>
                <div className="right-footer">{renderDefense(card.data)}</div>
            </div>
            <div className="tooltip">{card.data.description}</div>
        </div>
    </>
}