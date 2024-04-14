import "@/styles/ui-style.css";
import TileInfoDisplay from "./tileInfoDisplay";
import {MapCoordinates} from "../../types/mapTypes";
import {PlayerViewData} from "../../types/playerViewTypes";
import {GameEvent, GameEventType, NewEvent} from "../../types/eventTypes";
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
    }, [eventsData]);

    const addEvent = async (evenType: GameEventType, eventData: any) => {
        if (!markedTile) {
            return
        }
        const newEvent: NewEvent = {
            eventId: "2f7133ff-ffb9-444e-be0e-6520ff74c544",
            gameId: playerViewData.gameId,
            playerNr: playerViewData.playerNr.name,
            turn: 0, // this has to change
            primaryTileCoordinates: markedTile,
            eventType: evenType,
            eventData: eventData,
        }
        try {
            const response = await eventService.postNewEvent(newEvent);
            setEventsData(response)
        } catch (error) {
            console.error('Error fetching map data:', error);
        }
    }

    const removeEvent = async () => {
        try {

        } catch (error) {
            console.error('Error fetching map data:', error);
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