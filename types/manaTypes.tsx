import React, {ReactNode} from "react";
import Image from "next/image";

export enum Resource {
    FOOD = "Food",
    WOOD = "Wood",
    LEATHER = "Leather",
    STONE = "Stone",
    IRON = "Iron",
    FURNITURE = "Furniture",
    SIMPLE_CLOTHES = "Simple Clothes",
    HORSES = "Horses",
    MANPOWER = "Manpower",
    POPULATION = "Population",
}

export enum AlternativeResource {
    PROTECTED_FOOD = "Protected Food",
    POPULATION_MAX = "Population Max",
}

function getToolTipContent(resourceInfo: ResourceInfoType): ReactNode {
    return (<div className={"tooltipContent"}>
        <div className={"textRow"}>
            <h2>{resourceInfo.name}</h2>
            <Image src={resourceInfo.img} alt={`Icon of ${resourceInfo.name}`} width={40} height={40}/>
        </div>
        <p>{resourceInfo.tooltipText}</p>
    </div>)
}

export interface ResourceInfoType {
    name: string
    img: string
    tooltipText: string
    tooltipContent: React.ReactNode;
}

export const FOOD: ResourceInfoType = {
    name: "Food",
    img: `/media/images/resources/food.png`,
    tooltipText: "Food is a basic resource mainly used for the upkeep of population. " +
        "It can be produced from a variety of buildings like Farms and Fisheries. " +
        "Food will gradually spoil if not used at a 20% of current unprotected supply. " +
        "Building a Granary will protect food from spoilage",
    tooltipContent: <></>
}

FOOD.tooltipContent = getToolTipContent(FOOD);

export const WOOD: ResourceInfoType = {
    name: "Wood",
    img: `/media/images/resources/wood.png`,
    tooltipText: "Wood is a basic resource used for construction and refined resources. " +
        "It can be produced from a Lumber Camp and can be stored indefinitely.",
    tooltipContent: <></>
}

WOOD.tooltipContent = getToolTipContent(WOOD);

export const STONE: ResourceInfoType = {
    name: "Stone",
    img: `/media/images/resources/stone.png`,
    tooltipText: "Stone is a basic resource used for construction. " +
        "It can be produced from a Quarry and can be stored indefinitely.",
    tooltipContent: <></>
}

STONE.tooltipContent = getToolTipContent(STONE);

export const LEATHER: ResourceInfoType = {
    name: "Leather",
    img: `/media/images/resources/leather.png`,
    tooltipText: "Leather is a basic resource used for refined resources. " +
        "It can be produced from a Ranch and can be stored indefinitely.",
    tooltipContent: <></>
}

LEATHER.tooltipContent = getToolTipContent(LEATHER);

export const IRON: ResourceInfoType = {
    name: "Iron",
    img: `/media/images/resources/iron.png`,
    tooltipText: "Iron",
    tooltipContent: <></>
}

IRON.tooltipContent = getToolTipContent(IRON);

export const FURNITURE: ResourceInfoType = {
    name: "Furniture",
    img: `/media/images/resources/furniture.png`,
    tooltipText: "Furniture is a refined resource and will increase the growth rate of Population. " +
        "It can be produced from a Carpentry by refining Wood.",
    tooltipContent: <></>
}

FURNITURE.tooltipContent = getToolTipContent(FURNITURE);

export const SIMPLE_CLOTHES: ResourceInfoType = {
    name: "Simple Clothes",
    img: `/media/images/resources/simpleClothes.png`,
    tooltipText: "Simple Clothes is a refined resource and will increase the growth rate of Population. " +
        "It can be produced from a Leather Worker by refining Leather.",
    tooltipContent: <></>
}

SIMPLE_CLOTHES.tooltipContent = getToolTipContent(SIMPLE_CLOTHES);

export const HORSES: ResourceInfoType = {
    name: "Horses",
    img: `/media/images/resources/horses.png`,
    tooltipText: "Horses",
    tooltipContent: <></>
}

HORSES.tooltipContent = getToolTipContent(HORSES);

export const MANPOWER: ResourceInfoType = {
    name: "Manpower",
    img: `/media/images/resources/manpower.png`,
    tooltipText: "Manpower is a temporal resource that is used for Events and upkeep of buildings. " +
        "Manpower is derived from Population after subtracting all building and unit upkeep costs.",
    tooltipContent: <></>
}

MANPOWER.tooltipContent = getToolTipContent(MANPOWER);

export const POPULATION: ResourceInfoType = {
    name: "Population",
    img: `/media/images/resources/population.png`,
    tooltipText: "Population is a growth resource and will automatically increase or decrease " +
        "depending on if the populations needs are meet. Every 100 Population will increase maximum claimed tiles by 1 " +
        "and requires 1 food every turn or the unfed population will die. " +
        "Population can never grow above Population Max but but will increase by 10% of " +
        "Population Max subtracting Population or 10% of Population whichever is lowest. If Population Max ever " +
        "decreases below Population, Population will rapidly decrease until below Population Max.",
    tooltipContent: <></>
}

POPULATION.tooltipContent = getToolTipContent(POPULATION);

export function getResourceInfo(resource: Resource) : ResourceInfoType {
    switch (resource) {
        case Resource.FOOD:
            return FOOD
        case Resource.WOOD:
            return WOOD
        case Resource.STONE:
            return STONE
        case Resource.LEATHER:
            return LEATHER
        case Resource.IRON:
            return IRON
        case Resource.FURNITURE:
            return FURNITURE
        case Resource.SIMPLE_CLOTHES:
            return SIMPLE_CLOTHES
        case Resource.HORSES:
            return HORSES
        case Resource.MANPOWER:
            return MANPOWER
        case Resource.POPULATION:
            return POPULATION
    }
}

export type Mana = {
    population: number,
    populationMax: number,
    manpower: number,
    food: number,
    stone: number,
    wood: number,
    iron: number,
    leather: number,
    furniture: number,
    simpleClothes: number,
    horses: number,
}

export type ManaCost = {
    manpower?: number,
    food?: number,
    stone?: number,
    wood?: number,
    iron?: number,
    leather?: number,
    furniture?: number,
    simpleClothes?: number,
    horses?: number,
}