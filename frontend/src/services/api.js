import axios from 'axios'

const Api = axios.create({
    baseURL: '/api/v1',
})

const register = async (formdata) => await Api.post('/auth/register', formdata)
const login = async (formdata) => await Api.post('/auth/login', formdata)
const profile = async () => await Api.get('/auth/profile')
const logout = async () => await Api.post('/auth/logout')
const updateUser = async (formdata) => await Api.put('/auth/update', formdata)

const allPosts = async () => await Api.get('/post/allPosts')
const getPostById = async (id) => await Api.get(`/post/post/${id}`)
const createPost = async (formdata) => await Api.post('/post/create', formdata)
const updatePost = async (formdata, id) =>
    await Api.put(`/post/update/${id}`, formdata)
const likePost = async (id) => await Api.put(`/post/like/${id}`)
const likeSinglePost = async (id) => await Api.put(`/post/like-post/${id}`)
const addComment = async (formdata, id) =>
    await Api.post(`/post/add-comment/${id}`, formdata)

export const ApiServices = {
    register,
    login,
    profile,
    logout,
    createPost,
    allPosts,
    updateUser,
    getPostById,
    updatePost,
    likePost,
    likeSinglePost,
    addComment,
}
