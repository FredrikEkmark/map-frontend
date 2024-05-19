import {MapCoordinates} from "./mapTypes";
import {PlayerNumber} from "./playerViewTypes";
import {BuildingTypes} from "./buildingTypes";
import {ManaCost} from "./manaTypes";

export type Army = {
   armyCoordinates: MapCoordinates,
   armyId: string,
   armyMovement:number,
   armyName: string,
   fortified: boolean,
   owner: PlayerNumber,
   regiments: Regiment[],
}

export type Regiment = {
   regimentId: string,
   owner: PlayerNumber,
   movement: number,
   moral: number,
   equipmentModifier: number,
   regimentName: string,
   unitAmount: number,
   unitType: string, // todo change to enum or simmular
}

export enum UnitType {
   INFANTRY = "INFANTRY",
   ARCHERS = "ARCHERS",
   CAVALRY = "CAVALRY",
}

export interface UnitInfo {
   name: string,
   type: UnitType
   amount: number,
   baseMovement: number,
   recruitCost: ManaCost
}

const INFANTRY: UnitInfo = {
   name: "Infantry",
   type: UnitType.INFANTRY,
   amount: 100,
   baseMovement: 2,
   recruitCost: {manpower: 100, iron: 5, simpleClothes: 5}
}

const ARCHERS: UnitInfo = {
   name: "Archers",
   type: UnitType.ARCHERS,
   amount: 100,
   baseMovement: 2,
   recruitCost: {manpower: 100, wood: 10, simpleClothes: 5}
}

const CAVALRY: UnitInfo = {
   name: "Cavalry",
   type: UnitType.CAVALRY,
   amount: 100,
   baseMovement: 3,
   recruitCost: {manpower: 100, iron: 5, simpleClothes: 5, horses: 2}
}

export function getRecruitedUnitFromBuilding(buildingType: BuildingTypes): UnitInfo | null {
   switch (buildingType) {
      case BuildingTypes.BARRACK: return INFANTRY
      case BuildingTypes.ARCHERY_RANGE: return ARCHERS
      case BuildingTypes.STABLE: return CAVALRY
   }
   return null
}
