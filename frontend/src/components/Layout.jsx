import SideBar from './SideBar'

import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className='w-full  grid grid-cols-6 gap-6'>
            <SideBar />
            <Outlet />
        </div>
    )
}

export default Layout
