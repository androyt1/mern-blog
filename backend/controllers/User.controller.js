import cloudinary from '../config/cloudinary.js'
import bcrypt from 'bcrypt'
import AsyncHandler from 'express-async-handler'
import User from '../models/User.model.js'
import jwt from 'jsonwebtoken'

const register = AsyncHandler(async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body
    try {
        if (!email) {
            throw new Error('Email is required')
        }
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            throw new Error('User already exist, please login to continue ')
        }
    } catch (error) {
        return next(error)
    }

    try {
        if (!firstname) {
            throw new Error('Firstname is required')
        }
        if (!lastname) {
            throw new Error('Lastname is required')
        }

        if (!password) {
            throw new Error('Password is required')
        }
        if (!req.file || req.file.length === 0) {
            throw new Error('User avatar is required')
        }
    } catch (error) {
        return next(error)
    }
    const data = {}
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        data.password = hashedPassword
    } catch (error) {
        return next('Password hashing failed ', error)
    }
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        if (result.secure_url) {
            data.avatar = result.secure_url
            data.photo_id = result.public_id
        }
        if (!result.secure_url) {
            throw new Error('Something went wrong uploading file')
        }
    } catch (error) {
        return next('File upload failed ', error)
    }

    data.firstname = firstname
    data.lastname = lastname
    data.email = email
    try {
        const newUser = await User.create(data)
        const { password, ...rest } = newUser._doc
        return res.status(201).json(rest)
    } catch (error) {
        return next('Something went wrong ', error)
    }
})

const login = AsyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    try {
        if (!email) {
            throw new Error('Email is Required')
        }
        if (!password) {
            throw new Error('Password is required')
        }
        const user = await User.findOne({ email: email })

        if (user === null) {
            throw new Error('Account not found , please register and try again')
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            throw new Error('Email or Password is incorrect')
        }
        const token = await jwt.sign(
            { _id: user._id, email: user.email },
            process.env.JWT_SECRET
        )
        res.cookie('token', token, { expiresIn: '1d' })
        res.status(200).json(token)
    } catch (error) {
        return next(error)
    }
})

const profile = AsyncHandler(async (req, res, next) => {
    try {
        const user = await User.findById(req.user)
        const { password, ...rest } = user._doc
        return res.status(200).json(rest)
    } catch (error) {
        return next(error)
    }
})

const updateUser = AsyncHandler(async (req, res, next) => {
    const { firstname, lastname, email } = req.body
    const data = {}
    try {
        const user = await User.findById(req.user)
        if (req.file) {
            const photo_id = user.photo_id
            const result = await cloudinary.uploader.destroy(photo_id)
            const newResult = await cloudinary.uploader.upload(req.file.path)
            data.avatar = newResult.secure_url
            data.photo_id = newResult.public_id
        }

        if (firstname) {
            data.firstname = firstname
        }
        if (lastname) {
            data.lastname = lastname
        }
        if (email) {
            data.email = email
        }

        const updated = await User.findOneAndUpdate({ _id: req.user }, data, {
            returnOriginal: false,
        })
        const { password, ...rest } = updated._doc
        return res.status(200).json(rest)
    } catch (error) {
        return next(error)
    }
})

const logout = AsyncHandler(async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({ message: 'Logged out successfully' })
})

export { register, login, profile, logout, updateUser }
