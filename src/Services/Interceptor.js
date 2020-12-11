import axios from 'axios';
import { GetToken } from 'Services/LocalStorage';

export function configureAxios() {
    axios.interceptors.request.use(
        (config) => {
            const getToken = GetToken();
            if (getToken) {
                config.headers['Authorization'] = 'Bearer ' + getToken;
            }
            // config.headers['Content-Type'] = 'application/json';
            return config;
        },
        (error) => {
            Promise.reject(error);
        },
    );
}
