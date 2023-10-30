import {
    register,
    login,
    profile,
    logout,
    updateUser,
} from '../controllers/User.controller.js'
import upload from '../config/upload.js'
import express from 'express'
import { verifyToken } from '../middleware/VerifyToken.js'

const AuthRouter = express.Router()

// http://localhost:5050/api/v1/auth/register
AuthRouter.post('/register', upload.single('avatar'), register)

// http://localhost:5050/api/v1/auth/login
AuthRouter.post('/login', login)

// http://localhost:5050/api/v1/auth/profile
AuthRouter.get('/profile', verifyToken, profile)

// http://localhost:5050/api/v1/auth/update
AuthRouter.put('/update', verifyToken, upload.single('avatar'), updateUser)

// http://localhost:5050/api/v1/auth/logout
AuthRouter.post('/logout', logout)

export { AuthRouter }
