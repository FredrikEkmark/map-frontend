import {Elevation} from "./mapTypes";
import {AlternativeResource, ManaCost, Resource} from "./manaTypes";
import React, {ReactNode} from "react";

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
    MINE = "MINE",
    BARRACK = "BARRACK",
    ARCHERY_RANGE = "ARCHERY_RANGE",
    STABLE = "STABLE",
    VILLAGE = "VILLAGE",
    TOWN = "TOWN",
    CITY = "CITY",
}

export type buildingBaseOutput = {
    resource: Resource | AlternativeResource,
    amount: number,
}

function getToolTipContent(buildingInfo: BuildingInfo): ReactNode {
    return (
        <div className={"tooltipContent"}>
            <h2>{buildingInfo.name}</h2>
            <p >{buildingInfo.tooltipText}</p>
            {buildingInfo.baseOutput ?
                <p>Base Production: {buildingInfo.baseOutput.map((baseOutput: buildingBaseOutput) => {
                    return baseOutput.resource + " " + baseOutput.amount + ", "
                })}</p>
                : <></>}
            <p>Manpower Upkeep: {buildingInfo.manpowerUpkeep}</p>
            {buildingInfo.populationMaxBonus > 0 ?
                <p>Population Max Bonus: {buildingInfo.populationMaxBonus}</p>
                : <></>}
            {buildingInfo.elevationModifiers ?
                <p>Elevation Modifiers: {buildingInfo.elevationModifiers.map((modifier: string) => {
                    return " " + modifier + ","
                })}</p>
                : <></>
            }
            {buildingInfo.temperatureModifiers ?
                <p>Temperature Modifiers: {buildingInfo.temperatureModifiers.map((modifier: string) => {
                    return " " + modifier + ","
                })}</p>
                : <></>
            }
            {buildingInfo.precipitationModifiers ?
                <p>Precipitation Modifiers: {buildingInfo.precipitationModifiers.map((modifier: string) => {
                    return " " + modifier + ","
                })}</p>
                : <></>
            }
        </div>)
}

function getToolTipBuildContent(buildingInfo: BuildingInfo): ReactNode {
    return (
        <div className={"tooltipContent"}>
            <h2>{buildingInfo.name}</h2>
            <p >{buildingInfo.tooltipText}</p>
            {buildingInfo.baseOutput ?
                <p>Base Production: {buildingInfo.baseOutput.map((baseOutput: buildingBaseOutput) => {
                    return baseOutput.resource + " " + baseOutput.amount + ", "
                })}</p>
                : <></>}
            <p>Manpower Upkeep: {buildingInfo.manpowerUpkeep}</p>
            {buildingInfo.populationMaxBonus > 0 ?
                <p>Population Max Bonus: {buildingInfo.populationMaxBonus}</p>
                : <></>}
            {buildingInfo.elevationModifiers ?
                <p>Elevation Modifiers: {buildingInfo.elevationModifiers.map((modifier: string) => {
                    return " " + modifier + ","
                })}</p>
                : <></>
            }
            {buildingInfo.temperatureModifiers ?
                <p>Temperature Modifiers: {buildingInfo.temperatureModifiers.map((modifier: string) => {
                    return " " + modifier + ","
                })}</p>
                : <></>
            }
            {buildingInfo.precipitationModifiers ?
                <p>Precipitation Modifiers: {buildingInfo.precipitationModifiers.map((modifier: string) => {
                    return " " + modifier + ","
                })}</p>
                : <></>
            }
            <div className={"textRow"}>
                <p>Completion at progress:&nbsp;</p><p className={"end"}>{buildingInfo.completeAtProgress}</p>
            </div>
            <div className={"textRow"}>
                    <p className={"start"}>Manpower Cost:&nbsp;</p><p className={"end"}>{200}</p>
            </div>
            {buildingInfo.nonManpowerCost.wood ?
                <div className={"textRow"}>
                    <p className={"start"}>Wood Cost:&nbsp;</p><p className={"end"}>{buildingInfo.nonManpowerCost.wood.toString()}</p>
                </div>
                : <></>
            }
            {buildingInfo.nonManpowerCost.stone ?
                <div className={"textRow"}>
                    <p className={"start"}>Stone Cost:&nbsp;</p><p className={"end"}>{buildingInfo.nonManpowerCost.stone}</p>
                </div>
                : <></>
            }
            {buildingInfo.nonManpowerCost.food ?
                <div className={"textRow"}>
                    <p className={"start"}>Food Cost:&nbsp;</p><p className={"end"}>{buildingInfo.nonManpowerCost.food}</p>
                </div>
                : <></>
            }
            {buildingInfo.nonManpowerCost.leather ?
                <div className={"textRow"}>
                    <p className={"start"}>Leather Cost:&nbsp;</p><p className={"end"}>{buildingInfo.nonManpowerCost.leather}</p>
                </div>
                : <></>
            }
            {buildingInfo.nonManpowerCost.furniture?
                <div className={"textRow"}>
                    <p className={"start"}>Furniture Cost:&nbsp;</p><p className={"end"}>{buildingInfo.nonManpowerCost.furniture}</p>
                </div>
                : <></>
            }
            {buildingInfo.nonManpowerCost.simpleClothes ?
                <div className={"textRow"}>
                    <p className={"start"}>Simple Clothes Cost:&nbsp;</p><p className={"end"}>{buildingInfo.nonManpowerCost.simpleClothes}</p>
                </div>
                : <></>
            }

        </div>
    )
}

