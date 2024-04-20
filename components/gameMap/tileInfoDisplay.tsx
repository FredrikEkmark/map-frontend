import "@/styles/ui-style.css";
import {useEffect, useState} from "react";
import {ownerIsAdjacent, visibleIsAdjacent} from "../../functions/mapAdjacency/mapAdjaceny";
import {GameMapData, getTileTerrainValueFromInput, MapCoordinates, MapTileData} from "../../types/mapTypes";
import {getPlayerNumberFromInput, NONE, PlayerNumber} from "../../types/playerViewTypes";
import {GameEvent, GameEventType} from "../../types/eventTypes";
import {BuildingTypes, getBuildingInfo} from "../../types/buildingTypes";
import {findTileInMap} from "../../functions/utility/mapUtility";
import BuildingEventButton from "./buildingEventButton";
import {Mana} from "../../types/manaTypes";
import {eventName} from "../../functions/utility/eventUtility";
import Image from "next/image";

interface Props {
    mapData: GameMapData,
    markedTile: MapCoordinates | null,
    setCenterViewCoordinates: (coordinates: MapCoordinates) => void,
    playerNr: PlayerNumber,
    tileEvents: GameEvent[],
    addEvent: (evenType: GameEventType, eventData: any, cost: any) => void,
    removeEvent: (coordinates: MapCoordinates) => void,
    mana: Mana
}
const TileInfoDisplay = ({mapData, markedTile, setCenterViewCoordinates, playerNr, tileEvents, addEvent, removeEvent, mana}: Props) => {
    const getMarkedTileData = () => {
        if (!markedTile) {
            return null
        }

        const markedTileData = findTileInMap(markedTile, mapData.map)

        if (markedTileData) {
            return markedTileData
        }

        return {
            coordinates: { x: markedTile.x, y: markedTile.y },
            visible: false,
            tileTerrainValue: getTileTerrainValueFromInput(0),
            tileOwner: getPlayerNumberFromInput("NONE"),
            building: {type: getBuildingInfo("NONE"),
            progress: 0}
        }
    }


    const isExplorable = () => {

        if (!markedTile) {return false}
        if (!tile) {return false}
        if (tile.visible) {return false}

        return visibleIsAdjacent(markedTile, mapData.map)
    }

    const isClaimable = () => {

        if (Math.floor(mana.population/100) > 200) {return false}

        if (!markedTile) {return false}
        if (!tile) {return false}
        if (!tile.visible) {return false}
        if (tile.tileOwner !== NONE ) {return false}

        return ownerIsAdjacent(playerNr, markedTile, mapData.map)
    }

    const isBuildable = () => {

        if (!markedTile) {return false}
        if (!tile) {return false}
        if (tile.tileOwner !== playerNr ) {return false}
        if (tile.building.type.type === BuildingTypes.NONE) {
            return true
        }

        return tile.building.progress > 0 && tile.building.type.completeAtProgress > tile.building.progress // add logic to see if buildable
    }

    const [tile, setTile] = useState<MapTileData | null>(getMarkedTileData())
    const [explorable, setExplorable] = useState<boolean>(isExplorable())
    const [claimable, setClaimable] = useState<boolean>(isClaimable())
    const [buildable, setBuildable] = useState<boolean>(isBuildable())
    const [buildView, setBuildView] = useState<boolean>(false)

    useEffect(() => {
        setTile(getMarkedTileData())
        setBuildView(false)
    }, [markedTile]);

    useEffect(() => {
        setExplorable(isExplorable)
        setClaimable(isClaimable)
        setBuildable(isBuildable)
    }, [tile]);

    const eventButton = () => { // Remove, just a placeholder display

        if (tileEvents?.length > 0) {
            return tileEvents.map((event, index) => (
                <div className={"addEventButton"} key={event.eventId}>
                    <div className={"textRow"}>
                        {eventName(event)}
                        <button onClick={() => removeEvent(event.primaryTileCoordinates)}>
                            <Image src={"/media/images/ui/close.png"} alt={"remove"} width={14} height={14} />
                        </button>
                    </div>
                </div>)
            );
        }

        if (explorable) {
            return <button className={"addEventButton"} onClick={() => addEvent(GameEventType.EXPLORE_EVENT,
                {},
                {manpower: 50})}>
                Explore Tile
            </button>
        }

        if (claimable) {
            return <button className={"addEventButton"} onClick={() => addEvent(GameEventType.CLAIM_TILE_EVENT,
                {},
                {manpower: 100})}>
                Claim Tile
            </button>
        }

        if (buildable) {
            return <button className={"addEventButton"} onClick={() => setBuildView(true)}>
                Build
            </button>
        }
    }

    if (!tile) {
        return (
            <div className={"tileInfoDisplay"}></div>
        )
    }

    if (!tile.visible) {
        return (
            <div className={"tileInfoDisplay"}>
                <div onClick={() => {setCenterViewCoordinates(tile.coordinates)}}
                     className={"textRow"}>
                    <p>Coordinates:</p>
                    <p>{tile.coordinates.x}:{tile.coordinates.y}</p>
                </div>
                <div>{eventButton()}</div>
            </div>
        )
    }

    if (buildView) {
        return (<div className={"tileInfoDisplay"}>
            <div className={"buildViewDisplay"}>
                <BuildingEventButton building={getBuildingInfo("FARM")} addEvent={addEvent} setBuildView={setBuildView}></BuildingEventButton>
                <BuildingEventButton building={getBuildingInfo("GRANARY")} addEvent={addEvent} setBuildView={setBuildView}></BuildingEventButton>
                <BuildingEventButton building={getBuildingInfo("RANCH")} addEvent={addEvent} setBuildView={setBuildView}></BuildingEventButton>
                <BuildingEventButton building={getBuildingInfo("LUMBER_CAMP")} addEvent={addEvent} setBuildView={setBuildView}></BuildingEventButton>
                <BuildingEventButton building={getBuildingInfo("QUARRY")} addEvent={addEvent} setBuildView={setBuildView}></BuildingEventButton>
                <BuildingEventButton building={getBuildingInfo("CARPENTRY")} addEvent={addEvent} setBuildView={setBuildView}></BuildingEventButton>
                <BuildingEventButton building={getBuildingInfo("LEATHER_WORKER")} addEvent={addEvent} setBuildView={setBuildView}></BuildingEventButton>
                <BuildingEventButton building={getBuildingInfo("FISHERY")} addEvent={addEvent} setBuildView={setBuildView}></BuildingEventButton>
                <BuildingEventButton building={getBuildingInfo("VILLAGE")} addEvent={addEvent} setBuildView={setBuildView}></BuildingEventButton>
            </div>
        </div>)
    }

    return (
        <div className={"tileInfoDisplay"}>
            <div>
            <div onClick={() => {setCenterViewCoordinates(tile.coordinates)}} className={"textRow"}><p>Coordinates:</p><p>{tile.coordinates.x}:{tile.coordinates.y}</p> </div>
            <div className={"textRow"}><p>Terrain:</p><p>{tile.tileTerrainValue.name}</p></div>
            {(tile.building.type.name !== "none") && (
                <div className={"textRow"}><p>Building:</p><p>{tile.building.type.name}</p></div>
            )}
            {!(tile.building.progress === 0 || tile.building.type.completeAtProgress === tile.building.progress) && (
                    <div className={"textRow"}><p>Progress:</p><p>{tile.building.progress}/{tile.building.type.completeAtProgress}</p></div>
            )}
            </div>
            <div>{eventButton()}</div>
        </div>
    )
}
export default TileInfoDisplay