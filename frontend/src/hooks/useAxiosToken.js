import { useAuthUserContext } from '../context/AuthContext';
import { getNewToken } from '../api';
import { useEffect } from 'react';
import dbLocal from '../utils/dbLocal';
import api from '../api/axios';


const useAxiosToken = () => {

    const { authUser, setAuthUser } = useAuthUserContext();

    const { accessToken, refreshToken: oldRefToken } = authUser;


    useEffect(() => {

        // ➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️
        // add outgoing ===> request interceptor 
        const requestInterceptors = api.interceptors.request.use(

            (config) => {
                if (accessToken) {
                    config.headers.Authorization = "Bearer " + accessToken;
                    return config;
                }
            },

            (error) => Promise.reject(error)
        );

        // ⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️
        // add incoming <=== response interceptor 
        const responseInterceptors = api.interceptors.response.use(

            (response) => response,

            async (error) => {
                const originalRequest = error.config;

                // If the error status is 403 & there is no originalRequest.retryToke flag,
                // then its mean that - this token has expired & we need to refresh it...
                if (error.response.status === 403 && !originalRequest.retryToke) {
                    originalRequest.retryToke = true;

                    try {
                        const response = await getNewToken(oldRefToken);

                        const { accessToken, refreshToken } = response.data;


                        const userInfo = { ...authUser, accessToken, refreshToken };

                        dbLocal('set', 'user', userInfo); // set info to localStorage
                        setAuthUser(userInfo);

                        // Retry the original request with the new token
                        originalRequest.headers.Authorization = "Bearer " + accessToken;

                        return api(originalRequest);
                    } catch (error) {
                        // throw error;
                        console.log(error);
                    }
                }

                return Promise.reject(error)
            }
        );

        return () => {
            // cline-up ==> interceptors...
            api.interceptors.request.eject(requestInterceptors);
            api.interceptors.response.eject(responseInterceptors);
        }

    }, [accessToken, authUser, oldRefToken, setAuthUser]);

    return { api };
}

export default useAxiosToken