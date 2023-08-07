import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'universal-cookie'

export const ProtectedRoute = ({children, redirecTo='/'}) => {
    
    const cookies = new Cookies()
    let slog = cookies.get('token')
    const user = slog === 'OK'? true : false

    console.log(user)
    if (!user){
        return <Navigate to={redirecTo} />
    }


    return children ? children : <Outlet />
}