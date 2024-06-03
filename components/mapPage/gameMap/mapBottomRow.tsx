import "@/styles/gameMap/gameMap.css";
import "@/styles/global/global.css";
import ArrowKeyNavigator from "./arrowKeyNavigator";
import {MapCoordinates, MapMove} from "../../../types/mapTypes";

interface Props {
    mouseOverTile: MapCoordinates | null
    moveCenterViewPoint: (direction: MapMove) => void;
}

const MapBottomRow = ({mouseOverTile, moveCenterViewPoint}: Props) => {

    return (
        <div className={"mapBottomRow w-full h-8 flex flex-row"}>
            <div>Tile: {mouseOverTile?.x}:{mouseOverTile?.y}</div>
            <ArrowKeyNavigator moveCenterViewPoint={moveCenterViewPoint}></ArrowKeyNavigator>
        </div>
    )
}
export default MapBottomRow