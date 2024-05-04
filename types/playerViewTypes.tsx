import {UUID} from "crypto";
import {GameMapData, MapCoordinates} from "./mapTypes";
import {EventLog} from "./eventTypes";
import {Mana} from "./manaTypes";

export type PlayerViewData = {
    gameId: UUID,
    playerId: UUID,
    playerName: string,
    playerNr: PlayerNumber,
    turn: number,
    turnChange: string,
    startCoordinates: MapCoordinates,
    mapData: GameMapData,
    mana: Mana,
    eventLog: EventLog[],
    isUpdating: boolean,
}

export interface PlayerNumber {
    name: string,
    id: number;
    color: string;
    hexCode: string;
}
export const NONE: PlayerNumber = {name: "NONE", id: 0, color: "white", hexCode: "#ffffff" };
export const PLAYER_ONE: PlayerNumber = {name: "PLAYER_ONE", id: 1, color: "red", hexCode: "#ff0000" };
export const PLAYER_TWO: PlayerNumber = {name: "PLAYER_TWO", id: 2, color: "blue", hexCode: "#0000ff" };
export const PLAYER_THREE: PlayerNumber = {name: "PLAYER_THREE", id: 3, color: "green", hexCode: "#00ff00" };
export const PLAYER_FOUR: PlayerNumber = {name: "PLAYER_FOUR", id: 4, color: "yellow", hexCode: "#ffff00" };
export const PLAYER_FIVE: PlayerNumber = {name: "PLAYER_FIVE", id: 5, color: "orange", hexCode: "#ffa500" };
export const PLAYER_SIX: PlayerNumber = {name: "PLAYER_SIX", id: 6, color: "purple", hexCode: "#800080" };
export const PLAYER_SEVEN: PlayerNumber = {name: "PLAYER_SEVEN", id: 7, color: "cyan", hexCode: "#00ffff" };
export const PLAYER_EIGHT: PlayerNumber = {name: "PLAYER_EIGHT", id: 8, color: "magenta", hexCode: "#ff00ff" };
export const PLAYER_NINE: PlayerNumber = {name: "PLAYER_NINE", id: 9, color: "lime", hexCode: "#00ff00" };
export const PLAYER_TEN: PlayerNumber = {name: "PLAYER_TEN", id: 10, color: "teal", hexCode: "#008080" };
export const PLAYER_ELEVEN: PlayerNumber = {name: "PLAYER_ELEVEN", id: 11, color: "pink", hexCode: "#ffc0cb" };
export const PLAYER_TWELVE: PlayerNumber = {name: "PLAYER_TWELVE", id: 12, color: "brown", hexCode: "#a52a2a" };

export function getPlayerNumberFromInput(input: string) {
    switch (input) {
        case 'NONE':
            return NONE;
        case 'PLAYER_ONE':
            return PLAYER_ONE;
        case 'PLAYER_TWO':
            return PLAYER_TWO;
        case 'PLAYER_THREE':
            return PLAYER_THREE;
        case 'PLAYER_FOUR':
            return PLAYER_FOUR;
        case 'PLAYER_FIVE':
            return PLAYER_FIVE;
        case 'PLAYER_SIX':
            return PLAYER_SIX;
        case 'PLAYER_SEVEN':
            return PLAYER_SEVEN;
        case 'PLAYER_EIGHT':
            return PLAYER_EIGHT;
        case 'PLAYER_NINE':
            return PLAYER_NINE;
        case 'PLAYER_TEN':
            return PLAYER_TEN;
        case 'PLAYER_ELEVEN':
            return PLAYER_ELEVEN;
        case 'PLAYER_TWELVE':
            return PLAYER_TWELVE;
        default:
            throw new Error(`Unknown Player: ${input}`);
    }
}


