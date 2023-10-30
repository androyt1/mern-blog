import jwt from 'jsonwebtoken'
import AsyncHandler from 'express-async-handler'

const verifyToken = AsyncHandler(async (req, res, next) => {
    const token = req.cookies.token
    try {
        if (!token) {
            throw new Error('No token provided, unauthorized')
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            throw new Error('Invalid Token Provided')
        }
        req.user = decoded._id
        next()
    } catch (error) {
        throw new Error(error)
    }
})

export { verifyToken }
