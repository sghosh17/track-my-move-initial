import { Navigate, Outlet, useLocation } from "react-router-dom"
import Auth from "../../utils/auth";

  const AuthLock = (props) => {
    const location = useLocation();
    return Auth.loggedIn()?< Outlet /> : < Navigate to={"/login"} replace state={{location}} />
}

export default AuthLock