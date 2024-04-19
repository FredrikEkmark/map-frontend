export enum BuildingTypes {
    NONE = "NONE",
    FARM = "FARM",
    GRANARY = "GRANARY",
    QUARRY = "QUARRY",
    LUMBER_CAMP = "LUMBER_CAMP",
    CARPENTRY = "CARPENTRY",
    RANCH = "RANCH",
    LEATHER_WORKER = "LEATHER_WORKER",
    FISHERY = "FISHERY",
    VILLAGE = "VILLAGE",
    TOWN = "TOWN",
    CITY = "CITY",
}

export interface BuildingInfo {
    name: string,
    img: string,
}

export const NONE: BuildingInfo = {name: "none", img: ""}
export const FARM: BuildingInfo = {name: "Farm", img: `/media/images/buildings/farm.png`}
export const GRANARY: BuildingInfo = {name: "Granary", img: `/media/images/buildings/granary.png`}
export const QUARRY: BuildingInfo = {name: "Quarry", img: `/media/images/buildings/quarry.png`}
export const LUMBER_CAMP: BuildingInfo = {name: "Lumber camp", img: `/media/images/buildings/lumberCamp.png`}
export const CARPENTRY: BuildingInfo = {name: "Carpentry", img: `/media/images/buildings/carpentry.png`}
export const RANCH: BuildingInfo = {name: "Ranch", img: `/media/images/buildings/ranch.png`}
export const LEATHER_WORKER: BuildingInfo = {name: "Leather worker", img: `/media/images/buildings/leatherWorker.png`}
export const FISHERY: BuildingInfo = {name: "Fishery", img: `/media/images/buildings/fishery.png`}
export const VILLAGE: BuildingInfo = {name: "Village", img: `/media/images/buildings/village.png`}
export const TOWN: BuildingInfo = {name: "Town", img: `/media/images/buildings/town.png`}
export const CITY: BuildingInfo = {name: "City", img: `/media/images/buildings/city.png`}


export function getBuildingInfo(building: string) : BuildingInfo {
    switch (building) {
        case "NONE":
            return NONE
        case "FARM":
            return FARM
        case "GRANARY":
            return GRANARY
        case "QUARRY":
            return QUARRY
        case "LUMBER_CAMP":
            return LUMBER_CAMP
        case "CARPENTRY":
            return CARPENTRY
        case "RANCH":
            return RANCH
        case "LEATHER_WORKER":
            return LEATHER_WORKER
        case "FISHERY":
            return FISHERY
        case "VILLAGE":
            return VILLAGE
        case "TOWN":
            return TOWN
        case "CITY":
            return CITY
        default:
            throw new Error(`Unknown building: ${building}`);
    }
}