import axios from 'axios';
import { GetToken } from 'Services/LocalStorage';

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

//axios header interceptor
//https://medium.com/swlh/handling-access-and-refresh-tokens-using-axios-interceptors-3970b601a5da#:~:text=%20Axios%20Interceptors%20%201%20In%20simple%20words%2C.,in%20response%20interceptors.%20One%20gets%20executed...%20More%20
