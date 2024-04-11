import "@/styles/map-style.css";
import ArrowKeyNavigator from "./arrowKeyNavigator";
import {GameMapData, MapCoordinates} from "../../types/playerViewTypes";
import {MapMove} from "../../types/enums";

interface Props {
    markedTile: MapCoordinates | null
    moveCenterViewPoint: (direction: MapMove) => void;
}

const MapBottomRow = ({markedTile, moveCenterViewPoint}: Props) => {

    return (
        <div className={"mapBottomRow w-full h-8 flex flex-row"}>
            <div>MarkedTile: {markedTile?.x}:{markedTile?.y}</div>
            <ArrowKeyNavigator moveCenterViewPoint={moveCenterViewPoint}></ArrowKeyNavigator>
        </div>
    )
}
export default MapBottomRow