import {PlayerNumber} from "./playerViewTypes";
import {BuildingInfo} from "./buildingTypes";

export type GameMapData = {
    map: MapTileData[]
    mapSize: MapSizes
}

export type MapTileData = {
    coordinates: MapCoordinates,
    tileOwner: PlayerNumber,
    tileTerrainValue: TileTerrainValue,
    visible: boolean,
    building: TileBuildingData,
}

export type TileBuildingData = {
    type: BuildingInfo,
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
export const MEDIUM: MapSizes = {width: 100, height: 51}
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

export interface TileTerrainValue {
    name: string,
    css: string;
}

export const UNEXPLORED: TileTerrainValue = {name: "Unexplored", css: "unexplored"}
export const GLACIER: TileTerrainValue = {name: "Glacier", css: "glacier"}
export const DEEP_WATER: TileTerrainValue = {name: "Deep Water", css: "deepWater"}
export const COASTAL_WATER: TileTerrainValue = {name: "Coastal Water", css: "coastalWater"}
export const LOWLAND_TUNDRA: TileTerrainValue = {name: "Lowland Tundra", css: "lowlandTundra"}
export const HIGHLANDS_TUNDRA: TileTerrainValue = {name: "Highlands Tundra", css: "highlandsTundra"}
export const COLD_DESERT: TileTerrainValue = {name: "Cold Desert", css: "coldDesert"}
export const COLD_DESERT_HILLS: TileTerrainValue = {name: "Cold Desert Hills", css: "coldDesertHills"}
export const TEMPERATE_LOWLANDS_PLAIN: TileTerrainValue = {name: "Temperate Lowlands Plain", css: "temperateLowlandsPlains"}
export const TEMPERATE_FOREST: TileTerrainValue = {name: "Temperate Forest", css: "temperateForest"}
export const HIGHLAND_HILLS: TileTerrainValue = {name: "Highland Hills", css: "highlandHills"}
export const TEMPERATE_HIGHLAND_FOREST: TileTerrainValue = {name: "Temperate Highland Forest", css: "temperateHighlandForest"}
export const TEMPERATE_RAINFOREST: TileTerrainValue = {name: "Temperate Rainforest", css: "temperateRainforest"}
export const TEMPERATE_HIGHLAND_RAINFOREST: TileTerrainValue = {name: "Temperate Highland Rainforest", css: "temperateHighlandRainforest"}
export const HOT_DESERT: TileTerrainValue = {name: "Hot Desert", css: "hotDesert"}
export const HOT_DESERT_HILLS: TileTerrainValue = {name: "Hot Desert Hills", css: "hotDesertHills"}
export const HOT_STEPPE: TileTerrainValue = {name: "Hot Steppe", css: "hotSteppe"}
export const HOT_STEPPE_HILLS: TileTerrainValue = {name: "Hot Steppe Hills", css: "hotSteppeHills"}
export const TROPICAL_SAVANNA: TileTerrainValue = {name: "Tropical Savanna", css: "tropicalSavanna"}
export const TROPICAL_SAVANNA_HILLS: TileTerrainValue = {name: "Tropical Savanna Hills", css: "tropicalSavannaHills"}
export const TROPICAL_RAINFOREST: TileTerrainValue = {name: "Tropical Rainforest", css: "tropicalRainforest"}
export const TROPICAL_RAINFOREST_HILLS: TileTerrainValue = {name: "Tropical Rainforest Hills", css: "tropicalRainforestHills"}
export const GLACIAL_HEIGHTS: TileTerrainValue = {name: "Glacial Heights", css: "glacialHeights"}
export const MOUNTAINS: TileTerrainValue = {name: "Mountains", css: "mountains"}



export function getTileTerrainValueFromInput(tileValue: number): TileTerrainValue {

    switch (tileValue) {
        case 111: case 112: case 113: case 211: case 212: case 213: case 311: case 312: case 313: return GLACIER;  // glacier
        case 123: case 133: case 143: case 153: return DEEP_WATER; // deepWater
        case 223: case 233: case 243: case 253: return COASTAL_WATER;  // coastalWater
        case 322: case 323: return LOWLAND_TUNDRA; // lowlandTundra
        case 422: case 423: return HIGHLANDS_TUNDRA; // highlandsTundra
        case 321: return COLD_DESERT; // coldDesert
        case 421: return COLD_DESERT_HILLS; // coldDesertHills
        case 331: return TEMPERATE_LOWLANDS_PLAIN;  // temperateLowlandsPlains
        case 332: return TEMPERATE_FOREST;  // temperateForest
        case 431: return HIGHLAND_HILLS  // highlandHills
        case 432: return TEMPERATE_HIGHLAND_FOREST;  // temperateHighlandForest
        case 333: return TEMPERATE_RAINFOREST;  // temperateRainforest
        case 433: return TEMPERATE_HIGHLAND_RAINFOREST;  // temperateHighlandRainforest
        case 341: return HOT_DESERT; // hotDesert
        case 441: return HOT_DESERT_HILLS; // hotDesertHills 0x9c2e17
        case 342: return HOT_STEPPE; // hotSteppe 0x459410
        case 442: return HOT_STEPPE_HILLS; // hotSteppeHills 0x69914e
        case 351: case 352: case 343: return TROPICAL_SAVANNA; // tropicalSavanna 0x739410
        case 451: case 452: case 443: return TROPICAL_SAVANNA_HILLS; // tropicalSavannaHills 0x7e8f4c
        case 353: return TROPICAL_RAINFOREST; // tropicalRainforest 0x3f5209
        case 453: return TROPICAL_RAINFOREST_HILLS; // tropicalRainforestHills 0x464f2b
        case 411: case 412: case 413: return GLACIAL_HEIGHTS; // glacialHeights 0x9dc6fc
        case 511: case 521: case 531: case 541: case 551: return MOUNTAINS; // frozenMountains 0xebf0f7
        default:
            return UNEXPLORED;
    }
};