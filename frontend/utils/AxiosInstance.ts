import axios, {AxiosRequestConfig} from "axios";

const AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    }
});

AxiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const accessToken: string | null = localStorage.getItem('access_token');
        if (accessToken) {
            config.headers = {
                Authorization: accessToken
            };
        }
        return config;
    }
)

export default AxiosInstance;
