import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'
import NewPost from './pages/NewPost'
import Home from './pages/Home'
import PostDetails from './pages/PostDetails'

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/post/:id' element={<PostDetails />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route element={<PrivateRoute />}>
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/create-post' element={<NewPost />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default App
