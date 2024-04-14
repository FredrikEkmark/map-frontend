import "@/styles/ui-style.css";
import {useEffect, useState} from "react";
import {findTileInMap} from "../../functions/utility/mapUtility";
import {ownerIsAdjacent, visibleIsAdjacent} from "../../functions/mapAdjacency/mapAdjaceny";
import {GameMapData, MapCoordinates, MapTileData} from "../../types/mapTypes";
import {getPlayerNumberFromInput, NONE, PlayerNumber} from "../../types/playerViewTypes";
import {GameEvent, GameEventType} from "../../types/eventTypes";

interface Props {
    mapData: GameMapData,
    markedTile: MapCoordinates | null,
    playerNr: PlayerNumber,
    event: GameEvent | undefined,
    addEvent: (evenType: GameEventType, eventData: any) => void,
    removeEvent: () => void,
}
const TileInfoDisplay = ({mapData, markedTile, playerNr, event, addEvent, removeEvent}: Props) => {
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

    const isBuildable = () => {
        return false // add logic to see if buildable
    }

    const [tile, setTile] = useState<MapTileData | null>(getMarkedTileData())
    const [explorable, setExplorable] = useState<boolean>(isExplorable())
    const [claimable, setClaimable] = useState<boolean>(isClaimable())
const [buildable, setBuildable] = useState<boolean>(isBuildable())

    useEffect(() => {
        setTile(getMarkedTileData)
    }, [markedTile]);

    useEffect(() => {
        setExplorable(isExplorable)
        setClaimable(isClaimable)
        setBuildable(isBuildable)
    }, [tile]);

    const eventButton = () => { // Remove, just a placeholder display

        if (event) {
            return <button onClick={() => removeEvent()}>
                Remove event
            </button>
        }

        if (explorable) {
            return <button onClick={() => addEvent(GameEventType.EXPLORE_EVENT, {})}>
                Explore
            </button>
        }

        if (claimable) {
            return <button onClick={() => addEvent(GameEventType.CLAIM_TILE_EVENT, {})}>
                Claim
            </button>
        }

        if (buildable) {
            return <button onClick={() => addEvent(GameEventType.EXPLORE_EVENT, {})}>
                Build
            </button>
        }
    }

    if (!tile) {
        return (
            <div className={"tileInfoDisplay"}>
                No tile
            </div>
        )
    }

    if (!tile.visible) {
        return (
            <div className={"tileInfoDisplay"}>
                Tile is not visible
                {eventButton()}
            </div>
        )
    }

    return (
        <div className={"tileInfoDisplay"}>
            There is tile
            {eventButton()}
        </div>
    )
}
export default TileInfoDisplay