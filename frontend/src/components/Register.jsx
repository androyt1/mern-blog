import { useRegisterUser } from '../hooks/useRegisterUser'
import Button from './Button'
import { Header } from './Header'
import Input from './Input'
import { useRef } from 'react'

export const Register = () => {
    const { user, handleChange, submit, message } = useRegisterUser()
    const { firstname, lastname, email, password, preview } = user
    const imageRef = useRef(null)

    return (
        <form onSubmit={submit} className='bg-slate-800 w-full overflow-y-auto'>
            <Header text='Register' className='' />
            {message && (
                <div className='bg-orange-400 text-slate-800 font-semibold w-full mx-auto px-10 py-3'>
                    {message}
                </div>
            )}
            <div className='grid grid-cols-1 gap-y-4  mx-auto bg-transparent md:px-10  rounded-xl p-3'>
                {/* <div className='w-[100px] h-[100px] md:w-[150px] md:h-[150px] bg-slate-800 rounded-md border-2  border-slate-500 p-3'>
                    <img
                        src={preview}
                        alt=''
                        className='w-full h-full object-cover rounded-md '
                    />
                </div> */}

                <input
                    ref={imageRef}
                    type='file'
                    name='avatar'
                    id='avatar'
                    onChange={handleChange}
                    className='p-2  w-full  bg-slate-600 rounded-md  placeholder-slate-300 shadow-md shadow-slate-850 text-white '
                />
                <Input
                    type='text'
                    id='firstname'
                    name='firstname'
                    value={firstname}
                    placeholder='Enter First Name'
                    handleChange={handleChange}
                />
                <Input
                    type='text'
                    id='lastname'
                    name='lastname'
                    value={lastname}
                    placeholder='Enter Last Name'
                    handleChange={handleChange}
                />
                <Input
                    type='email'
                    id='email'
                    name='email'
                    value={email}
                    placeholder='Enter Email Address'
                    handleChange={handleChange}
                />
                <Input
                    type='password'
                    id='password'
                    name='password'
                    value={password}
                    placeholder='Enter User Password'
                    handleChange={handleChange}
                />
            </div>
            <div className=' p-2 md:px-10 pb-10'>
                <Button type='submit'>Save</Button>
            </div>
        </form>
    )
}
