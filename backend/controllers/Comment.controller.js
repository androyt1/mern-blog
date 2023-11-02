import AsychHandler from 'express-async-handler'
import Comment from '../models/Comment.model.js'
import Post from '../models/Post.model.js'

const addComment = AsychHandler(async (req, res, next) => {
    const { content } = req.body
    if (!content) {
        return res.status(400).json({ message: 'Comment must have content' })
    }
    try {
        const user = req.user
        const postId = req.params.postId
        const comment = await Comment.create({
            content: content,
            post: postId,
            user: user,
        })
        const post = await Post.findById(postId)
        post.comments.push(comment)
        post.save()
        const posts = await Post.find({})
            .populate({
                path: 'owner',
                select: 'firstname lastname email avatar',
            })
            .populate({
                path: 'comments',
                select: 'content user',
                populate: { path: 'user', select: 'firstname lastname' },
            })

        res.status(200).json({ posts: posts })
    } catch (error) {
        return next(error)
    }
})

export { addComment }
