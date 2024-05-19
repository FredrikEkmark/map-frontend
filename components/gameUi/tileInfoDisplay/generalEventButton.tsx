import "@/styles/resourceBar/resourceBar.css";
import "@/styles/global/global.css";
import {eventName} from "../../../functions/utility/eventUtility";
import Image from "next/image";
import Tooltip from "../../global/tooltip";
import {GameEvent, GameEventType} from "../../../types/eventTypes";
import {getRecruitedUnitFromBuilding} from "../../../types/unitTypes";
import {MapTileData} from "../../../types/mapTypes";
interface Props {
    addEvent: (evenType: GameEventType, eventData: any, cost: any) => Promise<boolean>,
    removeEvent: (eventId: string) => void,
    explorable: boolean,
    claimable: boolean,
    buildable: boolean,
    demolishable: boolean,
    recruitable: boolean,
    tile: MapTileData,
    tileEvents: GameEvent[]
    generalEventButtonClass: string,
    setGeneralEventButtonClass: (state: string) => void,
    recruitEventButtonClass: string,
    setRecruitEventButtonClass: (state: string) => void,
    setBuildView: (state: boolean) => void,
}
const GeneralEventButton = ({
                                addEvent,
                                removeEvent,
                                explorable,
                                claimable,
                                buildable,
                                demolishable,
                                recruitable,
                                tile,
                                tileEvents,
                                generalEventButtonClass,
                                setGeneralEventButtonClass,
                                recruitEventButtonClass,
                                setRecruitEventButtonClass,
                                setBuildView
}: Props) => {

    const eventButtons = () => {

        if (tileEvents?.length > 0) {
            return tileEvents.map((event, index) => (
                <div className={"addEventButton"} key={event.eventId}>
                    <div className={"textRow"}>
                        {eventName(event)}
                        <button onClick={() => removeEvent(event.eventId)}>
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
                    <button className={generalEventButtonClass} onClick={() => addEvent(
                        GameEventType.EXPLORE_EVENT,
                        {},
                        {manpower: 50})
                        .then(r => r ? null : setGeneralEventButtonClass("addEventButtonReject"))}>
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

            const claimTileButtonElement = (
                <Tooltip tooltipContent={tooltipContent} bottomDistance={100}>
                    <button className={generalEventButtonClass} onClick={() => addEvent(
                        GameEventType.CLAIM_TILE_EVENT,
                        {},
                        {manpower: manpowerCost})
                        .then(r => r ? null : setGeneralEventButtonClass("addEventButtonReject"))}>
                        Claim Tile
                    </button>
                </Tooltip>)

            const eventButtonArray = [claimTileButtonElement]
            return (eventButtonArray)
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

            const builtButtonElement = (
                <Tooltip tooltipContent={tooltipContent} bottomDistance={100}>
                    <button className={generalEventButtonClass} onClick={() => setBuildView(true)}>
                        Build
                    </button>
                </Tooltip>)

            const eventButtonArray = [builtButtonElement]
            return (eventButtonArray)

        }

        if (demolishable) {

            const demolishManpowerCost = 0

            const tooltipContentDemolish = (
                <div className={"tooltipContent"}>
                    <p>Demolish Event</p>
                    <div className={"textRow"}>
                        <p>Manpower Cost: </p><p>{demolishManpowerCost}</p>
                    </div>
                </div>
            )

            const demolishEventButtonElement = (
                <Tooltip key={"demolish"} tooltipContent={tooltipContentDemolish} bottomDistance={100}>
                    <button className={generalEventButtonClass} onClick={() => addEvent(
                        GameEventType.DEMOLISH_EVENT,
                        {},
                        {manpower: demolishManpowerCost})
                        .then(r => r ? null : setGeneralEventButtonClass("addEventButtonReject"))}>
                        Demolish Building
                    </button>
                </Tooltip>)

            if (recruitable) {

                const unit = getRecruitedUnitFromBuilding(tile.building.type.type)

                if (!unit) {
                    return demolishEventButtonElement
                }

                const recruitCost = unit.recruitCost


                const tooltipContentRecruit = (
                    <div className={"tooltipContent"}>
                        <div className={"textRow"}>
                            <p>Recruit Event</p>
                            <p>{unit.name} </p>
                        </div>
                        {recruitCost.manpower ? <div className={"textRow"}>
                            <p>Manpower Cost: </p><p>{recruitCost?.manpower}</p>
                        </div>: <></> }
                        {recruitCost.iron ? <div className={"textRow"}>
                            <p>Iron Cost: </p><p>{recruitCost?.iron}</p>
                        </div>: <></> }
                        {recruitCost.horses ? <div className={"textRow"}>
                            <p>Horses Cost: </p><p>{recruitCost?.horses}</p>
                        </div>: <></> }
                        {recruitCost.wood ? <div className={"textRow"}>
                            <p>Wood Cost: </p><p>{recruitCost?.wood}</p>
                        </div>: <></> }
                        {recruitCost.simpleClothes ? <div className={"textRow"}>
                            <p>Simple Clothes Cost: </p><p>{recruitCost?.simpleClothes}</p>
                        </div>: <></> }
                    </div>
                )

                const recruitEventButtonElement = (
                    <Tooltip key={"recruit"} tooltipContent={tooltipContentRecruit} bottomDistance={100}>
                        <button className={recruitEventButtonClass} onClick={() => addEvent(
                            GameEventType.RECRUIT_EVENT,
                            {},
                            recruitCost)
                            .then(r => r ? null : setRecruitEventButtonClass("addEventButtonReject"))}>
                            Recruit Regiment
                        </button>
                    </Tooltip>
                )

                const eventButtonArray = [recruitEventButtonElement, demolishEventButtonElement]
                return (eventButtonArray)
            }

            return demolishEventButtonElement
        }
    }

    return eventButtons()
}
export default GeneralEventButton