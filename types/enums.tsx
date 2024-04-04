export enum TileEdge {
    NONE = "",
    RIGHT = "rightEdge",
    LEFT = "leftEdge",
    TOP = "topEdge",
    BOTTOM = "bottomEdge",
    LEFT_TOP = "leftTopEdge",
    RIGHT_TOP = "rightTopEdge",
    LEFT_BOTTOM = "leftBottomEdge",
    RIGHT_BOTTOM = "rightBottomEdge",
}

export enum MapMove {
    UP,
    LEFT,
    RIGHT,
    DOWN,
}

export interface MapSizes {
    width: number;
    height: number;
}
export const SMALL: MapSizes = {width: 50, height: 25}
export const MEDIUM: MapSizes = {width: 10, height: 51}
export const LARGE: MapSizes = {width: 200, height: 101}
export const XLARGE: MapSizes = {width: 400, height: 201}

export function getMapSizeFromInput(input: string): MapSizes {
    switch (input) {
        case 'SMALL':
            return SMALL;
        case 'MEDIUM':
            return MEDIUM;
        case 'LARGE':
            return LARGE;
        case 'XLARGE':
            return XLARGE;
        default:
            throw new Error(`Unknown size: ${input}`);
    }
}

export interface PlayerNumber {
    id: number;
    color: string;
    hexCode: string;
}
export const NONE: PlayerNumber = { id: 0, color: "white", hexCode: "#ffffff" };
export const PLAYER_ONE: PlayerNumber = { id: 1, color: "red", hexCode: "#ff0000" };
export const PLAYER_TWO: PlayerNumber = { id: 2, color: "blue", hexCode: "#0000ff" };
export const PLAYER_THREE: PlayerNumber = { id: 3, color: "green", hexCode: "#00ff00" };
export const PLAYER_FOUR: PlayerNumber = { id: 4, color: "yellow", hexCode: "#ffff00" };
export const PLAYER_FIVE: PlayerNumber = { id: 5, color: "orange", hexCode: "#ffa500" };
export const PLAYER_SIX: PlayerNumber = { id: 6, color: "purple", hexCode: "#800080" };
export const PLAYER_SEVEN: PlayerNumber = { id: 7, color: "cyan", hexCode: "#00ffff" };
export const PLAYER_EIGHT: PlayerNumber = { id: 8, color: "magenta", hexCode: "#ff00ff" };
export const PLAYER_NINE: PlayerNumber = { id: 9, color: "lime", hexCode: "#00ff00" };
export const PLAYER_TEN: PlayerNumber = { id: 10, color: "teal", hexCode: "#008080" };
export const PLAYER_ELEVEN: PlayerNumber = { id: 11, color: "pink", hexCode: "#ffc0cb" };
export const PLAYER_TWELVE: PlayerNumber = { id: 12, color: "brown", hexCode: "#a52a2a" };

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