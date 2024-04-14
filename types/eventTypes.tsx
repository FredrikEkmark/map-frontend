import {UUID} from "crypto";
import {PlayerNumber} from "./playerViewTypes";
import {MapCoordinates} from "./mapTypes";
import {BuildingTypes} from "./buildingTypes";

export type NewEvent = {
    eventId: UUID,
    gameId: UUID,
    playerNr: string,
    turn: number,
    primaryTileCoordinates: MapCoordinates,
    eventType: GameEventType,
    eventData: BuildEventData | EmptyEventData,
}

export type GameEvent = {
    eventId: UUID,
    gameId: UUID,
    playerNr: PlayerNumber,
    turn: number,
    primaryTileCoordinates: MapCoordinates,
    eventType: GameEventType,
    eventData: BuildEventData | EmptyEventData,
}

export type EmptyEventData = {
}

export type BuildEventData = {
    building: BuildingTypes
}

export enum GameEventType {
    BUILD_EVENT = "BUILD_EVENT",
    DEMOLISH_EVENT = "DEMOLISH_EVENT",
    EXPLORE_EVENT = "EXPLORE_EVENT",
    CLAIM_TILE_EVENT = "CLAIM_TILE_EVENT",
}




