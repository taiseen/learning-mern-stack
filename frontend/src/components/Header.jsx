import { Link } from "react-router-dom";
import LogoutBtn from "./auth/LogoutBtn";


export const Header = ({ authUser }) => {

    return (
        <header className="flex justify-end items-center gap-4 p-4 bg-slate-200 backdrop-blur-md">

            <Link to="/tasks">Task</Link>

            <p className="font-semibold">{authUser?.email || 'unknown'}</p>

            <LogoutBtn />
        </header>
    )
}
