import axios, {AxiosRequestConfig} from "axios";
import Router from "next/router";

const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
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
                Authorization: `Bearer ${accessToken}`
            };
        }
        return config;
    }
)

AxiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        let prevRequest = error.config;
        if (error.response.status === 401 && !prevRequest._retry) {
            prevRequest._retry = true;
            let token: string | null = localStorage.getItem('access_token');
            let newToken: {token: string} = await AxiosInstance.post("api/auth/refreshtoken/", {token}).then(response => {
                return response.data;
            });

            localStorage.setItem('access_token', newToken.token);
            prevRequest.headers['Authorization'] = `Bearer ${newToken.token}`;

            return AxiosInstance(prevRequest);
        } else if (error.response.status === 403) {
            // await Router.push('/auth/login/');
        }
        return Promise.reject(error);
    }
)

export default AxiosInstance;
