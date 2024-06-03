import "@/styles/gameUi/gameUi.css";
import "@/styles/global/global.css";
import {ReactNode, useEffect, useState} from "react";
import {ownerIsAdjacent, visibleIsAdjacent} from "../../../../functions/mapAdjacency/mapAdjaceny";
import {GameMapData, getTileTerrainValueFromInput, MapCoordinates, MapTileData} from "../../../../types/mapTypes";
import {getPlayerNumberFromInput, NONE, PlayerNumber} from "../../../../types/playerViewTypes";
import {GameEvent, GameEventType} from "../../../../types/eventTypes";
import {BuildingTypes, getBuildingInfo} from "../../../../types/buildingTypes";
import {findTileInMap} from "../../../../functions/utility/mapUtility";
import BuildingEventButton from "./buildingEventButton";
import {Mana} from "../../../../types/manaTypes";
import Tooltip from "../../global/tooltip";
import GeneralEventButton from "./generalEventButton";
import UnitEventButton from "./unitEventButton";
import BuildView from "./buildView";
import UnitView from "./unitView";

interface Props {
    mapData: GameMapData,
    markedTile: MapCoordinates | null,
    setCenterViewCoordinates: (coordinates: MapCoordinates) => void,
    playerNr: PlayerNumber,
    tileEvents: GameEvent[],
    addEvent: (evenType: GameEventType, eventData: any, cost: any) => Promise<boolean>,
    removeEvent: (eventId: string) => void,
    mana: Mana
    playerOwnedTiles: number,
    moveCoordinates: MapCoordinates | null,
    setRequestingMoveCoordinates: (state: boolean) => void,
    unitValidMoveLocations: MapCoordinates[],

}
const TileInfoDisplay = ({mapData, markedTile, setCenterViewCoordinates, playerNr, tileEvents, addEvent, removeEvent, mana, playerOwnedTiles, moveCoordinates, setRequestingMoveCoordinates, unitValidMoveLocations}: Props) => {

    const getGeneralEvents = (): GameEvent[] => {
        return tileEvents.filter((event: GameEvent) => {
            return event.eventType == GameEventType.EXPLORE_EVENT ||
                event.eventType == GameEventType.CLAIM_TILE_EVENT ||
                event.eventType == GameEventType.BUILD_EVENT ||
                event.eventType == GameEventType.DEMOLISH_EVENT ||
                event.eventType == GameEventType.RECRUIT_EVENT
        });
    }

    const getUnitEvents = (): GameEvent[] => {
        return tileEvents.filter((event: GameEvent) => {
            return event.eventType == GameEventType.DISMISS_EVENT ||
                event.eventType == GameEventType.MOVE_EVENT ||
                event.eventType == GameEventType.SPLIT_ARMY_EVENT ||
                event.eventType == GameEventType.CONQUER_EVENT ||
                event.eventType == GameEventType.RAID_EVENT ||
                event.eventType == GameEventType.FORTIFY_EVENT
        });
    }

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
            progress: 0},
            army: null,
        }
    }

    const getArmyToolTip = (): ReactNode => {
        const tile = getMarkedTileData()
        if (!tile) {
            return <></>
        }

        if (!tile.army) {
            return <></>
        }

        return (
            <div className={"tooltipContent"}>
                <p>{tile.army.armyName}</p>
                <div className={"textRow"}>
                    <p>Regiments: </p><p>{tile.army.regiments.length}</p>
                </div>
                {tile.army.regiments.map(regiment => (
                    <div key={regiment.regimentName} className={"textRow"}>
                        <p>{regiment.regimentName}</p>
                        <p>{regiment.unitAmount}</p>
                    </div>
                ))}

            </div>
        )
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

    const isDemolishable = () => {

        if (!markedTile) {return false}
        if (!tile) {return false}
        if (tile.tileOwner !== playerNr ) {return false}
        if (tile.building.type.type === BuildingTypes.VILLAGE) {return false}
        return tile.building.type.completeAtProgress === tile.building.progress;


    }

    const isRecruitable = () => {
        if (!isDemolishable()) {return false}
        if (!tile) {return false}
        return tile.building.type.type === BuildingTypes.BARRACK ||
            tile.building.type.type === BuildingTypes.ARCHERY_RANGE ||
            tile.building.type.type === BuildingTypes.STABLE;
    }

    const isOwnedUnitPresent = () => {
        if (!tile) {return false}
        if (!tile.army) {return false}
        return tile.army.owner === playerNr
    }

    const [tile, setTile] = useState<MapTileData | null>(getMarkedTileData())
    const [explorable, setExplorable] = useState<boolean>(isExplorable())
    const [claimable, setClaimable] = useState<boolean>(isClaimable())
    const [buildable, setBuildable] = useState<boolean>(isBuildable())
    const [demolishable, setDemolishable] = useState<boolean>(isDemolishable)
    const [recruitable, setRecruitable] = useState<boolean>(isRecruitable)
    const [ownedUnitPresent, setOwnedUnitPresent] = useState<boolean>(isOwnedUnitPresent())
    const [buildView, setBuildView] = useState<boolean>(false)
    const [unitView, setUnitView] = useState<boolean>(false)
    const [generalEventButtonClass, setGeneralEventButtonClass] = useState<string>("addEventButton")
    const [recruitEventButtonClass, setRecruitEventButtonClass] = useState<string>("addEventButton")

    useEffect(() => {
        setTile(getMarkedTileData())
        setBuildView(false)
        setUnitView(false)
        setGeneralEventButtonClass("addEventButton")
        setRecruitEventButtonClass("addEventButton")
    }, [markedTile]);

    useEffect(() => {
        setExplorable(isExplorable)
        setClaimable(isClaimable)
        setBuildable(isBuildable)
        setDemolishable(isDemolishable)
        setRecruitable(isRecruitable)
        setOwnedUnitPresent(isOwnedUnitPresent)
    }, [tile]);

    useEffect(() => {

    }, []);


    const eventButtons = () => {

        if (!tile) {
            return <></>
        }

        const unitEventButton = (<UnitEventButton ownedUnitPresent={ownedUnitPresent}
                                                  setUnitView={setUnitView}
                                                  removeEvent={removeEvent}
                                                  tileEvents={getUnitEvents()}></UnitEventButton>)

        const generalEventButton = (<GeneralEventButton addEvent={addEvent}
                                                        removeEvent={removeEvent}
                                                        explorable={explorable}
                                                        claimable={claimable}
                                                        buildable={buildable}
                                                        demolishable={demolishable}
                                                        recruitable={recruitable}
                                                        tile={tile}
                                                        tileEvents={getGeneralEvents()}
                                                        generalEventButtonClass={generalEventButtonClass}
                                                        setGeneralEventButtonClass={setGeneralEventButtonClass}
                                                        recruitEventButtonClass={recruitEventButtonClass}
                                                        setRecruitEventButtonClass={setRecruitEventButtonClass}
                                                        setBuildView={setBuildView}></GeneralEventButton>)

        return [unitEventButton, generalEventButton]
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
                <div>{eventButtons()}</div>
            </div>
        )
    }

    if (unitView) {
        const tile = getMarkedTileData()
        if (tile) {
            const ownerTileIsAdjacent = ownerIsAdjacent(playerNr, tile.coordinates, mapData.map)
            return (<UnitView addEvent={addEvent}
                              ownerTileIsAdjacent={ownerTileIsAdjacent}
                              setUnitView={setUnitView}
                              tile={tile}
                              moveCoordinates={moveCoordinates}
                              setRequestingMoveCoordinates={setRequestingMoveCoordinates}
                              unitValidMoveLocations={unitValidMoveLocations}></UnitView>)
        }
    }

    if (buildView) {
        const tile = getMarkedTileData()
        if (tile) {
            return (<BuildView addEvent={addEvent} setBuildView={setBuildView} tile={tile}></BuildView>)
        }
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
                        <Tooltip tooltipContent={tile.building.type.tooltipContent} bottomDistance={150}>
                            <p>{tile.building.type.name}</p>
                        </Tooltip>
                    </div>
                )}
                {!(tile.building.progress === 0 || tile.building.type.completeAtProgress === tile.building.progress) && (
                        <div className={"textRow"}>
                            <p>Progress:</p>
                            <p>{tile.building.progress}/{tile.building.type.completeAtProgress}</p>
                        </div>
                )}
                {tile.army !== null && (
                        <div className={"textRow"}>
                            <p>Army:</p>
                            <Tooltip tooltipContent={getArmyToolTip()} bottomDistance={150}>
                                <p>{tile.army.armyName}</p>
                            </Tooltip>
                        </div>
                )}


            </div>

            <div>{eventButtons()}</div>
        </div>
    )
}
export default TileInfoDisplay