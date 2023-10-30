import {
    createPost,
    allPosts,
    getPostById,
    updatePost,
    likePost,
    likeSinglePost,
} from '../controllers/Post.controller.js'
import { addComment } from '../controllers/Comment.controller.js'
import upload from '../config/upload.js'
import express from 'express'
import { verifyToken } from '../middleware/VerifyToken.js'

const PostRouter = express.Router()

// http://localhost:5050/api/v1/post/create
PostRouter.post('/create', verifyToken, upload.single('image'), createPost)

// http://localhost:5050/api/v1/post/allPosts
PostRouter.get('/allPosts', allPosts)

// http://localhost:5050/api/v1/post/post
PostRouter.get('/post/:id', getPostById)

// http://localhost:5050/api/v1/post/update
PostRouter.put('/update/:id', verifyToken, upload.single('image'), updatePost)

// http://localhost:5050/api/v1/post/like
PostRouter.put('/like/:postId', verifyToken, likePost)

// http://localhost:5050/api/v1/post/like
PostRouter.put('/like-post/:postId', verifyToken, likeSinglePost)

// http://localhost:5050/api/v1/post/like
PostRouter.post(
    '/add-comment/:postId',
    upload.single('image'),
    verifyToken,
    addComment
)
export { PostRouter }
