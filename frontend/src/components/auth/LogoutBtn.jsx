import { useAuthUserContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { route } from "../../routes";
import dbLocal from "../../utils/dbLocal";


const LogoutBtn = () => {

    const navigate = useNavigate();

    const { setAuthUser } = useAuthUserContext();


    const handelLogout = async () => {
        // await logOut();
        setAuthUser({});
        dbLocal('clear', 'user');
        navigate(route.login);
    }


    return (
        <button
            onClick={handelLogout}
            className="px-3 py-2 bg-red-400 rounded hover:bg-red-500 duration-300"
        >
            Logout
        </button>
    )
}

export default LogoutBtn