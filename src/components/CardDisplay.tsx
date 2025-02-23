import './CardDisplay.css';
import Player from "../classes/Player";
import Card from '../classes/Card';
import { useUpdateStore } from '../store';
import CardData from '../classes/CardData';
import GameData from '../classes/GameData';

interface cardProp {
    card: Card;
    gameData: GameData;
    inHand?: boolean;
}

function renderAttack(card: CardData) {
    if (card.tags.includes("attack")) {
        return (card.meta["stackable"] ? "+" : "") + card.meta["damage"];
    }
    return "";
}

function renderDefense(card: CardData) {
    if (card.tags.includes("defense")) {
        return card.meta["protection"];
    }
    return "";
}

function onConfirmClick(card: Card, player: Player) {
    let success = player.playCardFromHand(card.getHandIndex());
    if (success) {
        player.draw();
    }
}

function onCardClick(card: Card, gameData: GameData) {
    let success = gameData.selectCard(card);
    if (success) {
        console.log("Success!!!");
    }
    console.log(gameData.selectedCards);
}

function cardInUse(card: Card, gameData: GameData, inHand: boolean) {
    return gameData.selectedCards.find((c) => (c.id == card.id)) && inHand;
}

export default function CardDisplay({ card, gameData, inHand = true }: cardProp) {
    const { state, setState } = useUpdateStore();
    return <>
        <div className={cardInUse(card, gameData, inHand)  ? "card-clicked" : "card"} onClick={() => {
            onCardClick(card, gameData);
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