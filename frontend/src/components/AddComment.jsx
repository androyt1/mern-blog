import { useState } from 'react'
import PropTypes from 'prop-types'
import { ApiServices } from '../services/api'
import {
    addCommentFailure,
    addCommentStart,
    addCommentSuccess,
} from '../redux/PostSlice'
import { useDispatch } from 'react-redux'

const AddComment = ({ postId }) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')

    const handleAddComment = (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('content', comment)
        dispatch(addCommentStart())
        ApiServices.addComment(formdata, postId)
            .then((res) => {
                dispatch(addCommentSuccess(res.data))
                setComment('')
            })
            .catch((err) => {
                dispatch(addCommentFailure(err.response.data))
                setComment('')
            })
    }

    return (
        <form onSubmit={handleAddComment}>
            <textarea
                cols={10}
                rows={3}
                className='w-full h-full p-2'
                placeholder='Add Comment'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            {comment.length > 3 && (
                <div className='w-full flex justify-end'>
                    <button
                        type='submit'
                        className='bg-white p-1 rounded-md shadow-md shadow-black'
                    >
                        Add
                    </button>
                </div>
            )}
        </form>
    )
}
AddComment.propTypes = {
    postId: PropTypes.string.isRequired,
}
export default AddComment
