import "@/styles/ui-style.css";
import {GameEvent, GameEventType} from "../../types/eventTypes";
import {GameMapData, MapCoordinates} from "../../types/mapTypes";
import {eventName} from "../../functions/utility/eventUtility";
import Image from "next/image";

interface Props {
    eventsData: GameEvent[],
    setMarkedTile: (coordinate: MapCoordinates | null) => void,
    removeEvent: (coordinates: MapCoordinates) => void,
    mapData: GameMapData,
    setCenterViewCoordinates: (coordinates: MapCoordinates) => void,
}
const ActionInterface = ({eventsData, setMarkedTile, setCenterViewCoordinates, removeEvent} : Props) => {

    const click = (coordinates: MapCoordinates) => {
        setMarkedTile(coordinates)
        setCenterViewCoordinates(coordinates)
    }

    const renderEventsList = () => {
        return eventsData.map((event) => {
            return (<div className={"eventListing"} key={event.eventId}>
                <div className={"textRow"}>
                    {eventName(event)}<button onClick={() => removeEvent(event.primaryTileCoordinates)}><Image src={"/media/images/ui/close.png"} alt={"remove"} width={14} height={14} /></button>
                </div>
                <div className={"textRow"} onClick={() => click(event.primaryTileCoordinates)}>
                <p>Coordinates:</p> {event.primaryTileCoordinates.x}:{event.primaryTileCoordinates.y}
                </div>
            </div>)
        })
    }

    return (
        <div className={"actionInterface"}>
            {renderEventsList()}
        </div>
    )
}
export default ActionInterface