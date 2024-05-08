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
import Tooltip from "./tooltip";

interface Props {
    mapData: GameMapData,
    markedTile: MapCoordinates | null,
    setCenterViewCoordinates: (coordinates: MapCoordinates) => void,
    playerNr: PlayerNumber,
    tileEvents: GameEvent[],
    addEvent: (evenType: GameEventType, eventData: any, cost: any) => Promise<boolean>,
    removeEvent: (coordinates: MapCoordinates) => void,
    mana: Mana
    playerOwnedTiles: number,
}
const TileInfoDisplay = ({mapData, markedTile, setCenterViewCoordinates, playerNr, tileEvents, addEvent, removeEvent, mana, playerOwnedTiles}: Props) => {
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
            building: {type: getBuildingInfo(BuildingTypes.NONE),
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

        const populationAllowsMoreTiles = Math.floor(mana.population/100) > playerOwnedTiles

        if (!populationAllowsMoreTiles) {return false}

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
    const [addEventButtonClass, setAddEventButtonClass] = useState<string>("addEventButton")

    useEffect(() => {
        setTile(getMarkedTileData())
        setBuildView(false)
        setAddEventButtonClass("addEventButton")
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

            const manpowerCost = 100

            const tooltipContent = (
                <div className={"tooltipContent"}>
                    <p>Explore Event</p>
                    <div className={"textRow"}>
                        <p>Manpower Cost: </p><p>{manpowerCost}</p>
                    </div>
                </div>
            )

            return (
                <Tooltip tooltipContent={tooltipContent} bottomDistance={100}>
                    <button className={addEventButtonClass} onClick={() => addEvent(
                        GameEventType.EXPLORE_EVENT,
                        {},
                        {manpower: 50})
                        .then(r => r ? null : setAddEventButtonClass("addEventButtonReject"))}>
                        Explore Tile
                    </button>
                </Tooltip>)
        }

        if (claimable) {

            const manpowerCost = 100

            const tooltipContent = (
                <div className={"tooltipContent"}>
                    <p>Claim Tile Event</p>
                    <div className={"textRow"}>
                        <p>Manpower Cost: </p><p>{manpowerCost}</p>
                    </div>
                </div>
            )

            return (
                <Tooltip tooltipContent={tooltipContent} bottomDistance={100}>
                    <button className={addEventButtonClass} onClick={() => addEvent(
                        GameEventType.CLAIM_TILE_EVENT,
                        {},
                        {manpower: manpowerCost})
                        .then(r => r ? null : setAddEventButtonClass("addEventButtonReject"))}>
                        Claim Tile
                    </button>
                </Tooltip>)
        }

        if (buildable) {

            const manpowerCost = 200

            const tooltipContent = (
                <div className={"tooltipContent"}>
                    <p>Build Event</p>
                    <div className={"textRow"}>
                        <p>Manpower Cost: </p><p>{manpowerCost}</p>
                    </div>
                </div>
            )

            return (
                <Tooltip tooltipContent={tooltipContent} bottomDistance={100}>
                    <button className={addEventButtonClass} onClick={() => setBuildView(true)}>
                        Build
                    </button>
                </Tooltip>)
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
                <div onClick={() => {setCenterViewCoordinates({x: (Math.round(tile?.coordinates.x / 2)) * 2, y: tile.coordinates.y})}}
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
                <BuildingEventButton building={getBuildingInfo(BuildingTypes.FARM)} addEvent={addEvent} setBuildView={setBuildView} tile={getMarkedTileData()}></BuildingEventButton>
                <BuildingEventButton building={getBuildingInfo(BuildingTypes.GRANARY)} addEvent={addEvent} setBuildView={setBuildView} tile={getMarkedTileData()}></BuildingEventButton>
                <BuildingEventButton building={getBuildingInfo(BuildingTypes.RANCH)} addEvent={addEvent} setBuildView={setBuildView} tile={getMarkedTileData()}></BuildingEventButton>
                <BuildingEventButton building={getBuildingInfo(BuildingTypes.LUMBER_CAMP)} addEvent={addEvent} setBuildView={setBuildView} tile={getMarkedTileData()}></BuildingEventButton>
                <BuildingEventButton building={getBuildingInfo(BuildingTypes.QUARRY)} addEvent={addEvent} setBuildView={setBuildView} tile={getMarkedTileData()}></BuildingEventButton>
                <BuildingEventButton building={getBuildingInfo(BuildingTypes.CARPENTRY)} addEvent={addEvent} setBuildView={setBuildView} tile={getMarkedTileData()}></BuildingEventButton>
                <BuildingEventButton building={getBuildingInfo(BuildingTypes.LEATHER_WORKER)} addEvent={addEvent} setBuildView={setBuildView} tile={getMarkedTileData()}></BuildingEventButton>
                <BuildingEventButton building={getBuildingInfo(BuildingTypes.FISHERY)} addEvent={addEvent} setBuildView={setBuildView} tile={getMarkedTileData()}></BuildingEventButton>
                <BuildingEventButton building={getBuildingInfo(BuildingTypes.VILLAGE)} addEvent={addEvent} setBuildView={setBuildView} tile={getMarkedTileData()}></BuildingEventButton>
            </div>
        </div>)
    }

    return (
        <div className={"tileInfoDisplay"}>
            <div>
            <div className={"textRow"}
                onClick={() => {setCenterViewCoordinates({x: (Math.round(tile?.coordinates.x / 2)) * 2, y: tile.coordinates.y})}}>
                <p>Coordinates:</p>
                <p>{tile.coordinates.x}:{tile.coordinates.y}</p>
            </div>
            <div className={"textRow"}>
                <p>Terrain:</p>
                <Tooltip tooltipContent={tile.tileTerrainValue.tooltipContent} bottomDistance={150}>
                    <p>{tile.tileTerrainValue.name}</p>
                </Tooltip>
            </div>
            {(tile.building.type.name !== "none") && (
                <div className={"textRow"}>
                    <p>Building:</p>
                    <Tooltip tooltipContent={tile.building.type.tooltipContent}>
                        <p>{tile.building.type.name}</p>
                    </Tooltip>
                </div>
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