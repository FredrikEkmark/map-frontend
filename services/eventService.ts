import axios, {AxiosError} from 'axios';
import {GameEvent, NewEventDTO} from "../types/eventTypes";
import {getPlayerNumberFromInput, PlayerNumber} from "../types/playerViewTypes";

const BASE_URL = 'http://localhost:8080/api/event';
const LOGIN = 'http://localhost:8080/login';

const eventService = {

    getAllPlayerEvent: async (gameId: string, player: PlayerNumber): Promise<GameEvent[]> => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get<any>(`${BASE_URL}/${gameId}/${player.name}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return parseEvents(response.data);
        } catch (error) {
            if ((error as AxiosError).response?.status === 401) {
                window.location.href = LOGIN;
            }
            console.error('Error fetching event data:', error);
            throw error;
        }
    },

    postNewEvent: async (event: NewEventDTO): Promise<GameEvent[]> => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post<any>(`${BASE_URL}`, event,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return parseEvents(response.data);
        } catch (error) {
            if ((error as AxiosError).response?.status === 401) {
                window.location.href = LOGIN;
            }
            console.error('Error fetching event data:', error);
            throw error;
        }
    },

    deleteEvent: async (event: GameEvent): Promise<GameEvent[]> => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.delete<any>(
                `${BASE_URL}/${event.gameId}/${event.eventId}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            return parseEvents(response.data);
        } catch (error) {
            if ((error as AxiosError).response?.status === 401) {
                window.location.href = LOGIN;
            }
            console.error('Error fetching event data:', error);
            throw error;
        }
    },
};

function parseEvents(events: any[]): GameEvent[] {
    return events.map((event: any) => ({
        eventId: event.eventId,
        gameId: event.gameId,
        playerNr: getPlayerNumberFromInput(event.playerNr),
        turn: event.turn,
        primaryTileCoordinates: event.primaryTileCoordinates,
        eventType: event.eventType,
        eventData: JSON.parse(event.eventData),
    }));
}

export default eventService;