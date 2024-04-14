export enum BuildingTypes {
    FARM = "FARM",
    GRANARY = "GRANARY",
    QUERY = "QUERY",
    LUMBER_CAMP = "LUMBER_CAMP",
    CARPENTRY = "CARPENTRY",
    RANCH = "RANCH",
    LEATHER_WORKER = "LEATHER_WORKER",
}

export interface BuildingInfo {
}

export const FARM: BuildingInfo = {}
export const GRANARY: BuildingInfo = {}
export const QUERY: BuildingInfo = {}
export const LUMBER_CAMP: BuildingInfo = {}
export const CARPENTRY: BuildingInfo = {}
export const RANCH: BuildingInfo = {}
export const LEATHER_WORKER: BuildingInfo = {}


export function getBuildingInfo(building: BuildingTypes) : BuildingInfo {
    switch (building) {
        case BuildingTypes.FARM:
            return FARM
        case BuildingTypes.GRANARY:
            return GRANARY
        case BuildingTypes.QUERY:
            return QUERY
        case BuildingTypes.LUMBER_CAMP:
            return LUMBER_CAMP
        case BuildingTypes.CARPENTRY:
            return CARPENTRY
        case BuildingTypes.RANCH:
            return RANCH
        case BuildingTypes.LEATHER_WORKER:
            return LEATHER_WORKER
        default:
            throw new Error(`Unknown building: ${building}`);
    }
}