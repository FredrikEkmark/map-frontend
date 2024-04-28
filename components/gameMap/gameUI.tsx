import "@/styles/ui-style.css";
import TileInfoDisplay from "./tileInfoDisplay";
import {MapCoordinates} from "../../types/mapTypes";
import {PlayerViewData} from "../../types/playerViewTypes";
import {BuildEventData, EmptyEventData, GameEvent, GameEventType, NewEventDTO} from "../../types/eventTypes";
import {useEffect, useState} from "react";
import eventService from "../../services/eventService";
import {ManaCost} from "../../types/manaTypes";
import ActionInterface from "./actionInterface";
import {findAllEventsInMap} from "../../functions/utility/eventUtility";
import {numberOfPlayerOwnedTiles} from "../../functions/utility/mapUtility";

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

    const playerClaimedTiles = () => {
        const claimEvents = eventsData.filter(event => event.eventType === GameEventType.CLAIM_TILE_EVENT)
        return numberOfPlayerOwnedTiles(playerViewData.mapData, playerViewData.playerNr) + claimEvents.length
    }

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
                             eventLog={playerViewData.eventLog}
                             setCenterViewCoordinates={setCenterViewCoordinates}></ActionInterface>
            <TileInfoDisplay
                playerNr={playerViewData.playerNr}
                markedTile={markedTile}
                setCenterViewCoordinates={setCenterViewCoordinates}
                mapData={playerViewData.mapData}
                tileEvents={markedTileEvents}
                mana={playerViewData.mana}
                addEvent={addEvent}
                removeEvent={removeEvent}
                playerOwnedTiles={playerClaimedTiles()}
            >
            </TileInfoDisplay>
        </div>
    )
}
export default GameUI