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
    completeAtProgress: number,
}

export const NONE: BuildingInfo = {name: "none", img: "", completeAtProgress: 0}
export const FARM: BuildingInfo = {name: "Farm", img: `/media/images/buildings/farm.png`, completeAtProgress: 400}
export const GRANARY: BuildingInfo = {name: "Granary", img: `/media/images/buildings/granary.png`, completeAtProgress: 500}
export const QUARRY: BuildingInfo = {name: "Quarry", img: `/media/images/buildings/quarry.png`, completeAtProgress: 500}
export const LUMBER_CAMP: BuildingInfo = {name: "Lumber camp", img: `/media/images/buildings/lumberCamp.png`, completeAtProgress: 400}
export const CARPENTRY: BuildingInfo = {name: "Carpentry", img: `/media/images/buildings/carpentry.png`, completeAtProgress: 500}
export const RANCH: BuildingInfo = {name: "Ranch", img: `/media/images/buildings/ranch.png`, completeAtProgress: 500}
export const LEATHER_WORKER: BuildingInfo = {name: "Leather worker", img: `/media/images/buildings/leatherWorker.png`, completeAtProgress: 400}
export const FISHERY: BuildingInfo = {name: "Fishery", img: `/media/images/buildings/fishery.png`, completeAtProgress: 400}
export const VILLAGE: BuildingInfo = {name: "Village", img: `/media/images/buildings/village.png`, completeAtProgress: 400}
export const TOWN: BuildingInfo = {name: "Town", img: `/media/images/buildings/town.png`, completeAtProgress: 400}
export const CITY: BuildingInfo = {name: "City", img: `/media/images/buildings/city.png`, completeAtProgress: 400}


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