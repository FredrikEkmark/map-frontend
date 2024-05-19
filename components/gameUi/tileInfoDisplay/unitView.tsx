import "@/styles/resourceBar/resourceBar.css";
import "@/styles/global/global.css";
import {GameEventType} from "../../../types/eventTypes";
import {MapCoordinates, MapTileData} from "../../../types/mapTypes";
import {useEffect, useState} from "react";
import Tooltip from "../../global/tooltip";
import {Army} from "../../../types/unitTypes";
import DivideArmyView from "./divideArmyView";
import MoveArmyView from "./moveArmyView";
import {NONE} from "../../../types/playerViewTypes";

interface Props {
    addEvent: (evenType: GameEventType, eventData: any, cost: any) => Promise<boolean>,
    ownerTileIsAdjacent: boolean,
    setUnitView: (state: boolean) => void
    tile: MapTileData
    moveCoordinates: MapCoordinates | null,
    setRequestingMoveCoordinates: (state: boolean) => void,

}
const UnitView = ({addEvent, ownerTileIsAdjacent, setUnitView, tile, moveCoordinates, setRequestingMoveCoordinates} : Props) => {
    const [moveArmyView, setMoveArmyView] = useState<boolean>(false)
    const [divideArmyView, setDivideArmyView] = useState<boolean>(false)
    const [dividedRegiments, setDividedRegiments] = useState<string[]>([])

    useEffect(() => {
        setMoveArmyView(false)
        setDivideArmyView(false)
    }, [tile]);

    const eventButtons = () => {

        if (!tile.army) {
            return <></>
        }

        const army: Army = tile.army

        const eventButtons: JSX.Element[] = []

        if (tile.tileOwner !== tile.army.owner && tile.tileOwner !== NONE) {

            if (ownerTileIsAdjacent) {

                const conquerTooltipContent = (
                    <div className={"tooltipContent"}>
                        <p>Conquer Tile</p>
                    </div>
                )

                const conquerButtonElement = (
                    <Tooltip key={"conquer"} tooltipContent={conquerTooltipContent} bottomDistance={100}>
                        <button className={"addEventButton"} onClick={() => addEvent(
                            GameEventType.CONQUER_EVENT,
                            {armyId: army.armyId},
                            {manpower: 0}).then(() => setUnitView(false))
                        }>
                            Conquer Tile
                        </button>
                    </Tooltip>)

                eventButtons.push(conquerButtonElement)
            }

            const raidTooltipContent = (
                <div className={"tooltipContent"}>
                    <p>Raid Tile</p>
                </div>
            )

            const raidButtonElement = (
                <Tooltip key={"raid"} tooltipContent={raidTooltipContent} bottomDistance={100}>
                    <button className={"addEventButton"} onClick={() => addEvent(
                        GameEventType.RAID_EVENT,
                        {armyId: army.armyId},
                        {manpower: 0}).then(() => setUnitView(false))
                    }>
                        Raid Tile
                    </button>
                </Tooltip>)

            eventButtons.push(raidButtonElement)

        } else if (tile.tileOwner === tile.army.owner) {

            const fortifyTooltipContent = (
                <div className={"tooltipContent"}>
                    <p>Fortify Tile</p>
                </div>
            )

            const fortifyButtonElement = (
                <Tooltip key={"fortify"} tooltipContent={fortifyTooltipContent} bottomDistance={100}>
                    <button className={"addEventButton"} onClick={() => addEvent(
                        GameEventType.FORTIFY_EVENT,
                        {armyId: army.armyId},
                        {manpower: 0}).then(() => setUnitView(false))
                    }>
                        Fortify Tile
                    </button>
                </Tooltip>)

            eventButtons.push(fortifyButtonElement)

        }

        const moveTooltipContent = (
            <div className={"tooltipContent"}>
                <p>Move Army</p>
            </div>
        )

        const moveButtonElement = (
            <Tooltip key={"move"} tooltipContent={moveTooltipContent} bottomDistance={100}>
                <button className={"addEventButton"} onClick={() => {
                    setMoveArmyView(true)
                    setRequestingMoveCoordinates(true)
                }}>
                    Move Army
                </button>
            </Tooltip>)

        eventButtons.push(moveButtonElement)

        const splitTooltipContent = (
            <div className={"tooltipContent"}>
                <p>Split Army</p>
            </div>
        )

        const splitButtonElement = (
            <Tooltip key={"split"} tooltipContent={splitTooltipContent} bottomDistance={100}>
                <button className={"addEventButton"} onClick={() => {
                    setDivideArmyView(true)
                    setMoveArmyView(true)
                }}>
                    Split Army
                </button>
            </Tooltip>)

        eventButtons.push(splitButtonElement)

        if (tile.tileOwner === tile.army.owner) {

            const dismissTooltipContent = (
                <div className={"tooltipContent"}>
                    <p>Dismiss Regiments</p>
                </div>
            )

            const dismissButtonElement = (
                <Tooltip key={"dismiss"} tooltipContent={dismissTooltipContent} bottomDistance={100}>
                    <button className={"addEventButton"} onClick={() => setDivideArmyView(true)
                    }>
                        Dismiss Regiments
                    </button>
                </Tooltip>)

            eventButtons.push(dismissButtonElement)
        }

        return eventButtons
    }

    if (divideArmyView) {
        if (tile.army) {
            return <DivideArmyView addEvent={addEvent}
                                   setDivideArmyView={setDivideArmyView}
                                   setDivideRegiments={setDividedRegiments}
                                   moveArmyView={moveArmyView}
                                   setMoveArmyView={setMoveArmyView}
                                   army={tile.army}
                                   setUnitView={setUnitView}
                                   setRequestingMoveCoordinates={setRequestingMoveCoordinates}></DivideArmyView>
        } else {
            setDividedRegiments([])
            setDivideArmyView(false)
            setMoveArmyView(false)
        }
    }

    if (moveArmyView) {
        if (tile.army) {
            return <MoveArmyView
                moveCoordinates={moveCoordinates}
                addEvent={addEvent}
                dividedRegiments={dividedRegiments}
                army={tile.army}
                setDivideRegiments={setDividedRegiments}
                setMoveArmyView={setMoveArmyView}
                setUnitView={setUnitView}
                setRequestingMoveCoordinates={setRequestingMoveCoordinates}></MoveArmyView>
        } else {
            setDividedRegiments([])
            setDivideArmyView(false)
            setMoveArmyView(false)
        }
    }


    return <div className={"tileInfoDisplay"}><div className={"unitEventButtons"}>{eventButtons()}</div></div>

}
export default UnitView