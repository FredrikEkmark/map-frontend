import "@/styles/global/global.css";
import "@/styles/gameUi/gameUi.css";
import {Army, Regiment} from "../../../types/unitTypes";
import {useState} from "react";
import {GameEventType} from "../../../types/eventTypes";



interface Props {
    addEvent: (evenType: GameEventType, eventData: any, cost: any) => Promise<boolean>,
    setDivideRegiments: (regiments: string[]) => void,
    setDivideArmyView: (state: boolean) => void,
    moveArmyView: boolean
    setMoveArmyView: (state: boolean) => void,
    army: Army,
    setUnitView: (state: boolean) => void,
    setRequestingMoveCoordinates: (state: boolean) => void,
}
const DivideArmyView = ({addEvent, setDivideArmyView, setDivideRegiments, moveArmyView, setMoveArmyView, army, setUnitView, setRequestingMoveCoordinates}: Props) => {

    const [stayingRegiments, setStayingRegiments] = useState<Regiment[]>(army.regiments)
    const [changingRegiments, setChangingRegiments] = useState<Regiment[]>([])

    const addRegiment = (regiment: Regiment) => {
        // Remove the regiment from stayingRegiments
        const updatedStayingRegiments = stayingRegiments.filter((r) => r.regimentId !== regiment.regimentId);
        setStayingRegiments(updatedStayingRegiments);

        // Add the regiment to changingRegiments
        setChangingRegiments([...changingRegiments, regiment]);
    }

    const confirm = () => {

        if (changingRegiments.length == 0) {
            setDivideRegiments([])
            setDivideArmyView(false)
            setMoveArmyView(false)

        } else {

            const regimentIDs: string[] = changingRegiments.map((regiment: Regiment) => (regiment.regimentId))

            if (!moveArmyView) {
                addEvent(
                    GameEventType.DISMISS_EVENT,
                    {armyId: army.armyId, regimentIDs: regimentIDs},
                    {manpower: 0})
                    .then(() => setDivideArmyView(false))
                    .then(() => setUnitView(false))
            } else {
                setDivideRegiments(regimentIDs)
                setRequestingMoveCoordinates(true)
                setDivideArmyView(false)
            }
        }
    }

    const removeRegiment = (regiment: Regiment) => {
        // Remove the regiment from changingRegiments
        const updatedChangingRegiments = changingRegiments.filter((r) => r.regimentId !== regiment.regimentId);
        setChangingRegiments(updatedChangingRegiments);

        // Add the regiment back to stayingRegiments
        setStayingRegiments([...stayingRegiments, regiment]);
    }

    const displayStayingRegiments = () => {
        return stayingRegiments.map((regiment) => (
            <button className={"textRow"} key={regiment.regimentId} onClick={() => addRegiment(regiment)}>
                <p>{regiment.regimentName} </p><p>Select</p>
            </button>
        ))
    }

    const displayChangingRegiments = () => {
        return changingRegiments.map((regiment) => (
            <button className={"textRow"} key={regiment.regimentId} onClick={() => removeRegiment(regiment)}>
                <p>{regiment.regimentName} </p><p>Remove</p>
            </button>
        ))
    }

    return (
        <div className={"tileInfoDisplay"}>
            <div>
                {moveArmyView ? <h2>Select Regiment to move</h2> : <h2>Select Regiments to dismiss</h2> }
                {displayStayingRegiments()}
                {changingRegiments.length > 0 ? <h2>Selected Regiments</h2> : <></>}
                {displayChangingRegiments()}
            </div>
            <div className={"eventSpecificsView"}>
                <button className={"confirmButton"} onClick={() => confirm()}>Confirm</button>
            </div>
        </div>
    )
}
export default DivideArmyView