"use client"

import "@/styles/global/global.css";
import { useParams } from 'next/navigation'
import GameMap from "../../../../components/gameMap/gameMap";
import {useEffect, useState} from "react";
import playerViewService from "../../../../services/playerViewService";
import GameUI from "../../../../components/gameUi/gameUI";
import ResourceBar from "../../../../components/resourceBar/resourceBar";
import eventService from "../../../../services/eventService";
import {PlayerViewData} from "../../../../types/playerViewTypes";
import {MapCoordinates} from "../../../../types/mapTypes";
import {GameEvent} from "../../../../types/eventTypes";
import {Mana} from "../../../../types/manaTypes";
import turnChangeService from "../../../../services/turnChangeService";

const Map = () => {

    const params = useParams<{ gameId: string;}>()
    const [playerViewData, setPlayerViewData] = useState<PlayerViewData>()
    const [eventsData, setEventsData] = useState<GameEvent[]>([])
    const [markedTile, setMarkedTile] = useState<MapCoordinates | null>(null)
    const [centerViewCoordinates, setCenterViewCoordinates] = useState<MapCoordinates>({x: 20, y: 20})
    const [moveCoordinates, setMoveCoordinate] = useState<MapCoordinates | null>(null)
    const [requestingMoveCoordinates, setRequestingMoveCoordinate] = useState<boolean>(false)

    useEffect(() => {
        setMoveCoordinate(null)
    }, [requestingMoveCoordinates]);

    const adjustedMana = (mana: Mana, events: GameEvent[]) : Mana => {
        let adjustedMana: Mana = {
            population: mana.population,
            populationMax: mana.populationMax,
            manpower: mana.manpower,
            food: mana.food,
            wood: mana.wood,
            stone: mana.stone,
            iron: mana.iron,
            leather: mana.leather,
            furniture: mana.furniture,
            simpleClothes: mana.simpleClothes,
            horses: mana.horses,
        }
        events.map((event: GameEvent) => {
            adjustedMana.manpower -= event.cost.manpower ? event.cost.manpower : 0
            adjustedMana.food -= event.cost.food ? event.cost.food : 0
            adjustedMana.wood -= event.cost.wood ? event.cost.wood : 0
            adjustedMana.stone -= event.cost.stone ? event.cost.stone : 0
            adjustedMana.leather -= event.cost.leather ? event.cost.leather : 0
            adjustedMana.iron -= event.cost.iron ? event.cost.iron : 0
            adjustedMana.furniture -= event.cost.furniture ? event.cost.furniture : 0
            adjustedMana.simpleClothes -= event.cost.simpleClothes ? event.cost.simpleClothes : 0
            adjustedMana.horses -= event.cost.horses ? event.cost.horses : 0
        })
        return adjustedMana
    }

    const safeCenterViewPoint = (coordinates: MapCoordinates) => {
        if (!playerViewData) {
            setCenterViewCoordinates(coordinates)
            return
        }
        const numRows = 13;
        let x = coordinates.x
        if (x < (numRows - 1) / 2) {
            x = (numRows - 1) / 2
        } else if (x > playerViewData.mapData.mapSize.height - ((numRows - 1) / 2) - 1) {
            x = playerViewData.mapData.mapSize.height - ((numRows - 1) / 2) - 1
        }
        setCenterViewCoordinates({x: x, y: coordinates.y})
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const playerViewResponse = await playerViewService.getPlayerViewData(params.gameId);
                setPlayerViewData(playerViewResponse);
                if (!playerViewResponse.isUpdating) {
                    const gameEventsResponse = await eventService.getAllPlayerEvent(params.gameId, playerViewResponse.playerNr)
                    setEventsData(gameEventsResponse)
                }
                const startCoordinates = {x: playerViewResponse.startCoordinates.x + (playerViewResponse.startCoordinates.x % 2), y: playerViewResponse.startCoordinates.y}
                setCenterViewCoordinates(startCoordinates)
                console.log(playerViewResponse)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData().then();
    }, [params.gameId]);

    const turnChange = async () => {
        try {
            const turnChange = await turnChangeService.turnChange(playerViewData?.gameId);
            if (turnChange) {
                window.location.reload()
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    if (!playerViewData) {
        return <div>Loading...</div>
    }

    if (playerViewData.isUpdating) {
        return <div>Updating...</div>
    }

    return (
        <div className={"flex flex-col w-full h-full justify-center items-center"}>
            <div className={"flex flex-row w-full justify-around items-center"}>
                <div className={"flex flex-col"}>
                    <ResourceBar
                        mana={adjustedMana(playerViewData.mana, eventsData)}
                        events={eventsData}
                        turn={playerViewData.turn}
                        turnChangeTime={playerViewData.turnChange}
                    ></ResourceBar>
                    <div className={"flex flex-row"}>
                        <GameMap
                            setMarkedTile={setMarkedTile}
                            markedTile={markedTile}
                            centerViewCoordinates={centerViewCoordinates}
                            setCenterViewCoordinates={setCenterViewCoordinates}
                            mapData={playerViewData.mapData}
                            events={eventsData}
                            requestingMoveCoordinates={requestingMoveCoordinates}
                            setMoveCoordinates={setMoveCoordinate}>
                        </GameMap>
                        <GameUI
                            markedTile={markedTile}
                            setMarkedTile={setMarkedTile}
                            playerViewData={playerViewData}
                            eventsData={eventsData}
                            setEventsData={setEventsData}
                            setCenterViewCoordinates={safeCenterViewPoint}
                            adjustedMana={adjustedMana(playerViewData.mana, eventsData)}
                            moveCoordinates={moveCoordinates}
                            setRequestingMoveCoordinates={setRequestingMoveCoordinate}>
                        </GameUI>
                    </div>
                </div>
            </div>
            {playerViewData.isAdmin ? <button className={"button"} onClick={() => (turnChange())}>Next Turn</button> : <></>}
        </div>
    )
}
export default Map