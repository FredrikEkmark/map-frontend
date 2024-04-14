"use client"

import { useParams } from 'next/navigation'
import GameMap from "../../../../components/gameMap/gameMap";
import {useEffect, useState} from "react";
import playerViewService from "../../../../services/playerViewService";
import GameUI from "../../../../components/gameMap/gameUI";
import ResourceBar from "../../../../components/gameMap/resourceBar";
import eventService from "../../../../services/eventService";
import {PlayerViewData} from "../../../../types/playerViewTypes";
import {MapCoordinates} from "../../../../types/mapTypes";
import {GameEvent} from "../../../../types/eventTypes";

const Map = () => {
    const params = useParams<{ gameId: string;}>()
    const [playerViewData, setPlayerViewData] = useState<PlayerViewData>()
    const [eventsData, setEventsData] = useState<GameEvent[]>([])
    const [markedTile, setMarkedTile] = useState<MapCoordinates | null>(null)

    console.log(eventsData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const playerViewResponse = await playerViewService.getPlayerViewData(params.gameId);
                setPlayerViewData(playerViewResponse);
                const gameEventsResponse = await eventService.getAllPlayerEvent(params.gameId, playerViewResponse.playerNr)
                setEventsData(gameEventsResponse)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [params.gameId]);

    if (!playerViewData) {
        return <div>Loading...</div>
    }

    return (
        <div className={"flex flex-col w-full h-full bg-amber-700 justify-center items-center"}>
            <div className={"flex flex-row w-full justify-around items-center"}>
                <div className={"bannerSkyscraper"}></div>
                <div className={"flex flex-col"}>
                    <ResourceBar></ResourceBar>
                    <div className={"flex flex-row"}>
                        <GameMap setMarkedTile={setMarkedTile}
                                 markedTile={markedTile}
                                 startCoordinates={playerViewData.startCoordinates}
                                 mapData={playerViewData.mapData} >
                        </GameMap>
                        <GameUI markedTile={markedTile}
                                playerViewData={playerViewData}
                                eventsData={eventsData}
                                setEventsData={setEventsData}>
                        </GameUI>
                    </div>
                </div>
                <div className={"bannerSkyscraper"}></div>
            </div>
        </div>
    )
}
export default Map