export interface BuildingInfo {
    name: string,
    img: string,
    completeAtProgress: number,
    buildableElevation: Elevation[],
    elevationModifiers?: string[],
    temperatureModifiers?: string[],
    precipitationModifiers?: string[],
    baseOutput?: buildingBaseOutput[],
    input?: buildingBaseOutput[],
    type: BuildingTypes,
    populationMaxBonus: number,
    manpowerUpkeep: number,
    nonManpowerCost: ManaCost,
    tooltipText: string,
    tooltipContent: ReactNode,
    tooltipBuildContent: ReactNode,
}

export const NONE: BuildingInfo = {
    name: "none",
    img: "",
    completeAtProgress: 0,
    type: BuildingTypes.NONE,
    buildableElevation: [],
    populationMaxBonus: 0,
    manpowerUpkeep: 0,
    nonManpowerCost: {},
    tooltipText: "",
    tooltipContent: <></>,
    tooltipBuildContent: <></>,
}
export const FARM: BuildingInfo = {
    name: "Farm",
    img: `/media/images/buildings/farm.png`,
    completeAtProgress: 400,
    type: BuildingTypes.FARM,
    buildableElevation: [Elevation.LOWLANDS, Elevation.HIGHLANDS],
    elevationModifiers: ["Highlands -20%"],
    temperatureModifiers: ["Arctic -80%", "Temperate +20%", "Tropical -20%"],
    precipitationModifiers: ["None -80%", "Low +20%", "High -20%"],
    baseOutput: [{resource: Resource.FOOD, amount: 5}],
    populationMaxBonus: 50,
    manpowerUpkeep: 100,
    nonManpowerCost: {wood: 50},
    tooltipText: "",
    tooltipContent: <></>,
    tooltipBuildContent: <></>,
}
FARM.tooltipContent = getToolTipContent(FARM)
FARM.tooltipBuildContent = getToolTipBuildContent(FARM)
export const GRANARY: BuildingInfo = {
    name: "Granary",
    img: `/media/images/buildings/granary.png`,
    completeAtProgress: 500,
    type: BuildingTypes.GRANARY,
    buildableElevation: [Elevation.LOWLANDS, Elevation.HIGHLANDS],
    temperatureModifiers: ["Arctic +20%", "Subtropical -20%", "Tropical -40%"],
    precipitationModifiers: ["None +40%", "Low +20%", "High -40%"],
    baseOutput: [{resource: AlternativeResource.PROTECTED_FOOD, amount: 10}],
    populationMaxBonus: 0,
    manpowerUpkeep: 50,
    nonManpowerCost: {wood: 50, stone: 50},
    tooltipText: "",
    tooltipContent: <></>,
    tooltipBuildContent: <></>,
}
GRANARY.tooltipContent = getToolTipContent(GRANARY)
GRANARY.tooltipBuildContent = getToolTipBuildContent(GRANARY)
export const QUARRY: BuildingInfo = {
    name: "Quarry",
    img: `/media/images/buildings/quarry.png`,
    completeAtProgress: 500,
    type: BuildingTypes.QUARRY,
    buildableElevation: [Elevation.LOWLANDS, Elevation.HIGHLANDS, Elevation.MOUNTAIN],
    elevationModifiers: ["Highlands +20%", "Mountain +40%"],
    precipitationModifiers: ["None +20%", "High -20%"],
    baseOutput: [{resource: Resource.STONE, amount: 5}],
    populationMaxBonus: 0,
    manpowerUpkeep: 100,
    nonManpowerCost: {},
    tooltipText: "",
    tooltipContent: <></>,
    tooltipBuildContent: <></>,
}
QUARRY.tooltipContent = getToolTipContent(QUARRY)
QUARRY.tooltipBuildContent = getToolTipBuildContent(QUARRY)
export const LUMBER_CAMP: BuildingInfo = {
    name: "Lumber Camp",
    img: `/media/images/buildings/lumberCamp.png`,
    completeAtProgress: 400,
    type: BuildingTypes.LUMBER_CAMP,
    buildableElevation: [Elevation.LOWLANDS, Elevation.HIGHLANDS],
    temperatureModifiers: ["Arctic -60%"],
    precipitationModifiers: ["None -80%", "Moderate +20%", "High +40%"],
    baseOutput: [{resource: Resource.WOOD, amount: 5}],
    populationMaxBonus: 50,
    manpowerUpkeep: 100,
    nonManpowerCost: {},
    tooltipText: "",
    tooltipContent: <></>,
    tooltipBuildContent: <></>,
}
LUMBER_CAMP.tooltipContent = getToolTipContent(LUMBER_CAMP)
LUMBER_CAMP.tooltipBuildContent = getToolTipBuildContent(LUMBER_CAMP)
export const CARPENTRY: BuildingInfo = {
    name: "Carpentry",
    img: `/media/images/buildings/carpentry.png`,
    completeAtProgress: 500,
    type: BuildingTypes.CARPENTRY,
    buildableElevation: [Elevation.LOWLANDS, Elevation.HIGHLANDS],
    elevationModifiers: ["Highlands -20%"],
    input: [{resource: Resource.WOOD, amount: 10}],
    baseOutput: [{resource: Resource.FURNITURE, amount: 5}],
    populationMaxBonus: 0,
    manpowerUpkeep: 50,
    nonManpowerCost: {wood: 150, stone: 100},
    tooltipText: "",
    tooltipContent: <></>,
    tooltipBuildContent: <></>,
}
CARPENTRY.tooltipContent = getToolTipContent(CARPENTRY)
CARPENTRY.tooltipBuildContent = getToolTipBuildContent(CARPENTRY)
export const RANCH: BuildingInfo = {
    name: "Ranch",
    img: `/media/images/buildings/ranch.png`,
    completeAtProgress: 500,
    type: BuildingTypes.RANCH,
    buildableElevation: [Elevation.LOWLANDS, Elevation.HIGHLANDS, Elevation.MOUNTAIN],
    elevationModifiers: ["Highlands +20%", "Mountain -20%"],
    temperatureModifiers: ["Arctic -40%"],
    precipitationModifiers: ["None -40%", "High -20%"],
    baseOutput: [{resource: Resource.FOOD, amount: 5}, {resource: Resource.LEATHER, amount: 5}],
    populationMaxBonus: 50,
    manpowerUpkeep: 150,
    nonManpowerCost: {wood: 100},
    tooltipText: "",
    tooltipContent: <></>,
    tooltipBuildContent: <></>,
}
RANCH.tooltipContent = getToolTipContent(RANCH)
RANCH.tooltipBuildContent = getToolTipBuildContent(RANCH)
export const LEATHER_WORKER: BuildingInfo = {
    name: "Leather Worker",
    img: `/media/images/buildings/leatherWorker.png`,
    completeAtProgress: 500,
    type: BuildingTypes.LEATHER_WORKER,
    buildableElevation: [Elevation.LOWLANDS, Elevation.HIGHLANDS],
    elevationModifiers: ["Highlands -20%"],
    precipitationModifiers: ["Low +20%", "High -20%"],
    input: [{resource: Resource.LEATHER, amount: 10}],
    baseOutput: [{resource: Resource.SIMPLE_CLOTHES, amount: 5}],
    populationMaxBonus: 0,
    manpowerUpkeep: 50,
    nonManpowerCost: {wood: 100, stone: 150},
    tooltipText: "",
    tooltipContent: <></>,
    tooltipBuildContent: <></>,
}
LEATHER_WORKER.tooltipContent = getToolTipContent(LEATHER_WORKER)
LEATHER_WORKER.tooltipBuildContent = getToolTipBuildContent(LEATHER_WORKER)
export const FISHERY: BuildingInfo = {
    name: "Fishery",
    img: `/media/images/buildings/fishery.png`,
    completeAtProgress: 400,
    type: BuildingTypes.FISHERY,
    buildableElevation: [Elevation.SHALLOW, Elevation.DEEP],
    elevationModifiers: ["Deep +20%"],
    baseOutput: [{resource: Resource.FOOD, amount: 5}],
    populationMaxBonus: 50,
    manpowerUpkeep: 100,
    nonManpowerCost: {wood: 100},
    tooltipText: "",
    tooltipContent: <></>,
    tooltipBuildContent: <></>,
}
FISHERY.tooltipContent = getToolTipContent(FISHERY)
FISHERY.tooltipBuildContent = getToolTipBuildContent(FISHERY)
export const MINE: BuildingInfo = {
    name: "Mine",
    img: `/media/images/buildings/mine.png`,
    completeAtProgress: 500,
    type: BuildingTypes.MINE,
    buildableElevation: [Elevation.LOWLANDS, Elevation.HIGHLANDS, Elevation.MOUNTAIN],
    elevationModifiers: ["Highlands +50%", "Mountain + 100%"],
    precipitationModifiers: ["None +50%", "High -50%"],
    baseOutput: [{resource: Resource.IRON, amount: 2}],
    populationMaxBonus: 0,
    manpowerUpkeep: 100,
    nonManpowerCost: {},
    tooltipText: "",
    tooltipContent: <></>,
    tooltipBuildContent: <></>,
}
MINE.tooltipContent = getToolTipContent(MINE)
MINE.tooltipBuildContent = getToolTipBuildContent(MINE)
export const BARRACK: BuildingInfo = {
    name: "Barrack",
    img: `/media/images/buildings/barrack.png`,
    completeAtProgress: 500,
    type: BuildingTypes.BARRACK,
    buildableElevation: [Elevation.LOWLANDS, Elevation.HIGHLANDS],
    populationMaxBonus: 0,
    manpowerUpkeep: 50,
    nonManpowerCost: {wood: 100, stone: 200},
    tooltipText: "",
    tooltipContent: <></>,
    tooltipBuildContent: <></>,
}
BARRACK.tooltipContent = getToolTipContent(BARRACK)
BARRACK.tooltipBuildContent = getToolTipBuildContent(BARRACK)
export const ARCHERY_RANGE: BuildingInfo = {
    name: "Archery Range",
    img: `/media/images/buildings/archeryRange.png`,
    completeAtProgress: 500,
    type: BuildingTypes.ARCHERY_RANGE,
    buildableElevation: [Elevation.LOWLANDS, Elevation.HIGHLANDS],
    populationMaxBonus: 0,
    manpowerUpkeep: 50,
    nonManpowerCost: {wood: 200, stone: 100},
    tooltipText: "",
    tooltipContent: <></>,
    tooltipBuildContent: <></>,
}
ARCHERY_RANGE.tooltipContent = getToolTipContent(ARCHERY_RANGE)
ARCHERY_RANGE.tooltipBuildContent = getToolTipBuildContent(ARCHERY_RANGE)
export const STABLE: BuildingInfo = {
    name: "Stable",
    img: `/media/images/buildings/stable.png`,
    completeAtProgress: 600,
    type: BuildingTypes.STABLE,
    buildableElevation: [Elevation.LOWLANDS, Elevation.HIGHLANDS],
    baseOutput: [{resource: Resource.HORSES, amount: 1}],
    populationMaxBonus: 50,
    manpowerUpkeep: 100,
    nonManpowerCost: {wood: 250, stone: 150},
    tooltipText: "",
    tooltipContent: <></>,
    tooltipBuildContent: <></>,
}
STABLE.tooltipContent = getToolTipContent(STABLE)
STABLE.tooltipBuildContent = getToolTipBuildContent(STABLE)
export const VILLAGE: BuildingInfo = {
    name: "Village",
    img: `/media/images/buildings/village.png`,
    completeAtProgress: 800,
    type: BuildingTypes.VILLAGE,
    buildableElevation: [Elevation.LOWLANDS, Elevation.HIGHLANDS],
    elevationModifiers: ["Highlands -10%"],
    temperatureModifiers: ["Arctic -20%", "Tropical -10%"],
    precipitationModifiers: ["None -20%", "High -20%"],
    baseOutput: [{resource: Resource.FOOD, amount: 10}],
    populationMaxBonus: 500,
    manpowerUpkeep: 300,
    nonManpowerCost: {wood: 500, food: 20, stone: 200},
    tooltipText: "",
    tooltipContent: <></>,
    tooltipBuildContent: <></>,
}
VILLAGE.tooltipContent = getToolTipContent(VILLAGE)
VILLAGE.tooltipBuildContent = getToolTipBuildContent(VILLAGE)
export const TOWN: BuildingInfo = {
    name: "Town",
    img: `/media/images/buildings/town.png`,
    completeAtProgress: 400,
    type: BuildingTypes.TOWN,
    buildableElevation: [Elevation.LOWLANDS, Elevation.HIGHLANDS],
    elevationModifiers: ["Highlands -10%"],
    temperatureModifiers: ["Arctic -20%", "Tropical -10%"],
    precipitationModifiers: ["None -20%", "High -20%"],
    baseOutput: [{resource: Resource.FOOD, amount: 10}],
    populationMaxBonus: 2000,
    manpowerUpkeep: 600,
    nonManpowerCost: {},
    tooltipText: "",
    tooltipContent: <></>,
    tooltipBuildContent: <></>,
}
TOWN.tooltipContent = getToolTipContent(TOWN)
TOWN.tooltipBuildContent = getToolTipBuildContent(TOWN)
export const CITY: BuildingInfo = {
    name: "City",
    img: `/media/images/buildings/city.png`,
    completeAtProgress: 400,
    type: BuildingTypes.CITY,
    buildableElevation: [Elevation.LOWLANDS, Elevation.HIGHLANDS],
    elevationModifiers: ["Highlands -10%"],
    temperatureModifiers: ["Arctic -20%", "Tropical -10%"],
    precipitationModifiers: ["None -20%", "High -20%"],
    baseOutput: [{resource: Resource.FOOD, amount: 10}],
    populationMaxBonus: 5000,
    manpowerUpkeep: 1000,
    nonManpowerCost: {},
    tooltipText: "",
    tooltipContent: <></>,
    tooltipBuildContent: <></>,
}
CITY.tooltipContent = getToolTipContent(CITY)
CITY.tooltipBuildContent = getToolTipBuildContent(CITY)


export function getBuildingInfo(building: BuildingTypes) : BuildingInfo {
    switch (building) {
        case BuildingTypes.NONE:
            return NONE
        case BuildingTypes.FARM:
            return FARM
        case BuildingTypes.GRANARY:
            return GRANARY
        case BuildingTypes.QUARRY:
            return QUARRY
        case BuildingTypes.LUMBER_CAMP:
            return LUMBER_CAMP
        case BuildingTypes.CARPENTRY:
            return CARPENTRY
        case BuildingTypes.RANCH:
            return RANCH
        case BuildingTypes.LEATHER_WORKER:
            return LEATHER_WORKER
        case BuildingTypes.FISHERY:
            return FISHERY
        case BuildingTypes.MINE:
            return MINE
        case BuildingTypes.BARRACK:
            return BARRACK
        case BuildingTypes.ARCHERY_RANGE:
            return ARCHERY_RANGE
        case BuildingTypes.STABLE:
            return STABLE
        case BuildingTypes.VILLAGE:
            return VILLAGE
        case BuildingTypes.TOWN:
            return TOWN
        case BuildingTypes.CITY:
            return CITY
        default:
            throw new Error(`Unknown building: ${building}`);
    }
}