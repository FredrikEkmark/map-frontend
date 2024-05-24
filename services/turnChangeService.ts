import axios, {AxiosError} from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
const TURN_CHANGE_API_URL = `${BASE_URL}/api/turn-change`;
const LOGIN_URL = `${BASE_URL}/login`;
const HOME_URL = `${BASE_URL}`

const turnChangeService = {

    turnChange: async (gameId: any): Promise<boolean> => {

        const token = localStorage.getItem("token");
        try {
            const response = await axios.get<boolean>(`${TURN_CHANGE_API_URL}/${gameId}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data !== true) {
                window.location.href = HOME_URL;
            }
            return response.data
        } catch (error) {
            if ((error as AxiosError).response?.status === 401) {
                window.location.href = LOGIN_URL;
            }
            // Handle errors appropriately
            console.error('Error fetching player data:', error);
            throw error;
        }
    },
};

export default turnChangeService;