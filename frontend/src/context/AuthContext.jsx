import { createContext, useContext, useState } from 'react';
import dbLocal from '../utils/dbLocal';


const AuthUser = createContext();


const AuthUserContext = ({ children }) => {

    const userInfo = dbLocal('get', 'user') ?? {};
    const [authUser, setAuthUser] = useState(userInfo);


    const shareInsideDomTree = {
        authUser,
        setAuthUser,
    };


    return (
        <AuthUser.Provider value={shareInsideDomTree}>
            {children}
        </AuthUser.Provider>
    );
};


// 📢 use for provider 📢
export default AuthUserContext;


// 🎧 use for consumer's 🎧
export const useAuthUserContext = () => useContext(AuthUser);
