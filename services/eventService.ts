import axios, {AxiosError} from 'axios';
import {GameEvent, NewEventDTO} from "../types/eventTypes";
import {getPlayerNumberFromInput} from "../types/playerViewTypes";
import {ManaCost} from "../types/manaTypes";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
const EVENT_API_URL = `${BASE_URL}/api/event`
const LOGIN_URL = `${BASE_URL}/login`

const eventService = {

    getAllPlayerEvent: async (gameId: string): Promise<GameEvent[]> => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get<any>(`${EVENT_API_URL}/${gameId}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response)
            return parseEvents(response.data);
        } catch (error) {
            if ((error as AxiosError).response?.status === 401) {
                window.location.href = LOGIN_URL;
            }
            console.error('Error fetching event data:', error);
            throw error;
        }
    },

    postNewEvent: async (event: NewEventDTO): Promise<GameEvent[]> => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post<any>(`${EVENT_API_URL}`, event,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return parseEvents(response.data);
        } catch (error) {
            if ((error as AxiosError).response?.status === 401) {
                window.location.href = LOGIN_URL;
            }
            console.error('Error fetching event data:', error);
            throw error;
        }
    },

    deleteEvent: async (event: GameEvent): Promise<GameEvent[]> => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.delete<any>(
                `${EVENT_API_URL}/${event.gameId}/${event.eventId}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            return parseEvents(response.data);
        } catch (error) {
            if ((error as AxiosError).response?.status === 401) {
                window.location.href = LOGIN_URL;
            }
            console.error('Error fetching event data:', error);
            throw error;
        }
    },
};

function parseEvents(events: any[]): GameEvent[] {
    return events.map((event: any) : GameEvent => (
        {
        eventId: event.eventId,
        gameId: event.gameId,
        playerNr: getPlayerNumberFromInput(event.playerNr),
        turn: event.turn,
        primaryTileCoordinates: event.primaryTileCoordinates,
        eventType: event.eventType,
        eventData: JSON.parse(event.eventData),
        cost: parseManaCost(JSON.parse(event.cost))
    }));
}

function parseManaCost(cost: any): ManaCost {
    return {
        manpower: typeof cost.manpower === "number" ? cost.manpower : 0,
        food: typeof cost.food === "number" ? cost.food : 0,
        wood: typeof cost.wood === "number" ? cost.wood : 0,
        stone: typeof cost.stone === "number" ? cost.stone : 0,
        leather: typeof cost.leather === "number" ? cost.leather : 0,
        iron: typeof cost.iron === "number" ? cost.iron : 0,
        furniture: typeof cost.furniture === "number" ? cost.furniture : 0,
        simpleClothes: typeof cost.simpleClothes === "number" ? cost.simpleClothes : 0,
        horses: typeof cost.horses === "number" ? cost.horses : 0,
    }
}

export default eventService;