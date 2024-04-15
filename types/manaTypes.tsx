export enum Resource {
    SIMPLE_CLOTHES = "simpleClothes",
    STONE = "stone",
    FOOD = "food",
    FURNITURE = "furniture",
    LEATHER = "leather",
    MANPOWER = "manpower",
    POPULATION = "population",
    POPULATION_MAX = "populationMax",
    WOOD = "wood",
}

export type Mana = {
    population: number,
    populationMax: number,
    manpower: number,
    food: number,
    stone: number,
    wood: number,
    leather: number,
    furniture: number,
    simpleClothes: number,
}

export type ManaCost = {
    manpower?: number,
    food?: number,
    stone?: number,
    wood?: number,
    leather?: number,
    furniture?: number,
    simpleClothes?: number,
}