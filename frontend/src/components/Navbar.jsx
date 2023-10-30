import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logout, logoutError } from '../redux/AuthSlice'
import { ApiServices } from '../services/api'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const user = useSelector((state) => state.auth.authUser)
    const avatar = user?.avatar

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        ApiServices.logout()
            .then(() => {
                dispatch(logout())
                navigate('/login')
            })
            .catch(() => dispatch(logoutError()))
    }

    return (
        <div className='h-20 py-3 bg-slate-800 w-full text-slate-50 flex items-center justify-between px-3'>
            <Link className='text-3xl font-semibold' to='/'>
                BlogWeb
            </Link>
            <nav className='flex items-center space-x-3'>
                <Link to='/'>Home</Link>
                {!user && (
                    <div className='space-x-3'>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                    </div>
                )}
                {user && (
                    <div className='flex items-center space-x-3'>
                        <Link to='/profile'>Profile</Link>
                        <Link to='/create-post'>New Post</Link>
                        <button
                            onClick={handleLogout}
                            className='border-2 border-white text-slate-50 px-4 py-1 rounded-md ml-10'
                        >
                            logout
                        </button>
                        <img
                            src={avatar}
                            className='h-10 w-10 rounded-full'
                            alt=''
                        />
                    </div>
                )}
            </nav>
        </div>
    )
}
