import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { services } from '../services/api'
import {
    profileFailure,
    profileStart,
    profileSuccess,
    updateProfileFailure,
    updateProfileStart,
    updateProfileSuccess,
} from '../features/userSlice'

export const useProfile = () => {
    const dispatch = useDispatch()
    const { user, loading } = useSelector((state) => state.auth)

    const initialState = {
        firstname: '',
        lastname: '',
        email: '',
        avatar: {},
        mode: false,
    }

    const [edit, setEdit] = useState(initialState)

    const toggleMode = () => {
        setEdit((prevState) => ({ ...prevState, mode: !prevState.mode }))
    }

    const cancelEdit = () => {
        setEdit((prevState) => ({ ...prevState, mode: false }))
    }

    useEffect(() => {
        const getUserDetails = () => {
            dispatch(profileStart())
            services
                .profile()
                .then((res) => {
                    dispatch(profileSuccess(res.data))
                })
                .catch((error) => {
                    dispatch(profileFailure(error.response.data))
                })
        }
        getUserDetails()
    }, [dispatch])

    useEffect(() => {
        user &&
            setEdit((prevState) => ({
                ...prevState,
                firstname: user?.firstname,
            }))
        user &&
            setEdit((prevState) => ({
                ...prevState,
                lastname: user?.lastname,
            }))
        user &&
            setEdit((prevState) => ({
                ...prevState,
                email: user?.email,
            }))
    }, [user])

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === 'avatar') {
            setEdit((prevState) => ({ ...prevState, avatar: files[0] }))
        } else {
            setEdit((prevState) => ({ ...prevState, [name]: value }))
        }
    }

    const { firstname, lastname, email, avatar } = edit

    const handleSubmit = () => {
        const formdata = new FormData()
        formdata.append('firstname', firstname)
        formdata.append('lastname', lastname)
        formdata.append('email', email)
        formdata.append('avatar', avatar)
        dispatch(updateProfileStart())
        services
            .update(formdata)
            .then((res) => {
                dispatch(updateProfileSuccess(res.data))
                setEdit((prev) => ({ ...prev, mode: false }))
            })
            .catch((error) => {
                dispatch(updateProfileFailure(error.response.data))
            })
    }

    return {
        user,
        toggleMode,
        edit,
        handleChange,
        cancelEdit,
        handleSubmit,
        loading,
    }
}
