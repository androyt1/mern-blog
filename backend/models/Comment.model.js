import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema(
    {
        content: String,
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
)

const Comment = mongoose.model('Comment', CommentSchema)
export default Comment
