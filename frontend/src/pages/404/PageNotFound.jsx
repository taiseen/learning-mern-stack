import { Link } from "react-router-dom"
import { route } from "../../routes"


const PageNotFound = () => {
    return (
        <div className="h-screen grid place-items-center">
            <p className="py-4 px-6 bg-slate-300 rounded text-3xl">
                404 | Page Not Found | {' '}
                <Link to={route.root} className="text-blue-400 hover:underline">
                    Back to home
                </Link>
            </p>
        </div>
    )
}

export default PageNotFound