import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        firstname: String,
        lastname: String,
        email: String,
        password: String,
        avatar: String,
        photo_id: String,
    },
    { timestamps: true }
)

const User = mongoose.model('User', UserSchema)

export default User
