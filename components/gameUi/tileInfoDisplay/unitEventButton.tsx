import Tooltip from "../../global/tooltip";
import "@/styles/gameUi/gameUi.css";
import "@/styles/global/global.css";
import {GameEvent} from "../../../types/eventTypes";
import {eventName} from "../../../functions/utility/eventUtility";
import Image from "next/image";

interface Props {
    ownedUnitPresent: boolean,
    tileEvents: GameEvent[],
    setUnitView: (state :boolean) => void,
    removeEvent: (eventId: string) => void,

}
const UnitEventButton = ({ownedUnitPresent, tileEvents, setUnitView, removeEvent} : Props) => {

    if (tileEvents.length > 0) {
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

    if (ownedUnitPresent) {

        const tooltipContent = (
            <div className={"tooltipContent"}>
                <p>Unit Event</p>
                <div className={"textRow"}>
                </div>
            </div>
        )

        return (<Tooltip tooltipContent={tooltipContent} bottomDistance={100}>
            <button key={"unit"} className={"addEventButton"} onClick={() => setUnitView(true)}>
                Unit
            </button>
        </Tooltip>)
    }
}
export default UnitEventButton

