import {UUID} from "crypto";
import {MapSizes, PlayerNumber} from "./enums";

export type PlayerViewData = {
    gameId: UUID,
    playerId: UUID,
    playerName: string,
    playerNr: PlayerNumber,
    startCoordinates: MapCoordinates
    mapData: GameMapData
}

export type GameMapData = {
    map: MapTileData[]
    mapSize: MapSizes
}

export type MapTileData = {
    coordinates: MapCoordinates,
    tileOwner: PlayerNumber,
    tileTerrainValue: number,
    visible: boolean,
}

export type MapCoordinates = {
    x: number,
    y: number,
}
