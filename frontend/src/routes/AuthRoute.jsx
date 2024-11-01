
import { Navigate, Outlet } from "react-router-dom";

import { route } from ".";

const AuthRoute = () => {

    const [user, loading] = useAuthState(firebaseAuth);

    if (loading) return (
        <div className="h-screen grid place-items-center">
            <p className="text-4xl font-semibold">User info loading...</p>
        </div>
    )

    return user
        ? <Outlet />
        : <Navigate to={route.login} />
}

export default AuthRoute