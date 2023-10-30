import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        image: String,
        image_public_id: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        likes: {
            type: [String],
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
    },

    { timestamps: true }
)
const Post = new mongoose.model('Post', PostSchema)
export default Post
