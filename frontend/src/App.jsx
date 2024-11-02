import { Home, Login, PageNotFound, Register, ResetPassword } from "./pages";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthUserContext } from "./context/AuthContext";
import { route } from "./routes";
import TaskManager from "./pages/tasks";


const App = () => {

  const { authUser: { isAuth } } = useAuthUserContext();

  return (
    <Routes>

      <Route path={route.root} element={isAuth ? <Home /> : <Navigate to={route.login} />} />
      <Route path={route.home} element={isAuth ? <Home /> : <Navigate to={route.login} />} />

      <Route path={route.tasks} element={<TaskManager />} />
      <Route path={route.login} element={<Login />} />
      <Route path={route.register} element={<Register />} />
      <Route path={route.resetPassword} element={<ResetPassword />} />

      <Route path={route.pageNotFound} element={<PageNotFound />} />

    </Routes>
  )
}

export default App