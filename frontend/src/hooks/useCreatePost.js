import { useState, useRef } from 'react'

export const useCreatePost = () => {
    const imageRef = useRef(null)
    const initialState = {
        title: '',
        description: '',
        image: '',
        preview: 'upload.jpg',
    }
    const [post, setPost] = useState(initialState)
    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === 'image') {
            setPost({
                ...post,
                preview: URL.createObjectURL(files[0]),
                image: files[0],
            })
        } else {
            setPost({ ...post, [name]: value })
        }
    }
    const reset = () => {
        setPost(initialState)
        imageRef.current.value = ''
    }
    return { post, handleChange, reset, imageRef }
}
