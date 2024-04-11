import "@/styles/ui-style.css";
import {GameMapData, MapCoordinates, MapTileData} from "../../types/playerViewTypes";
import {getPlayerNumberFromInput, NONE, PlayerNumber} from "../../types/enums";
import {useEffect, useState} from "react";
import {findTileInMap} from "../../functions/utility/mapUtility";
import {ownerIsAdjacent, visibleIsAdjacent} from "../../functions/mapAdjacency/mapAdjaceny";

interface Props {
    mapData: GameMapData,
    markedTile: MapCoordinates | null
    playerNr: PlayerNumber
}
const TileInfoDisplay = ({mapData, markedTile, playerNr}: Props) => {
    const getMarkedTileData = () => {
        if (!markedTile) {
            return null
        }

        const markedTileData = findTileInMap(markedTile, mapData.map)

        if (markedTileData) {
            return markedTileData
        }

        return { coordinates: { x: markedTile.x, y: markedTile.y }, visible: false, tileTerrainValue: 0, tileOwner: getPlayerNumberFromInput("NONE") }
    }

    const isExplorable = () => {

        if (!markedTile) {return false}

        if (!tile) {return false}

        if (tile.visible) {return false}

        return visibleIsAdjacent(markedTile, mapData.map)
    }

    const isClaimable = () => {
        if (!markedTile) {return false}

        if (!tile) {return false}

        if (!tile.visible) {return false}

        if (tile.tileOwner !== NONE ) {return false}

        return ownerIsAdjacent(playerNr, markedTile, mapData.map)
    }

    const [tile, setTile] = useState<MapTileData | null>(getMarkedTileData())
    const [explorable, setExplorable] = useState<boolean>(isExplorable())
    const [claimable, setClaimable] = useState<boolean>(isClaimable())

    useEffect(() => {
        setTile(getMarkedTileData)
    }, [markedTile]);

    useEffect(() => {
        setExplorable(isExplorable)
        setClaimable(isClaimable)
    }, [tile]);

    if (!tile) {
        return (
            <div className={"tileInfoDisplay"}>
                No tile
            </div>
        )
    }

    const explore = () => { // Remove, just a placeholder display
        if (explorable) {
            return "Yes"
        }

        return "No"
    }

    const claim = () => { // Remove, just a placeholder display
        if (claimable) {
            return "Yes"
        }

        return "No"
    }

    if (!tile.visible) {
        return (
            <div className={"tileInfoDisplay"}>
                Tile is not visible
                Explorable: {explore()}
            </div>
        )
    }

    return (
        <div className={"tileInfoDisplay"}>
            There is tile
            Claimable: {claim()}
        </div>
    )
}
export default TileInfoDisplay