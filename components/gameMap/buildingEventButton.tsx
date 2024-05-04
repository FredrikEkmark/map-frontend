import "@/styles/ui-style.css";
import Image from "next/image";
import {BuildingInfo, BuildingTypes} from "../../types/buildingTypes";
import {GameEventType} from "../../types/eventTypes";
import {MapTileData} from "../../types/mapTypes";
import {useState} from "react";

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

    const clicked = () => {

        let manpowerCost = 200;

        if (tile) {
              manpowerCost = Math.min(building.completeAtProgress - tile.building.progress, manpowerCost)
        }

        addEvent(GameEventType.BUILD_EVENT, {building: building.type},
            {manpower: manpowerCost}).then(r => r ? setBuildView(false) : setButtonClass("buildEventButtonReject"));

    }

    if (buildable()) {
        return (
            <div className={buttonClass}>
                <Image
                    src={building.img}
                    alt={`Icon of ${building.name}`}
                    width={40}
                    height={40}
                    onClick={() => clicked()}
                />
            </div>
        )
    }

    return (
        <div className={"buildEventButtonInactive"}>
            <Image
                src={building.img}
                alt={`Icon of ${building.name}`}
                width={40}
                height={40}
            />
        </div>
    )
}
export default BuildingEventButton