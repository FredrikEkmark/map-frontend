"use client"

import { useParams } from 'next/navigation'
import GameMap from "../../../../components/gameMap/gameMap";
import {useEffect, useState} from "react";
import {MapCoordinates, PlayerViewData} from "../../../../types/playerViewTypes";
import playerViewService from "../../../../services/playerViewService";

const Map = () => {
    const params = useParams<{ gameId: string;}>()
    const [playerViewData, setPlayerViewData] = useState<PlayerViewData>()
    const [markedTile, setMarkedTile] = useState<MapCoordinates | null>(null)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await playerViewService.getPlayerViewData(params.gameId);
                setPlayerViewData(data);
            } catch (error) {
                console.error('Error fetching map data:', error);
            }
        };

        fetchData(); // Call the fetchData function when the component mounts
    }, [params.gameId]);

    if (!playerViewData) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div> Param: {params.gameId}, MarkedTile: {markedTile?.x}:{markedTile?.y}</div>
            <GameMap setMarkedTile={setMarkedTile} markedTile={markedTile} startCoordinates={playerViewData.startCoordinates} mapData={playerViewData.mapData} ></GameMap>
        </div>
    )
}
export default Map