import "@/styles/ui-style.css";
import Image from "next/image";
import {BuildingInfo, BuildingTypes} from "../../types/buildingTypes";
import {GameEventType} from "../../types/eventTypes";

interface Props {
    building: BuildingInfo,
    addEvent: (evenType: GameEventType, eventData: any, cost: any) => void,
    setBuildView: (state: boolean) => void

}
const BuildingEventButton = ({building, addEvent, setBuildView} : Props) => {

    const clicked = () => {
        addEvent(GameEventType.BUILD_EVENT, {building: building.type},
            {manpower: 200});
        setBuildView(false);
    }

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
export default BuildingEventButton