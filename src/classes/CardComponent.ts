import CardData from "./CardData";
import GameData from "./GameData";
import { Effects } from "./Player";

export interface ComponentInput {
    card: CardData,
    gameData: GameData,
}

export function useAttackComponent({ card, gameData }: ComponentInput) {
    let multiplier = card.meta["multiplier"];
    let damage = card.meta["damage"];
    if (gameData.subTurnIndex == 0) {
        if (multiplier) {
            gameData.proposedDamage = Math.floor(gameData.proposedDamage * multiplier);
        }
        if (damage) {
            gameData.proposedDamage += damage;
        }
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

export function useHealComponent({ card, gameData }: ComponentInput ) {
    let healing = card.meta["healing"];
    let player = gameData.playerList[gameData.playerCurrentIndex]
    if (healing) {
        player.alterHealth(healing);
    }
    return true;
}

export function useManaComponent({ card, gameData }: ComponentInput ) {
    let mana = card.meta["mana"];
    let player = gameData.playerList[gameData.playerCurrentIndex]
    if (mana) {
        player.alterMana(mana);
    }
    return true;
}

export function useCureComponent({ card, gameData }: ComponentInput ) {
    let cureLevels = card.meta["cure_levels"];
    let player = gameData.playerList[gameData.playerCurrentIndex]; 
    let keys = Object.keys(player.effects) as Array<keyof Effects>
    keys.forEach((effect, i: number) => {
        if (player.effects[effect] <= cureLevels[i]) {
            player.effects[effect] = 0;
        }
    })

    return true;
}

export function useOnDamageComponent({ card, gameData }: ComponentInput ) {
    let player = gameData.playerList[gameData.playerCurrentIndex]
    if (gameData.damageDealt > 0) {
        switch (card.meta["onDamage"]) {
            case "cold":
                player.effects["cold_level"]++;
                break;
        }
    }
    return true;
}