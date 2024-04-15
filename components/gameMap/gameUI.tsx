import "@/styles/ui-style.css";
import TileInfoDisplay from "./tileInfoDisplay";
import {MapCoordinates} from "../../types/mapTypes";
import {PlayerViewData} from "../../types/playerViewTypes";
import {BuildEventData, EmptyEventData, GameEvent, GameEventType, NewEventDTO} from "../../types/eventTypes";
import {findEventInMap} from "../../functions/utility/eventUtility";
import {useEffect, useState} from "react";
import eventService from "../../services/eventService";
import {Mana, ManaCost} from "../../types/manaTypes";

interface Props {
    markedTile: MapCoordinates | null,
    playerViewData: PlayerViewData,
    eventsData: GameEvent[]
    setEventsData: (events: GameEvent[]) => void;
}

const GameUI = ({markedTile, playerViewData, eventsData, setEventsData}: Props) => {

    const [markedTileEvent, setMarkedTileEvent] = (
        useState<GameEvent | undefined>(findEventInMap(markedTile, eventsData)))

    useEffect(() => {
        setMarkedTileEvent(findEventInMap(markedTile, eventsData))
    }, [eventsData, markedTile]);

    const addEvent = async (evenType: GameEventType, eventData: EmptyEventData | BuildEventData, cost: ManaCost) => {
        if (!markedTile) {
            return
        }
        const newEvent: NewEventDTO = {
            gameId: playerViewData.gameId,
            playerNr: playerViewData.playerNr.name,
            turn: playerViewData.turn,
            primaryTileCoordinates: markedTile,
            eventType: evenType,
            eventData: JSON.stringify(eventData),
            cost: JSON.stringify(cost),
        }
        try {
            const response = await eventService.postNewEvent(newEvent);
            setEventsData(response)
        } catch (error) {
            console.error('Error posting event data:', error);
        }
    }

    const removeEvent = async () => {
        if (!markedTileEvent) {
            return
        }
        try {
            const response = await eventService.deleteEvent(markedTileEvent);
            setEventsData(response)

        } catch (error) {
            console.error('Error deleting event data:', error);
        }
    }

    return (
        <div className={"userInterface"}>
            <div></div>
            <TileInfoDisplay
                playerNr={playerViewData.playerNr}
                markedTile={markedTile}
                mapData={playerViewData.mapData}
                event={markedTileEvent}
                addEvent={addEvent}
                removeEvent={removeEvent}>
            </TileInfoDisplay>
        </div>
    )
}
export default GameUI