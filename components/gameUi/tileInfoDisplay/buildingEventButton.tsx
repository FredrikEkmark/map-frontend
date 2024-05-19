import "@/styles/gameUi/gameUi.css";
import "@/styles/global/global.css";
import Image from "next/image";
import {BuildingInfo, BuildingTypes} from "../../../types/buildingTypes";
import {GameEventType} from "../../../types/eventTypes";
import {MapTileData} from "../../../types/mapTypes";
import {useState} from "react";
import Tooltip from "../../global/tooltip";

interface Props {
    building: BuildingInfo,
    addEvent: (evenType: GameEventType, eventData: any, cost: any) => Promise<boolean>,
    setBuildView: (state: boolean) => void,
    tile: MapTileData | null

}
const BuildingEventButton = ({building, addEvent, setBuildView, tile} : Props) => {

    const [buttonClass, setButtonClass] = useState<string>("buildEventButton")

    const buildable = () => {

        if (tile) {
            return building.buildableElevation.includes(tile.tileTerrainValue.elevation)
        }
        return false
    }

    const addBuildEvent = () => {

        let manpowerCost = 200;

        let cost = building.nonManpowerCost

        if (tile?.building && tile?.building.progress > 0 && tile.building.type.type == building.type) {
            cost = {}
        }

        if (tile) {
              manpowerCost = Math.min(building.completeAtProgress - tile.building.progress, manpowerCost)
        }

        cost.manpower = manpowerCost

        addEvent(GameEventType.BUILD_EVENT, {building: building.type},
            cost).then(r => r ? setBuildView(false) : setButtonClass("buildEventButtonReject"));

    }

    if (buildable()) {
        return (
            <Tooltip tooltipContent={building.tooltipBuildContent}>
                <div className={buttonClass}>
                    <Image
                        src={building.img}
                        alt={`Icon of ${building.name}`}
                        width={40}
                        height={40}
                        onClick={() => addBuildEvent()}
                    />
                </div>
            </Tooltip>
        )
    }

    return (
        <Tooltip tooltipContent={building.tooltipBuildContent}>
            <div className={"buildEventButtonInactive"}>
                <Image
                    src={building.img}
                    alt={`Icon of ${building.name}`}
                    width={40}
                    height={40}
                />
            </div>
        </Tooltip>
    )
}
export default BuildingEventButton