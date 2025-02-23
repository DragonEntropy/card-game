import CardData from "./CardData";
import GameData from "./GameData";

export interface ComponentInput {
    card: CardData,
    gameData: GameData
}

export function useAttackComponent({ card, gameData }: ComponentInput) {
    let multiplier = card.meta["multiplier"];
    let damage = card.meta["damage"];
    if (multiplier) {
        gameData.proposedDamage = Math.floor(gameData.proposedDamage * multiplier);
    }
    if (damage) {
        gameData.proposedDamage += damage;
    }
    return true;
}

export function useDefenseComponent({ card, gameData }: ComponentInput) {
    let multiplier = card.meta["multiplier"];
    let protection = card.meta["protection"];
    if (multiplier) {
        gameData.proposedBlock = Math.floor(gameData.proposedBlock * multiplier);
    }
    if (protection) {
        gameData.proposedBlock += protection;
    }
    return true;
}