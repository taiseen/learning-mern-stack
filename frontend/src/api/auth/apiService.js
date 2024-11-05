import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthUserContext } from "../../context/AuthContext";
import { login, logout, registration } from "./endPoints";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { route } from "../../routes";
import dbLocal from "../../utils/dbLocal";


export const useRegistration = (setFocus, reset) => {

    const navigate = useNavigate();

    return useMutation({

        mutationFn: registration,

        onSuccess: (serverResponse) => {

            const { status, data } = serverResponse;

            if (status === 201) {

                setFocus('name', { shouldFocus: true }) // cursor focus back into 1st input field...

                reset(); // clear user input fields... after submit data...

                setTimeout(() => navigate(route.login), 5000) // auto redirect after 5 second...

                toast.success(data.message, { duration: 5000 })
            }
        },

        onError: (err) => {
            const { status, data } = err.response;

            const errorMap = {
                400: data?.error?.details[0]?.message, // Bad Request
                409: data?.message, // Conflict
                undefined: "undefined..."
            };

            const errorMessage = errorMap[status];

            status === 409
                ? toast.info(errorMessage)
                : toast.error(errorMessage)
        },
    })
}


export const useLogin = () => {

    const navigate = useNavigate();
    const { setAuthUser } = useAuthUserContext();

    return useMutation({

        mutationFn: login,

        onSuccess: (serverResponse) => {

            const { status, data } = serverResponse;

            if (status === 200) {
                const userInfo = { ...data, isAuth: true };
                dbLocal('set', 'user', userInfo); // set info to localStorage
                setAuthUser(userInfo) // init user data for app...
                navigate(route.home); // redirect user to home page
            }
        },

        onError: (err) => {

            const { status, data } = err.response;

            const errorMap = {
                400: data?.message, // Bad Request
                403: data?.message, // Forbidden
                undefined: "undefined..."
            };

            const errorMessage = errorMap[status];

            errorMessage && toast.error(errorMessage)
        },
    })
}


export const useLogout = () => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { setAuthUser } = useAuthUserContext();

    return useMutation({
        
        mutationFn: logout,

        onSuccess: () => {
            setAuthUser({});
            dbLocal('clear', 'user');

            queryClient.clear(); // Clears all cached queries
            navigate(route.login);
        }
    })
}