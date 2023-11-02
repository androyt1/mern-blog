import { useLogin } from '../hooks/useLogin'
import Button from './Button'
import { Header } from './Header'
import Input from './Input'

export const Login = () => {
    const { user, handleChange, submit } = useLogin()
    const { email, password } = user

    return (
        <form onSubmit={submit} className='bg-slate-800 h-fit w-full'>
            <Header text='Login' className='' />
            <div className='grid grid-cols-1 gap-y-8  mx-auto bg-transparent md:px-10  rounded-xl p-3 place-items-center'>
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
            <div className=' p-3 md:p-10 '>
                <Button type='submit'>Login</Button>
            </div>
        </form>
    )
}
