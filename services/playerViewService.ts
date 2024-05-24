import axios, {AxiosError} from 'axios';
import {emptyPlayerView, getPlayerNumberFromInput, PlayerViewData} from "../types/playerViewTypes";
import {getMapSizeFromInput, getTileTerrainValueFromInput, MapTileData, TileBuildingData} from "../types/mapTypes";
import {getBuildingInfo} from "../types/buildingTypes";
import {Army, Regiment} from "../types/unitTypes";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
const PLAYER_VIEW_API_URL = `${BASE_URL}/api/playerView`
const LOGIN_URL = `${BASE_URL}/login`;


const playerViewService = {

    getPlayerViewData: async (gameId: string): Promise<PlayerViewData> => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get<PlayerViewData>(`${PLAYER_VIEW_API_URL}/${gameId}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response)
            if (response.status === 204) {
                return emptyPlayerView(gameId)
            }

            return parsePlayerViewData(response.data);
        } catch (error) {
            if ((error as AxiosError).response?.status === 401) {
                window.location.href = LOGIN_URL;
            }

            console.error('Error fetching player data:', error);
            throw error;
        }
    },
};

function parsePlayerViewData(data: any): PlayerViewData {
    return {
        gameId: data.gameId,
        playerId: data.playerId,
        playerName: data.playerName,
        startCoordinates: data.startCoordinates,
        playerNr: getPlayerNumberFromInput(data.playerNr),
        turn: data.turn,
        turnChange: new Date(data.turnChange),
        mapData: {mapSize: getMapSizeFromInput(data.mapSize), map: parseMapData(data.map)},
        mana: data.mana,
        eventLog: data.eventLog,
        isUpdating: data.updating,
        isAdmin: data.admin,
    };
}

function parseMapData(mapData: any[]): MapTileData[] {

    return mapData.map((tile: any) => ({
        coordinates: tile.coordinates,
        tileOwner: getPlayerNumberFromInput(tile.tileOwner), // Convert string to enum value
        tileTerrainValue: getTileTerrainValueFromInput(tile.tileTerrainValue),
        visible: tile.visible,
        building: parseBuildingData(tile.building),
        army: tile.army != null ? parseArmyData(tile.army) : null,
    }));
}

function parseBuildingData(buildingData: string): TileBuildingData {
    const building = JSON.parse(buildingData)
    return {
        type: getBuildingInfo(building.type),
        progress: building.progress
    }
}

function parseArmyData(army: any): Army | null {
    return {
        armyCoordinates: army.armyCoordinates,
        armyId: army.armyId,
        armyMovement: army.armyMovement,
        armyName: army.armyName,
        fortified: army.fortified,
        owner: getPlayerNumberFromInput(army.owner),
        regiments: parseRegimentData(army.regiments)
    }
}

function parseRegimentData(regiments: any[]): Regiment[] {
    console.log(regiments)
    return regiments.map((regiment: any): Regiment => ({
        moral: regiment.moral,
        movement: regiment.movement,
        equipmentModifier: regiment.equipmentModifier,
        owner: getPlayerNumberFromInput(regiment.playerNr),
        regimentId: regiment.regimentId,
        regimentName: regiment.regimentName,
        unitAmount: regiment.unitAmount,
        unitType: regiment.unitType

    }));
}

export default playerViewService;