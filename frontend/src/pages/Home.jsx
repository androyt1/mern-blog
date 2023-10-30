import {
    loadingPostsError,
    loadingPostsSuccess,
    loadingPostsStart,
    likePostFailure,
    likePostStart,
    likePostSuccess,
} from '../redux/PostSlice'
import { ApiServices } from '../services/api'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { Link } from 'react-router-dom'
import AddComment from '../components/AddComment'

const Home = () => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.postdata.posts)
    useEffect(() => {
        const fetchPost = async () => {
            dispatch(loadingPostsStart())
            ApiServices.allPosts()
                .then((res) => {
                    dispatch(loadingPostsSuccess(res.data))
                })
                .catch((err) => dispatch(loadingPostsError(err.response.data)))
        }
        fetchPost()
    }, [dispatch])

    const handleLike = (id) => {
        dispatch(likePostStart())
        ApiServices.likePost(id)
            .then((res) => {
                dispatch(likePostSuccess(res.data))
            })
            .catch((err) => {
                console.log('err', err)
                dispatch(likePostFailure(err.response.data))
            })
    }

    return (
        <div className='w-full bg-white p-3'>
            <div className='w-full'>
                {posts?.posts?.map((post) => (
                    <div key={post._id} className='w-full mb-6'>
                        <Link to={`/post/${post._id}`}>
                            <h3 className='font-semibold text-center uppercase text-4xl mb-4 mt-8'>
                                {post?.title}
                            </h3>
                        </Link>
                        <div className='w-full flex justify-center'>
                            <LazyLoadImage
                                src={post?.image}
                                alt={post?.title}
                                effect='blur'
                                className='w-full max-h-[400px] object-cover mb-3'
                            />
                        </div>
                        <div className='px-3'>
                            <p>
                                {post?.description.substr(0, 150)} ...{' '}
                                <Link to={`/post/${post._id}`}>Read More</Link>
                            </p>
                        </div>

                        <div className=''>
                            <p className='px-3'>
                                <span className='text-xl'> By</span>{' '}
                                <span className='font-semibold'>
                                    {post?.owner?.lastname}
                                </span>{' '}
                                <span className='font-semibold'>
                                    {post?.owner?.firstname}
                                </span>
                            </p>
                        </div>
                        <div className='flex justify-between w-[10%] px-3 mt-2 '>
                            <div className='relative w-9'>
                                <img
                                    src='like.svg'
                                    className='w-6 h-6 cursor-pointer'
                                    alt=''
                                    onClick={() => handleLike(post?._id)}
                                />
                                <span className='absolute top-0 right-0'>
                                    {post?.likes?.length}
                                </span>
                            </div>
                            <div className='relative w-9'>
                                <img
                                    src='comment.svg'
                                    className='w-6 h-6 cursor-pointer'
                                    alt=''
                                />
                                <span className='absolute top-0 right-0'>
                                    {post?.comments?.length}
                                </span>
                            </div>
                        </div>
                        <div className='bg-slate-200 w-full h-fit mt-4 p-2'>
                            <AddComment postId={post._id} />
                        </div>
                        <div>
                            <p className='text-xl font-semibold'>Comments</p>
                            {post?.comments?.map((comment) => (
                                <p key={comment._id} className='px-3'>
                                    <span className='font-semibold'>
                                        {comment?.user?.lastname}
                                    </span>{' '}
                                    <span className='font-semibold'>
                                        {comment?.user?.firstname}
                                    </span>
                                    {' :'}
                                    <span className='italic'>
                                        {' '}
                                        {comment?.content}
                                    </span>
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
