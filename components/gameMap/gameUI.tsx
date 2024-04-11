import "@/styles/ui-style.css";
import TileInfoDisplay from "./tileInfoDisplay";
import {GameMapData, MapCoordinates, PlayerViewData} from "../../types/playerViewTypes";
import {getPlayerNumberFromInput} from "../../types/enums";

interface Props {
    markedTile: MapCoordinates | null,
    playerViewData: PlayerViewData,
}

const GameUI = ({markedTile, playerViewData}: Props) => {

    return (
        <div className={"userInterface"}>
            <div></div>
            <TileInfoDisplay playerNr={playerViewData.playerNr} markedTile={markedTile} mapData={playerViewData.mapData}></TileInfoDisplay>
        </div>
    )
}
export default GameUI