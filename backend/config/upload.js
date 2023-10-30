import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Configure Multer to use Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'blog2', // optional, set your desired folder
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'], // optional, restrict allowed file types
    },
})

const upload = multer({ storage: storage })

export default upload
