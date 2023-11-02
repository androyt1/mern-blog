import padlock from '../assets/padlock3.svg'
import { Register } from '../components/Register'

const RegisterPage = () => {
    return (
        <div className='w-full col-span-6 md:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center h-screen pb-10'>
            <div className='w-full flex justify-center items-center'>
                <img src={padlock} alt='' className='w-[60%]' />
            </div>
            <div className='w-full flex justify-end items-center px-3 '>
                <Register />
            </div>
        </div>
    )
}

export default RegisterPage
