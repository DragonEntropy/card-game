import { useState } from "react";
import './CardDisplay.css';
import Card, { AttackCard, DefenseCard, HybridCard } from "../classes/Card";

interface cardProp {
    card: Card
}

function renderAttack(card: Card) {
    if (card.getTag() === "attack") {
        return (card as AttackCard).attack
    } else if (card.getTag() === "hybrid") {
        return (card as HybridCard).attack
    }
    return ""
}

function renderDefense(card: Card) {
    if (card.getTag() === "defense") {
        return (card as DefenseCard).defense
    } else if (card.getTag() === "hybrid") {
        return (card as HybridCard).defense
    }
    return ""
}

export default function CardDisplay({ card }: cardProp) {
    var [hover, setHover] = useState(false);

    return <>
        <div className="card">
            <div className="card-header">{card.name}</div>
            <img src={card.imagePath} alt={card.imagePath} className="card-image" />
            <div className="footer">
                <div className="left-footer">{renderAttack(card)}</div>
                <div className="right-footer">{renderDefense(card)}</div>
            </div>
            <div className="tooltip">{card.description}</div>
        </div>
    </>
}