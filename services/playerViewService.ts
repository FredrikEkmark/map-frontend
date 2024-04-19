import axios, {AxiosError} from 'axios';
import {getPlayerNumberFromInput, PlayerViewData} from "../types/playerViewTypes";
import {getMapSizeFromInput, MapTileData, TileBuildingData} from "../types/mapTypes";
import {Console} from "inspector";
import {getBuildingInfo} from "../types/buildingTypes";


// Define the base URL for your backend API
const BASE_URL = 'http://localhost:8080/api/playerView';
const LOGIN = 'http://localhost:8080/login';
const HOME = 'http://localhost:8080';

// Define functions for interacting with the backend
const playerViewService = {
    // Function to fetch player data
    getPlayerViewData: async (gameId: string): Promise<PlayerViewData> => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get<PlayerViewData>(`${BASE_URL}/${gameId}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.gameId !== gameId) {
                window.location.href = HOME;
            }
            return parsePlayerViewData(response.data);
        } catch (error) {
            if ((error as AxiosError).response?.status === 401) {
                window.location.href = LOGIN;
        }
            // Handle errors appropriately
            console.error('Error fetching player data:', error);
            throw error;
        }
    },
};

function parsePlayerViewData(data: any): PlayerViewData {
    return {
        gameId: data.gameId,
        playerId: data.playerId,
        playerName: data.playerName, // Parse enum value
        startCoordinates: data.startCoordinates,
        playerNr: getPlayerNumberFromInput(data.playerNr), // Parse enum value
        turn: data.turn,
        turnChange: data.turnChange,
        mapData: {mapSize: getMapSizeFromInput(data.mapSize), map: parseMapData(data.map)},
        mana: data.mana,
        eventLog: data.eventLog,
    };
}

function parseMapData(mapData: any[]): MapTileData[] {
    return mapData.map((tile: any) => ({
        coordinates: tile.coordinates,
        tileOwner: getPlayerNumberFromInput(tile.tileOwner), // Convert string to enum value
        tileTerrainValue: tile.tileTerrainValue,
        visible: tile.visible,
        building: parseBuildingData(tile.building),
    }));
}

function parseBuildingData(buildingData: string): TileBuildingData {
    const building = JSON.parse(buildingData)
    return {
        type: getBuildingInfo(building.type),
        progress: building.progress
    }
}
export default playerViewService;