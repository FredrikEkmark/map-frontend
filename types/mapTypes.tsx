import {PlayerNumber} from "./playerViewTypes";
import {BuildingTypes} from "./buildingTypes";

export type GameMapData = {
    map: MapTileData[]
    mapSize: MapSizes
}

export type MapTileData = {
    coordinates: MapCoordinates,
    tileOwner: PlayerNumber,
    tileTerrainValue: number,
    visible: boolean,
    building: TileBuildingData,
}

export type TileBuildingData = {
    type: BuildingTypes,
    progress: number,
}

export type MapCoordinates = {
    x: number,
    y: number,
}

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