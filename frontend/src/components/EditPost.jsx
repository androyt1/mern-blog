import Input from '../components/Input'
import FormContainer from '../components/FormContainer'
import Button from '../components/Button'
import { ApiServices } from '../services/api'
import {
    updatePostFailure,
    updatePostStart,
    updatePostSuccess,
} from '../redux/PostSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import Editor from 'react-simple-wysiwyg'
import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const EditPost = ({ editMode, setEditMode }) => {
    const dispatch = useDispatch()
    const imageRef = useRef(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [postId, setPostId] = useState('')

    const post = useSelector((state) => state.postdata.post)

    useEffect(() => {
        if (post) {
            setTitle(post?.title)
            setDescription(post?.description)
            setPostId(post._id)
        }
    }, [post])

    function onChange(e) {
        setDescription(e.target.value)
    }

    const reset = () => {
        setTitle('')
        setDescription('')
        imageRef.current.value = ''
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updatePostStart())
        const formdata = new FormData()
        formdata.append('title', title)
        formdata.append('description', description)
        formdata.append('image', image)

        ApiServices.updatePost(formdata, postId)
            .then((res) => {
                dispatch(updatePostSuccess(res.data))
                toast.success('New Post Successfully Created')
                reset()
                setEditMode(false)
            })
            .catch((error) => {
                dispatch(updatePostFailure(error.response.data.message))
                toast.error(error.response.data.message)
            })
    }

    return (
        <div
            className={`w-full md:w-[70%] absolute right-2 top-[20%] bg-white transition-transform duration-1000 ease-in-out border-2 h-fit ${
                editMode ? 'translate-x-0' : 'translate-x-[300%]'
            }`}
        >
            <FormContainer
                handleSubmit={handleSubmit}
                className='flex flex-col gap-y-4 py-10 md:py-20 px-3 w-full'
            >
                <Input
                    type='text'
                    label='Title'
                    id='title'
                    placeholder='Enter Post Title Here'
                    handleChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className='p-2 w-full bg-slate-100 col-span-4'
                />
                <Input
                    imageRef={imageRef}
                    type='file'
                    label='Upload Post Image'
                    id='image'
                    placeholder='Enter Post Image'
                    handleChange={(e) => setImage(e.target.files[0])}
                    className='p-2 w-full bg-slate-100 col-span-4'
                />

                <Editor
                    value={description}
                    onChange={onChange}
                    className='h-[200px]'
                    placeholder='Enter Post Body Here'
                />

                <div className=''>
                    <Button
                        type='submit'
                        handleClick={handleSubmit}
                        className='bg-white text-slate-600 shadow-sm shadow-black font-semibold  !py-1 rounded-md flex items-start gap-x-3'
                    >
                        Update
                    </Button>
                </div>
            </FormContainer>
        </div>
    )
}
EditPost.propTypes = {
    editMode: PropTypes.bool.isRequired,
    setEditMode: PropTypes.func.isRequired,
}
export default EditPost
