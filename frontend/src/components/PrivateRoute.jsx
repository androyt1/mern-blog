import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export const PrivateRoute = () => {
    const token = useSelector((state) => state.auth.token)
    return token ? <Outlet /> : <Navigate to='/login' />
}
