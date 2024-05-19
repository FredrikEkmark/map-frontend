import "@/styles/resourceBar/resourceBar.css";
import "@/styles/global/global.css";
import BuildingEventButton from "./buildingEventButton";
import {BuildingTypes, getBuildingInfo} from "../../../types/buildingTypes";
import {GameEventType} from "../../../types/eventTypes";
import {MapTileData} from "../../../types/mapTypes";

interface Props {
    addEvent: (evenType: GameEventType, eventData: any, cost: any) => Promise<boolean>,
    setBuildView: (state: boolean) => void
    tile: MapTileData
}
const BuildView = ({addEvent, setBuildView, tile} : Props) => {

    return (<div className={"tileInfoDisplay"}>
        <div className={"buildViewDisplay"}>
            <BuildingEventButton building={getBuildingInfo(BuildingTypes.FARM)} addEvent={addEvent} setBuildView={setBuildView} tile={tile}></BuildingEventButton>
            <BuildingEventButton building={getBuildingInfo(BuildingTypes.GRANARY)} addEvent={addEvent} setBuildView={setBuildView} tile={tile}></BuildingEventButton>
            <BuildingEventButton building={getBuildingInfo(BuildingTypes.RANCH)} addEvent={addEvent} setBuildView={setBuildView} tile={tile}></BuildingEventButton>
            <BuildingEventButton building={getBuildingInfo(BuildingTypes.LUMBER_CAMP)} addEvent={addEvent} setBuildView={setBuildView} tile={tile}></BuildingEventButton>
            <BuildingEventButton building={getBuildingInfo(BuildingTypes.QUARRY)} addEvent={addEvent} setBuildView={setBuildView} tile={tile}></BuildingEventButton>
            <BuildingEventButton building={getBuildingInfo(BuildingTypes.CARPENTRY)} addEvent={addEvent} setBuildView={setBuildView} tile={tile}></BuildingEventButton>
            <BuildingEventButton building={getBuildingInfo(BuildingTypes.LEATHER_WORKER)} addEvent={addEvent} setBuildView={setBuildView} tile={tile}></BuildingEventButton>
            <BuildingEventButton building={getBuildingInfo(BuildingTypes.FISHERY)} addEvent={addEvent} setBuildView={setBuildView} tile={tile}></BuildingEventButton>
            <BuildingEventButton building={getBuildingInfo(BuildingTypes.VILLAGE)} addEvent={addEvent} setBuildView={setBuildView} tile={tile}></BuildingEventButton>
            <BuildingEventButton building={getBuildingInfo(BuildingTypes.MINE)} addEvent={addEvent} setBuildView={setBuildView} tile={tile}></BuildingEventButton>
            <BuildingEventButton building={getBuildingInfo(BuildingTypes.ARCHERY_RANGE)} addEvent={addEvent} setBuildView={setBuildView} tile={tile}></BuildingEventButton>
            <BuildingEventButton building={getBuildingInfo(BuildingTypes.BARRACK)} addEvent={addEvent} setBuildView={setBuildView} tile={tile}></BuildingEventButton>
            <BuildingEventButton building={getBuildingInfo(BuildingTypes.STABLE)} addEvent={addEvent} setBuildView={setBuildView} tile={tile}></BuildingEventButton>
        </div>
    </div>)

}
export default BuildView