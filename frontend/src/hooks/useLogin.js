import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../features/userSlice'
import { useNavigate } from 'react-router-dom'
import { services } from '../services/api'

export const useLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector((state) => state.auth.loading)

    const initialState = {
        email: '',
        password: '',
    }

    const [user, setUser] = useState(initialState)
    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const reset = () => {
        setUser(initialState)
    }

    const { email, password } = user

    const submit = (e) => {
        e.preventDefault()
        dispatch(loginStart())
        services
            .login({ email, password })
            .then((res) => {
                dispatch(loginSuccess(res.data))
                reset()
                navigate('/dashboard')
            })
            .catch((err) => {
                reset()
                dispatch(loginFailure(err.response.data))
            })
    }

    return { user, handleChange, submit, loading }
}
