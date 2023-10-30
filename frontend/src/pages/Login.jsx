import FormContainer from '../components/FormContainer'
import Input from '../components/Input'
import { useRegister } from '../hooks/useRegister'
import { signInStart, signInSuccess, signInFailure } from '../redux/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ApiServices } from '../services/api'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, handleChange } = useRegister()
    const { email, password } = user

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(signInStart())
        ApiServices.login({ email, password })
            .then((res) => {
                dispatch(signInSuccess(res.data))
                navigate('/profile')
            })
            .catch((error) => {
                dispatch(signInFailure(error.response))
                toast.error(error.response.data.message)
            })
    }
    const auth = useSelector((state) => state.auth.authUser)
    useEffect(() => {
        auth && navigate('/profile')
    }, [auth, navigate])
    return (
        <div className='w-full md:w-[50%]'>
            <FormContainer
                handleSubmit={handleSubmit}
                className='flex flex-col gap-y-4 py-10 md:py-20 px-3 w-full'
            >
                <Input
                    type='email'
                    label='Email Address'
                    id='email'
                    placeholder='Enter Email Address'
                    handleChange={handleChange}
                    value={email}
                    className='p-2 w-full bg-slate-100 col-span-4'
                />
                <Input
                    type='password'
                    label='Password'
                    id='password'
                    placeholder='Enter Password'
                    handleChange={handleChange}
                    value={password}
                    className='p-2 w-full bg-slate-100 col-span-4'
                />

                <div className='mt-2'>
                    <button
                        type='submit'
                        onClick={handleSubmit}
                        className='bg-slate-700 text-slate-50 font-semibold w-[50%] py-2 rounded-md'
                    >
                        Login
                    </button>
                </div>
            </FormContainer>
        </div>
    )
}

export default Login
