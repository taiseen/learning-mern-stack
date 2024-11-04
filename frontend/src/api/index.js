import { getNewToken } from './auth/endPoints';
import dbLocal from '../utils/dbLocal';
import axios from 'axios';


const api = axios.create({ baseURL: import.meta.env.VITE_SERVER_BASE_URL });

const { request, response } = api.interceptors;


// this this going to connect with (auth middleware) at BackEnd
// (auth middleware) can not work without this ==> token file
// this method run at ==> every requests... that created by user at FrontEnd
// this invoke before all of these requests that are call bellow
// by invoking this every time, we send our token to BackEnd 
// BackEnd auth middleware can verify that, who is currently login now...
// so by this process ==> BackEnd get specific header file... & base on that header do his logic...

// ➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️
// add outgoing ===> request interceptor 
// ➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️
request.use(

    (reqConfig) => {
        // 1st ==> get user token from LocalStorage, that server send to client...
        const { accessToken } = dbLocal('get', 'user') ?? '';

        if (accessToken) {
            // 2nd ==> send this token from LocalStorage into server for user id tracking... 
            reqConfig.headers.authorization = `Bearer ${accessToken}`;
        }

        return reqConfig;
    },

    (error) => Promise.reject(error)
);


// ⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️
// add incoming <=== response interceptor 
// ⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️
response.use(

    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        // If the error status is 403 & there is no originalRequest.retryToke flag,
        // then its mean that - this token has expired & we need to refresh it...
        if (error.response.status === 403 && !originalRequest.retryToke) {

            originalRequest.retryToke = true;

            const authUser = dbLocal('get', 'user') ?? {};

            try {
                const response = await getNewToken(authUser.refreshToken);

                const { accessToken, refreshToken } = response.data;


                const userInfo = { ...authUser, accessToken, refreshToken };

                dbLocal('set', 'user', userInfo); // set info to localStorage

                // Retry the original request with the new token
                originalRequest.headers.Authorization = "Bearer " + accessToken;

                return api(originalRequest);
            } catch (error) {
                console.log(error);
            }
        }

        return Promise.reject(error)
    }
);


export default api;