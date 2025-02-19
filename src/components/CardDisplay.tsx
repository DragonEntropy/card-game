import { useState } from "react";
import './CardDisplay.css';
import createCardData from "../scripts/ManageCards";
import Card, { AttackCard, DefenseCard, HybridCard } from "../classes/Card";

interface CardProp {
    id?: string
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

export default function CardDisplay({ id = "a1" }: CardProp) {
    const data = createCardData(id);
    var [hover, setHover] = useState(false);
    console.log(data.imagePath)

    return <>
        <div className="card">
            <div className="card-header">{data.name}</div>
            <img src={data.imagePath} alt={data.imagePath} className="card-image" />
            <div className="footer">
                <div className="left-footer">{renderAttack(data)}</div>
                <div className="right-footer">{renderDefense(data)}</div>
            </div>
            <div className="tooltip">{data.description}</div>
        </div>
    </>
}