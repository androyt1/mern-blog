import AsyncHandler from 'express-async-handler'
import cloudinary from '../config/cloudinary.js'
import Post from '../models/Post.model.js'
import User from '../models/User.model.js'

const createPost = AsyncHandler(async (req, res) => {
    console.log(req.file)
    const { title, description } = req.body

    try {
        if (!title) {
            throw new Error('Post title is required')
        }
        if (!description) {
            throw new Error('Post description is required')
        }
        if (!req.file) {
            throw new Error('Please upload one image for this post')
        }
        const data = {}

        try {
            const result = await cloudinary.uploader.upload(req.file.path)
            data.image = result.secure_url
            data.image_public_id = result.public_id
        } catch (error) {
            throw new Error(error)
        }
        const owner = await User.findById(req.user)
        if (!owner) {
            throw new Error(
                'You are not authorized to carry out this operation'
            )
        }
        data.owner = owner._id
        data.title = title
        data.description = description
        const newPost = await Post.create(data)
        return res
            .status(201)
            .json({ message: 'New Post Successfully created', newPost })
    } catch (error) {
        throw new Error(error)
    }
})

const allPosts = AsyncHandler(async (req, res) => {
    try {
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
        throw new Error(error)
    }
})

const getPostById = AsyncHandler(async (req, res) => {
    const postId = req.params.id
    try {
        const post = await Post.findById(postId).populate({
            path: 'owner',
            select: 'firstname lastname email avatar',
        })
        return res.status(200).json(post)
    } catch (error) {
        throw new Error(error)
    }
})

const updatePost = AsyncHandler(async (req, res) => {
    const postId = req.params.id
    try {
        const { title, description } = req.body
        const post = await Post.findById(postId)
        const owner = post.owner.valueOf()
        const user = req.user

        if (owner === user) {
            const data = {}

            if (req.file) {
                const photo_id = post.public_id
                cloudinary.uploader
                    .destroy(photo_id)
                    .then(() => console.log('Old image deleted'))
                    .catch((error) =>
                        console.log('Error deleting old image', +error)
                    )
                const result = await cloudinary.uploader.upload(req.file.path)
                data.image = result.secure_url
                data.image_public_id = result.public_id
            }
            data.title = title
            data.description = description
            data.owner = req.user
            const updatedPost = await Post.findOneAndUpdate(
                { _id: postId },
                data,
                {
                    returnOriginal: false,
                }
            )
            return res.status(201).json(updatedPost)
        } else {
            throw new Error('You are not authorized')
        }
    } catch (error) {
        throw new Error(error)
    }
})

const likePost = AsyncHandler(async (req, res) => {
    const postId = req.params.postId
    const userId = req.user

    try {
        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ error: 'Post does not exist' })
        }

        if (post.likes.includes(userId)) {
            const filteredLikes = post.likes.filter(
                (likeUserId) => likeUserId !== userId
            )
            post.likes = filteredLikes
        } else {
            post.likes.push(userId)
        }

        await post.save()
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
        return res.status(500).json({ error: 'Internal server error', error })
    }
})

const likeSinglePost = AsyncHandler(async (req, res) => {
    const postId = req.params.postId
    const userId = req.user

    try {
        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ error: 'Post does not exist' })
        }

        if (post.likes.includes(userId)) {
            const filteredLikes = post.likes.filter(
                (likeUserId) => likeUserId !== userId
            )
            post.likes = filteredLikes
        } else {
            post.likes.push(userId)
        }

        await post.save()

        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error', error })
    }
})

export {
    createPost,
    allPosts,
    getPostById,
    updatePost,
    likePost,
    likeSinglePost,
}
