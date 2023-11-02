import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import DashBoard from './pages/DashBoard'
import { PrivateRoute } from './components/PrivateRoute'

export default function App() {
    return (
        <Routes>
            <Route path='' element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='register' element={<RegisterPage />} />
                <Route element={<PrivateRoute />}>
                    <Route path='dashboard' element={<DashBoard />} />
                </Route>
            </Route>
        </Routes>
    )
}
