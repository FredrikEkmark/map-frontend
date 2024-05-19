import "@/styles/gameUi/gameUi.css";
import "@/styles/global/global.css";
import {EventLog, GameEvent, GameEventType} from "../../types/eventTypes";
import {GameMapData, MapCoordinates} from "../../types/mapTypes";
import {eventName} from "../../functions/utility/eventUtility";
import Image from "next/image";
import {JSX, ReactNode, useState} from "react";
import {log} from "util";

interface Props {
    eventsData: GameEvent[],
    setMarkedTile: (coordinate: MapCoordinates | null) => void,
    removeEvent: (eventId: string) => void,
    mapData: GameMapData,
    eventLog: EventLog[],
    setCenterViewCoordinates: (coordinates: MapCoordinates) => void,
}

const ActionInterface = ({eventsData, setMarkedTile, setCenterViewCoordinates, removeEvent, eventLog}: Props) => {

    const [selectedNavPosition, setSelectedNavPosition] = useState<NavPositions>(NavPositions.EVENT_LIST)

    const isSelected = (value: NavPositions) => {
        if (selectedNavPosition === value) {
            return "selected"
        }
        return ""
    }

    const click = (coordinates: MapCoordinates) => {
        setMarkedTile(coordinates)
        setCenterViewCoordinates({x: (Math.round(coordinates.x / 2)) * 2, y: coordinates.y})
    }

    const renderSelected = () => {
        switch (selectedNavPosition) {
            case NavPositions.EVENT_LIST:
                return renderEventsList();
            case NavPositions.EVENT_LOG:
                return renderEventLog();
        }
    }

    const renderEventsList = () => {
        return eventsData.map((event) => {
            return (<div className={"eventListing"} key={event.eventId}>
                <div className={"textRow"}>
                    {eventName(event)}
                    <button onClick={() => removeEvent(event.eventId)}>
                        <Image src={"/media/images/ui/close.png"} alt={"remove"} width={14} height={14}/>
                    </button>
                </div>
                <div className={"textRow"} onClick={() => click(event.primaryTileCoordinates)}>
                    <p>Coordinates:</p> {event.primaryTileCoordinates.x}:{event.primaryTileCoordinates.y}
                </div>
            </div>)
        })
    }

    const renderEventLog = () => {
        eventLog.sort((a, b) => {
            if (a.turn !== b.turn) {
                return b.turn - a.turn;
            }
            return a.logIndex - b.logIndex;
        });

        const resultHTML: JSX.Element[] = [];

        let logKey = 0

        eventLog.forEach((logEntry: EventLog) => {
            if (logEntry.logIndex === 0) {
                resultHTML.push(<h3 className={"eventLogEntryHeadline"} key={logEntry.turn}>Turn {logEntry.turn}</h3>)
            }
            const lines = logEntry.log.split(";")
            lines.forEach((line, index) => {
                if (line.length > 0) {
                    const uniqueKey = `${logEntry.turn}-${logEntry.logIndex}-${index}`
                    resultHTML.push(<p key={uniqueKey} className={"eventLogEntryText"}>{line}</p>)
                }
            })

        })
        return resultHTML
    }

    return (
        <div className={"actionInterface"}>
            <nav className={"navigationBar"}>
                <button onClick={() => setSelectedNavPosition(NavPositions.EVENT_LIST)} className={isSelected(NavPositions.EVENT_LIST)}>Event List</button>
                <button onClick={() => setSelectedNavPosition(NavPositions.EVENT_LOG)} className={isSelected(NavPositions.EVENT_LOG)}>Event Log</button></nav>
            <div className={"actionInterfaceContent"}>{renderSelected()}</div>
        </div>
    )
}
export default ActionInterface

enum NavPositions {
    EVENT_LIST,
    EVENT_LOG
}