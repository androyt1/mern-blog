import { useState } from 'react'

const useRegister = () => {
    const initialState = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        avatar: '',
    }
    const [user, setUser] = useState(initialState)

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === 'avatar') {
            const updateAvatar = { ...user, avatar: files[0] }
            setUser(updateAvatar)
        } else {
            const otherFields = { ...user, [name]: value }
            setUser(otherFields)
        }
    }
    return { user, handleChange }
}
export { useRegister }
