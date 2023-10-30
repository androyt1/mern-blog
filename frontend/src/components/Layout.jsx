import { Navbar } from './Navbar'
import { Toaster } from 'react-hot-toast'

import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className='w-full h-screen flex flex-col justify-start items-start bg-white'>
            <Navbar />
            <main className='flex-1 w-full '>
                <Outlet />
            </main>
            <Toaster />
        </div>
    )
}
export default Layout
