import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { AuthRouter } from './routes/User.routes.js'
import { PostRouter } from './routes/Post.routes.js'
import cookieParser from 'cookie-parser'
import { ErrorHandler } from './utils/ErrorHandler.js'

dotenv.config()

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('Database Successfully Connected'))
    .catch((error) => console.log('Error Connecting to Database', error))

const app = express()

app.use(
    cors({ origin: 'https://androy-mern-blog.netlify.app/', credentials: true })
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/post', PostRouter)
app.use(ErrorHandler)

const port = 5050 || process.env.PORT
app.listen(port, () => console.log(`Server is running on ${port}`))
