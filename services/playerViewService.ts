import axios from 'axios';
import {MapTileData, PlayerViewData} from "../types/playerViewTypes";
import {getMapSizeFromInput, getPlayerNumberFromInput,} from "../types/enums";

// Define the base URL for your backend API
const BASE_URL = 'http://localhost:8080/api';

// Define functions for interacting with the backend
const playerViewService = {
    // Function to fetch player data
    getPlayerViewData: async (gameId: string): Promise<PlayerViewData> => {
        try {
            const response = await axios.get<PlayerViewData>(`${BASE_URL}/test/${gameId}`);
            return parsePlayerViewData(response.data);
        } catch (error) {
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
        mapData: {mapSize: getMapSizeFromInput(data.mapSize), map: parseMapData(data.map)},
    };
}

function parseMapData(mapData: any[]): MapTileData[] {
    return mapData.map((tile: any) => ({
        coordinates: tile.coordinates,
        tileOwner: getPlayerNumberFromInput(tile.tileOwner), // Convert string to enum value
        tileTerrainValue: tile.tileTerrainValue,
        visible: tile.visible,
    }));
}
export default playerViewService;