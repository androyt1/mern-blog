import { useParams } from 'react-router-dom'
import { ApiServices } from '../services/api'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    likeSinglePostFailure,
    likeSinglePostStart,
    likeSinglePostSuccess,
} from '../redux/PostSlice'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

import {
    postDetailsFailure,
    postDetailsStart,
    postDetailsSuccess,
} from '../redux/PostSlice'
import Button from '../components/Button'
import EditPost from '../components/EditPost'
import like from '../assets/like.svg'
import comment from '../assets/comment.svg'

const PostDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const [editMode, setEditMode] = useState(false)
    const toggleEditMode = () => {
        setEditMode((mode) => !mode)
    }

    useEffect(() => {
        dispatch(postDetailsStart())
        ApiServices.getPostById(id)
            .then((res) => {
                dispatch(postDetailsSuccess(res.data))
            })
            .catch((err) =>
                dispatch(postDetailsFailure(err.response.data.message))
            )
    }, [id, dispatch])
    const post = useSelector((state) => state.postdata.post)
    const user = useSelector((state) => state.auth.authUser)
    const authUserId = user ? user._id : ''
    const ownerId = post?.owner?._id || post?.owner

    const handleLike = (id) => {
        dispatch(likeSinglePostStart())
        ApiServices.likeSinglePost(id)
            .then((res) => {
                dispatch(likeSinglePostSuccess(res.data))
            })
            .catch((err) => {
                console.log('err', err)
                dispatch(likeSinglePostFailure(err.response.data))
            })
    }

    return (
        <div className='relative overflow-hidden py-10 w-full'>
            <h1 className='text-4xl uppercase py-3 mb-3 text-center'>
                {post.title}
            </h1>
            <div className='relative overflow-hidden h-[400px] w-full flex justify-center items-center'>
                <LazyLoadImage
                    effect='blur'
                    src={post?.image}
                    alt=''
                    className='w-screen object-cover h-full my-4'
                    style={{
                        width: '100%',
                        objectFit: 'cover',
                        height: '400px',
                    }}
                />
            </div>
            <div className='mt-6'>{post?.description}</div>
            {authUserId === ownerId && (
                <div className='absolute left-0 bottom-40'>
                    <Button
                        type='button'
                        handleClick={toggleEditMode}
                        className='!py-1'
                    >
                        Edit
                    </Button>
                </div>
            )}
            <EditPost editMode={editMode} setEditMode={setEditMode} />
            <div className='w-[30%] flex justify-start items-center space-x-5 mt-4 mb-6'>
                <div className='relative w-9'>
                    <img
                        src={like}
                        className='w-6 h-6 cursor-pointer'
                        alt=''
                        onClick={() => handleLike(post?._id)}
                    />
                    <span className='absolute top-0 right-0'>
                        {post?.likes?.length}
                    </span>
                </div>
                <div>
                    <img
                        src={comment}
                        className='w-6 h-6 cursor-pointer'
                        alt=''
                    />
                </div>
            </div>
        </div>
    )
}

export default PostDetails
