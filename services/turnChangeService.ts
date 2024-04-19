import {PlayerViewData} from "../types/playerViewTypes";
import axios, {AxiosError} from "axios";

const BASE_URL = 'http://localhost:8080/api/turn-change';
const LOGIN = 'http://localhost:8080/login';
const HOME = 'http://localhost:8080';

const turnChangeService = {

    turnChange: async (): Promise<boolean> => {

        const token = localStorage.getItem("token");
        try {
            const response = await axios.get<boolean>(`${BASE_URL}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data !== true) {
                window.location.href = HOME;
            }
            return response.data
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

export default turnChangeService;