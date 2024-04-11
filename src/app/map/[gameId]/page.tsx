"use client"

import { useParams } from 'next/navigation'
import GameMap from "../../../../components/gameMap/gameMap";
import {useEffect, useState} from "react";
import {MapCoordinates, PlayerViewData} from "../../../../types/playerViewTypes";
import playerViewService from "../../../../services/playerViewService";
import GameUI from "../../../../components/gameMap/gameUI";
import ResourceBar from "../../../../components/gameMap/resourceBar";

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
                                playerViewData={playerViewData}>
                        </GameUI>
                    </div>
                </div>
                <div className={"bannerSkyscraper"}></div>
            </div>
        </div>
    )
}
export default Map