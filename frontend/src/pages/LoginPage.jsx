import { Login } from '../components/Login'
import padlock from '../assets/padlock2.svg'

const LoginPage = () => {
    return (
        <div className='w-full px-3 col-span-6 md:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center h-screen'>
            <div className='w-full flex justify-center items-center'>
                <img src={padlock} alt='' className='w-[60%]' />
            </div>
            <div className='w-full flex justify-center items-center md:justify-center '>
                <Login />
            </div>
        </div>
    )
}

export default LoginPage
