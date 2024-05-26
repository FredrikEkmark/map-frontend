import "@/styles/global/global.css";
import "@/styles/resourceBar/resourceBar.css";
import {AlternativeResource, Mana, Resource} from "../../types/manaTypes";
import ResourceInfo from "./resourceInfo";
import {GameEvent} from "../../types/eventTypes";
import TurnCountdown from "./turnCountdown";

interface Props {
    mana: Mana,
    events: GameEvent[],
    turn: number,
    turnChangeTime: Date
}

const ResourceBar = ({mana, events, turn, turnChangeTime} : Props) => {

    return (
        <div className={"resourceBar"}>
            <TurnCountdown turn={turn} turnChangeTime={turnChangeTime}></TurnCountdown>
            <ResourceInfo amount={mana.population}
                          resource={Resource.POPULATION}
                          secondaryAmount={mana.populationMax}
                          secondaryResource={AlternativeResource.POPULATION_MAX}>
            </ResourceInfo>
            <ResourceInfo amount={mana.manpower} resource={Resource.MANPOWER}></ResourceInfo>
            <ResourceInfo amount={mana.food} resource={Resource.FOOD}></ResourceInfo>
            <ResourceInfo amount={mana.wood} resource={Resource.WOOD}></ResourceInfo>
            <ResourceInfo amount={mana.stone} resource={Resource.STONE}></ResourceInfo>
            <ResourceInfo amount={mana.iron} resource={Resource.IRON}></ResourceInfo>
            <ResourceInfo amount={mana.leather} resource={Resource.LEATHER}></ResourceInfo>
            <ResourceInfo amount={mana.simpleClothes} resource={Resource.SIMPLE_CLOTHES}></ResourceInfo>
            <ResourceInfo amount={mana.horses} resource={Resource.HORSES}></ResourceInfo>
        </div>
    )
}
export default ResourceBar