import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const SideBar = () => {
    const user = useSelector((state) => state.auth.user)
    return (
        <div className='bg-slate-800 shadow-md shadow-slate-850 hidden md:flex flex-col justify-center items-center relative bg-yellow flex-5 col-span-1'>
            <div className=' bg-slate-950 space-y-6 h-[40%] w-[70%] shadow-sm shadow-slate-400 text-slate-300 flex flex-col justify-center items-center'>
                <Link to='/'>Home</Link>
                {user && <Link to='/dashboard'>Dashboard</Link>}
                {!user && (
                    <>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                    </>
                )}
                {user && <button>Logout</button>}
            </div>
        </div>
    )
}

export default SideBar
