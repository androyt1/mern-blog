import Input from '../components/Input'
import FormContainer from '../components/FormContainer'
import { useCreatePost } from '../hooks/useCreatePost'
import Button from '../components/Button'
import { ApiServices } from '../services/api'
import {
    createPostError,
    createPostSuccess,
    createPostStart,
} from '../redux/PostSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import Editor from 'react-simple-wysiwyg'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const NewPost = () => {
    const dispatch = useDispatch()
    const { post, handleChange, imageRef, reset } = useCreatePost()
    const { title, image, preview, description } = post

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createPostStart())
        const formdata = new FormData()
        formdata.append('title', title)
        formdata.append('description', description)
        formdata.append('image', image)

        ApiServices.createPost(formdata)
            .then((res) => {
                dispatch(createPostSuccess(res.data.newPost))
                toast.success('New Post Successfully Created')
                reset()
            })
            .catch((error) => {
                dispatch(createPostError(error.response.data.message))
                toast.error(error.response.data.message)
            })
    }

    return (
        <div className='w-full h-fit md:w-[50%] bg-white'>
            <FormContainer
                handleSubmit={handleSubmit}
                className='flex flex-col gap-y-10 py-10 md:py-20 px-3 w-full h-full '
            >
                <Input
                    type='text'
                    label='Title'
                    id='title'
                    placeholder='Enter Post Title Here'
                    handleChange={handleChange}
                    value={title}
                    className='p-2 w-full bg-slate-100 col-span-4'
                />

                <div className='flex flex-col justify-start items-start gap-y-4'>
                    <label htmlFor='image'>Upload Post Image</label>
                    <div className='w-full flex justify-center items-center'>
                        <LazyLoadImage
                            effect='blur'
                            src={preview}
                            className='h-[200px] w-200px object-contain rounded-md'
                            alt=''
                        />
                    </div>

                    <Input
                        imageRef={imageRef}
                        type='file'
                        label=''
                        id='image'
                        placeholder='Enter Post Image'
                        handleChange={handleChange}
                        className='p-2 w-full bg-slate-100 '
                    />
                </div>

                <div className='flex flex-col items-start justify-start gap-y-4'>
                    <div className='flex items-center'>
                        <label htmlFor='description'>
                            <span className='font-semibold'>
                                Enter Post Content
                            </span>
                        </label>
                    </div>
                    <Editor
                        value={description}
                        name='description'
                        id='description'
                        onChange={handleChange}
                        className='h-[200px]'
                        placeholder='Enter Post Body Here'
                    />
                </div>

                <div className='mt-2'>
                    <Button
                        type='submit'
                        handleClick={handleSubmit}
                        className='bg-white text-slate-600 shadow-sm shadow-black font-semibold  !py-1 rounded-md flex items-start gap-x-3'
                    >
                        Create{' '}
                        <img src='send.svg' className='h-6 w-6' alt='submit' />
                    </Button>
                </div>
            </FormContainer>
        </div>
    )
}

export default NewPost
