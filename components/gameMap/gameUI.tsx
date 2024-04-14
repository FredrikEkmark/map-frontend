import "@/styles/ui-style.css";
import TileInfoDisplay from "./tileInfoDisplay";
import {MapCoordinates} from "../../types/mapTypes";
import {PlayerViewData} from "../../types/playerViewTypes";
import {GameEvent, GameEventType, NewEventDTO} from "../../types/eventTypes";
import {findEventInMap} from "../../functions/utility/eventUtility";
import {useEffect, useState} from "react";
import eventService from "../../services/eventService";
import {UUID} from "crypto";

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

    const addEvent = async (evenType: GameEventType, eventData: any) => {
        if (!markedTile) {
            return
        }
        const newEvent: NewEventDTO = {
            gameId: playerViewData.gameId,
            playerNr: playerViewData.playerNr.name,
            turn: 0,
            primaryTileCoordinates: markedTile,
            eventType: evenType,
            eventData: eventData.toString(),
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