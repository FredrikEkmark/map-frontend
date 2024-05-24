import "@/styles/global/global.css";
import "@/styles/gameUi/gameUi.css";
import {MapCoordinates} from "../../../types/mapTypes";
import {GameEventType} from "../../../types/eventTypes";
import {Army} from "../../../types/unitTypes";
interface Props {
    addEvent: (evenType: GameEventType, eventData: any, cost: any) => Promise<boolean>,
    army: Army,
    dividedRegiments: string[],
    setDivideRegiments: (regiments: string[]) => void,
    setUnitView: (state: boolean) => void,
    setMoveArmyView: (state: boolean) => void
    moveCoordinates: MapCoordinates | null
    setRequestingMoveCoordinates: (state: boolean) => void,
    unitValidMoveLocations: MapCoordinates[],

}
const MoveArmyView = ({addEvent, army, dividedRegiments, setDivideRegiments, setMoveArmyView, setUnitView, moveCoordinates, setRequestingMoveCoordinates, unitValidMoveLocations}: Props) => {

    const confirm = () => {

        if (moveCoordinates) {
            if (dividedRegiments.length > 0) {
                addEvent(
                    GameEventType.SPLIT_ARMY_EVENT,
                    {armyId: army.armyId,
                        destinationCoordinates: moveCoordinates,
                        regimentIDs: dividedRegiments},
                    {manpower: 0})
                    .then(() => setMoveArmyView(false))
                    .then(() => setRequestingMoveCoordinates(false))
                    .then(() => setUnitView(false))
            } else {
                addEvent(
                    GameEventType.MOVE_EVENT,
                    {armyId: army.armyId,
                        destinationCoordinates: moveCoordinates},
                    {manpower: 0})
                    .then(() => setMoveArmyView(false))
                    .then(() => setRequestingMoveCoordinates(false))
                    .then(() => setUnitView(false))
            }
        } else {
            console.log("error moveCoordinates null")
            setMoveArmyView(false)
            setRequestingMoveCoordinates(false)
            setUnitView(false)
        }
    }
    const cancel = () => {
        setMoveArmyView(false)
        setDivideRegiments([])
        setRequestingMoveCoordinates(false)
    }

    const validMove = (): boolean => {
        if (!moveCoordinates) {
            return false
        }
        if (unitValidMoveLocations.includes(moveCoordinates)) {
            return true
        }
        return false
    }

    return (
        <div className={"tileInfoDisplay"}>
            <div>
                {dividedRegiments.length > 0 ?
                    <h2>Move {dividedRegiments.length} regiments</h2> :
                    <h2>Move {army.armyName}</h2>
                }
                <div className={"textRow"}>
                    <p>From:</p>
                    <p>{army.armyCoordinates.x}:{army.armyCoordinates.y}</p>
                </div>
                {moveCoordinates && <div className={"textRow"}>
                    <p>To:</p>
                    <p>{moveCoordinates.x}:{moveCoordinates.y}</p>
                </div>}
            </div>
            <div className={"eventSpecificsView"}>
            {validMove() ?
                <div className={"doubleConfirmButton"}>
                    <button className={"confirmButton"} onClick={() => confirm()}>Confirm</button>
                    <button className={"confirmButton"} onClick={() => cancel()} >Cancel</button>
                </div> :
                <button className={"confirmButton"} onClick={() => cancel()}>Cancel</button>}
            </div>

        </div>
    )
}
export default MoveArmyView