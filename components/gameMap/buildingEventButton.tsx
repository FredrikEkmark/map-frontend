import "@/styles/ui-style.css";
import Image from "next/image";
import {BuildingInfo, BuildingTypes} from "../../types/buildingTypes";
import {GameEventType} from "../../types/eventTypes";
import {MapTileData} from "../../types/mapTypes";

interface Props {
    building: BuildingInfo,
    addEvent: (evenType: GameEventType, eventData: any, cost: any) => void,
    setBuildView: (state: boolean) => void,
    tile: MapTileData | null

}
const BuildingEventButton = ({building, addEvent, setBuildView, tile} : Props) => {

    const buildable = () => {

        if (tile) {
            return building.buildableElevation.includes(tile.tileTerrainValue.elevation)
        }
        return false
    }

    const clicked = () => {
        addEvent(GameEventType.BUILD_EVENT, {building: building.type},
            {manpower: 200});
        setBuildView(false);
    }

    if (buildable()) {
        return (
            <div className={"buildEventButton"}>
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