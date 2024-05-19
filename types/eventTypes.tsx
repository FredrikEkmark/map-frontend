import {UUID} from "crypto";
import {PlayerNumber} from "./playerViewTypes";
import {MapCoordinates} from "./mapTypes";
import {ManaCost} from "./manaTypes";
import {BuildingTypes} from "./buildingTypes";

export type NewEventDTO = {
    gameId: UUID,
    playerNr: string,
    turn: number,
    primaryTileCoordinates: MapCoordinates,
    eventType: GameEventType,
    eventData: string,
    cost: string
}

export type GameEvent = {
    eventId: UUID,
    gameId: UUID,
    playerNr: PlayerNumber,
    turn: number,
    primaryTileCoordinates: MapCoordinates,
    eventType: GameEventType,
    eventData: BuildEventData | EmptyEventData | UnitEventData | MoveEventData | DismissEventData | SplitEventData,
    cost: ManaCost,
}

export type EventLog = {
    gameId: number,
    log: string,
    logIndex: number,
    playerNr: PlayerNumber,
    turn: number,
}

export type EmptyEventData = {
}

export type BuildEventData = {
    building: BuildingTypes
}

export type UnitEventData = {
    armyId: string
}

export type MoveEventData = {
    armyId: string
    destinationCoordinates: MapCoordinates
}

export type DismissEventData = {
    armyId: string
    regimentIDs: string[]
}

export type SplitEventData = {
    armyId: string
    regimentIDs: string[]
    destinationCoordinates: MapCoordinates
}

export enum GameEventType {
    BUILD_EVENT = "BUILD_EVENT",
    DEMOLISH_EVENT = "DEMOLISH_EVENT",
    EXPLORE_EVENT = "EXPLORE_EVENT",
    CLAIM_TILE_EVENT = "CLAIM_TILE_EVENT",
    SPLIT_ARMY_EVENT = "SPLIT_ARMY_EVENT",
    MOVE_EVENT = "MOVE_EVENT",
    FORTIFY_EVENT = "FORTIFY_EVENT",
    RAID_EVENT = "RAID_EVENT",
    CONQUER_EVENT = "CONQUER_EVENT",
    DISMISS_EVENT = "DISMISS_EVENT",
    RECRUIT_EVENT = "RECRUIT_EVENT",
}




