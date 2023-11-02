import { useState } from 'react'
import { services } from '../services/api'
import {
    registerFailure,
    registerLoading,
    registerSuccess,
} from '../features/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const useRegisterUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const initialState = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        preview: 'user.svg',
        avatar: '',
    }
    const [message, setMessage] = useState('')
    const [user, setUser] = useState(initialState)
    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === 'avatar') {
            setUser({
                ...user,
                preview: URL.createObjectURL(files[0]),
                avatar: files[0],
            })
        } else {
            setUser({ ...user, [name]: value })
        }
    }

    const { firstname, lastname, email, password, avatar } = user

    const submit = (e) => {
        e.preventDefault()
        console.log('Submit clicked')
        const formdata = new FormData()
        formdata.append('firstname', firstname)
        formdata.append('lastname', lastname)
        formdata.append('email', email)
        formdata.append('password', password)
        formdata.append('avatar', avatar)
        dispatch(registerLoading())
        services
            .register(formdata)
            .then((res) => {
                console.log(res.data)
                setUser(initialState)
                dispatch(registerSuccess(res.data))
                setMessage('New User Successfully Created')
                setTimeout(() => {
                    navigate('/login')
                }, 5000)
            })
            .catch((err) => {
                dispatch(registerFailure(err.response.data))
                setUser(initialState)
            })
    }

    return { user, handleChange, submit, message }
}
export { useRegisterUser }
