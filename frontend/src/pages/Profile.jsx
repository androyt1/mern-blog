import { ApiServices } from '../services/api'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    ProfileStart,
    profileFailure,
    profileSuccess,
} from '../redux/AuthSlice'
import EditProfile from '../components/EditProfile'
import Button from '../components/Button'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const Profile = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ProfileStart())
        ApiServices.profile()
            .then((res) => dispatch(profileSuccess(res.data)))
            .catch((err) => dispatch(profileFailure(err.response.data.message)))
    }, [dispatch])
    const user = useSelector((state) => state.auth.authUser)
    const [editMode, setEditMode] = useState(false)

    const toggleMode = () => {
        setEditMode((mode) => !mode)
    }
    const closeEditMode = () => {
        setEditMode(false)
    }

    return (
        <div className='flex flex-col justify-start items-start pt-6 px-3 w-full  relative'>
            <div className='h-[500px] w-full mt-0'>
                <div className='w-full grid grid-cols-2 min-h-[500px]'>
                    <div className='flex justify-center items-center'>
                        <LazyLoadImage
                            src={user?.avatar}
                            alt=''
                            className='rounded-md'
                            effect='blur'
                        />
                    </div>
                    <div className='flex flex-col items-start space-y-3 justify-center relative px-3 overflow-hidden'>
                        <div>
                            <span className='font-semibold'>FirstName: </span>
                            <span>{user?.firstname}</span>
                        </div>
                        <div>
                            <span className='font-semibold'>LastName: </span>
                            <span>{user?.lastname}</span>
                        </div>
                        <div>
                            <span className='font-semibold'>
                                Email Address:{' '}
                            </span>
                            <span>{user?.email}</span>
                        </div>
                        <div className=''>
                            <Button
                                type='button'
                                className=''
                                handleClick={() => {}}
                            >
                                View Your Posts
                            </Button>
                        </div>
                        <EditProfile
                            editMode={editMode}
                            closeEditMode={closeEditMode}
                        />
                    </div>
                </div>
            </div>
            <div className='absolute top-5 right-5'>
                <button onClick={toggleMode} className=''>
                    {editMode ? (
                        <img
                            src='close.svg'
                            className='h-10 w-10 bg-white'
                            alt='close edit mode'
                        />
                    ) : (
                        <img
                            src='edit.svg'
                            className='h-8 w-8 bg-white'
                            alt='close edit mode'
                        />
                    )}
                </button>
            </div>
        </div>
    )
}

export default Profile
