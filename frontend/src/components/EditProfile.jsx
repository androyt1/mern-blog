import PropTypes from 'prop-types'
import FormContainer from './FormContainer'
import Input from './Input'
import { ApiServices } from '../services/api'
import { toast } from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

import {
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
} from '../redux/AuthSlice'
import Button from './Button'

const EditProfile = ({ editMode, closeEditMode }) => {
    const auth = useSelector((state) => state.auth.authUser)
    const dispatch = useDispatch()

    const initialState = {
        firstname: '',
        lastname: '',
        email: '',
        avatar: '',
    }
    const [user, setUser] = useState(initialState)
    const { firstname, lastname, email, avatar } = user

    useEffect(() => {
        if (auth) {
            setUser({
                firstname: auth.firstname,
                lastname: auth.lastname,
                email: auth.email,
            })
        }
    }, [auth])

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === 'avatar') {
            setUser({ ...user, avatar: files[0] })
        } else {
            setUser({ ...user, [name]: value })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('firstname', firstname)
        formdata.append('lastname', lastname)
        formdata.append('email', email)
        formdata.append('avatar', avatar)
        dispatch(updateUserStart())
        ApiServices.updateUser(formdata)
            .then((res) => {
                toast.success('User information successfully updated')
                dispatch(updateUserSuccess(res.data))
                closeEditMode()
            })
            .catch((error) => {
                toast.error(error.response.data.message)
                dispatch(updateUserFailure(error.response.data.message))
                closeEditMode()
            })
    }

    return (
        <div
            className={`absolute top-20 right-0 bg-white h-full w-full duration-500 ease-in-out transition-transform ${
                editMode ? 'translate-x-0' : 'translate-x-[200%]'
            }`}
        >
            <FormContainer
                handleSubmit={handleSubmit}
                className='flex flex-col gap-y-4  w-full p-3'
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
                    type='file'
                    label='Upload User Avatar'
                    id='avatar'
                    placeholder=''
                    handleChange={handleChange}
                    className='p-2 w-full bg-slate-100 col-span-4'
                />

                <div className='mt-2'>
                    <Button type='submit' handleClick={handleSubmit}>
                        Save
                    </Button>
                </div>
            </FormContainer>
        </div>
    )
}

EditProfile.propTypes = {
    editMode: PropTypes.bool.isRequired,
    closeEditMode: PropTypes.func.isRequired,
}

export default EditProfile
