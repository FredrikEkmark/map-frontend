import "@/styles/ui-style.css";
import TileInfoDisplay from "./tileInfoDisplay";
import {MapCoordinates} from "../../types/mapTypes";
import {PlayerViewData} from "../../types/playerViewTypes";
import {BuildEventData, EmptyEventData, GameEvent, GameEventType, NewEventDTO} from "../../types/eventTypes";
import {useEffect, useState} from "react";
import eventService from "../../services/eventService";
import {Mana, ManaCost} from "../../types/manaTypes";
import ActionInterface from "./actionInterface";
import {findAllEventsInMap} from "../../functions/utility/eventUtility";

interface Props {
    markedTile: MapCoordinates | null,
    setMarkedTile: (coordinates: MapCoordinates | null) => void,
    playerViewData: PlayerViewData,
    eventsData: GameEvent[]
    setEventsData: (events: GameEvent[]) => void;
    setCenterViewCoordinates: (coordinates: MapCoordinates) => void
}

const GameUI = ({markedTile, setMarkedTile, playerViewData, eventsData, setEventsData, setCenterViewCoordinates}: Props) => {

    const [markedTileEvents, setMarkedTileEvents] = (
        useState<GameEvent[]>(findAllEventsInMap(markedTile, eventsData)))

    useEffect(() => {
        setMarkedTileEvents(findAllEventsInMap(markedTile, eventsData))
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

    const removeEvent = async (coordinates: MapCoordinates) => {
        const event = eventsData.find((event => {
            return event.primaryTileCoordinates === coordinates
        }))
        if (!event) {
            return
        }
        try {
            const response = await eventService.deleteEvent(event);
            setEventsData(response)

        } catch (error) {
            console.error('Error deleting event data:', error);
        }
    }

    return (
        <div className={"sideInterface"}>
            <ActionInterface eventsData={eventsData}
                             setMarkedTile={setMarkedTile}
                             mapData={playerViewData.mapData}
                             removeEvent={removeEvent}
                             setCenterViewCoordinates={setCenterViewCoordinates}></ActionInterface>
            <TileInfoDisplay
                playerNr={playerViewData.playerNr}
                markedTile={markedTile}
                mapData={playerViewData.mapData}
                tileEvents={markedTileEvents}
                mana={playerViewData.mana}
                addEvent={addEvent}
                removeEvent={removeEvent}>
            </TileInfoDisplay>
        </div>
    )
}
export default GameUI