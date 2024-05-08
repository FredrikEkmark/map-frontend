import "@/styles/ui-style.css";
import {AlternativeResource, Mana, Resource} from "../../types/manaTypes";
import ResourceInfo from "./resourceInfo";
import {GameEvent} from "../../types/eventTypes";

interface Props {
    mana: Mana,
    events: GameEvent[],
    turn: number,
    timeToTurnChange?: () => number
}

const ResourceBar = ({mana, events, turn, timeToTurnChange} : Props) => {

    return (
        <div className={"resourceBar"}>
            <div>Turn: {turn}</div>
            <ResourceInfo amount={mana.population}
                          resource={Resource.POPULATION}
                          secondaryAmount={mana.populationMax}
                          secondaryResource={AlternativeResource.POPULATION_MAX}>
            </ResourceInfo>
            <ResourceInfo amount={mana.manpower} resource={Resource.MANPOWER}></ResourceInfo>
            <ResourceInfo amount={mana.food} resource={Resource.FOOD}></ResourceInfo>
            <ResourceInfo amount={mana.wood} resource={Resource.WOOD}></ResourceInfo>
            <ResourceInfo amount={mana.stone} resource={Resource.STONE}></ResourceInfo>
            <ResourceInfo amount={mana.leather} resource={Resource.LEATHER}></ResourceInfo>
            <ResourceInfo amount={mana.simpleClothes} resource={Resource.SIMPLE_CLOTHES}></ResourceInfo>
            <ResourceInfo amount={mana.furniture} resource={Resource.FURNITURE}></ResourceInfo>
        </div>
    )
}
export default ResourceBar