import { useLogout } from "../../api/auth/apiService";


const LogoutBtn = () => {

    const { mutate: logout } = useLogout();

    return (
        <button
            onClick={() => logout()}
            className="px-3 py-2 bg-red-400 rounded hover:bg-red-500 duration-300"
        >
            Logout
        </button>
    )
}

export default LogoutBtn