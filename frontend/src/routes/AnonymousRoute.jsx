
import { Navigate, Outlet } from "react-router-dom";

import { route } from ".";

const AnonymousRoute = () => {
    // const [user, loading] = useAuthState(firebaseAuth);

    if (false) return (
        <div className="h-screen grid place-items-center">
            <p className="text-4xl font-semibold">User info loading...</p>
        </div>
    )

    return false
        ? <Outlet />
        : <Navigate to={route.root} />
}

export default AnonymousRoute