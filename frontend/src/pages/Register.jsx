import FormContainer from '../components/FormContainer'
import Input from '../components/Input'
import { useRegister } from '../hooks/useRegister'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ApiServices } from '../services/api'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Register = () => {
    const navigate = useNavigate()
    const { user, handleChange } = useRegister()
    const { firstname, lastname, email, password, avatar } = user

    const handleSubmit = (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('firstname', firstname)
        formdata.append('lastname', lastname)
        formdata.append('email', email)
        formdata.append('password', password)
        formdata.append('avatar', avatar)
        ApiServices.register(formdata)
            .then(() => {
                toast.success('New User Successfully Created')
                navigate('/login')
            })
            .catch((error) => toast.error(error.response.data.message))
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
                    type='text'
                    label='FirstName'
                    id='firstname'
                    placeholder='Enter FirstName'
                    handleChange={handleChange}
                    value={firstname}
                    className='p-2 w-full bg-slate-100 col-span-4'
                />
                <Input
                    type='text'
                    label='LastName'
                    id='lastname'
                    placeholder='Enter LastName'
                    handleChange={handleChange}
                    value={lastname}
                    className='p-2 w-full bg-slate-100 col-span-4'
                />
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
                <Input
                    type='file'
                    label='Upload User Avatar'
                    id='avatar'
                    placeholder=''
                    handleChange={handleChange}
                    className='p-2 w-full bg-slate-100 col-span-4'
                />

                <div className='mt-2'>
                    <button
                        type='submit'
                        onSubmit={handleSubmit}
                        className='bg-slate-700 text-slate-50 font-semibold w-[50%] py-2 rounded-md'
                    >
                        Register
                    </button>
                </div>
            </FormContainer>
        </div>
    )
}

export default Register
