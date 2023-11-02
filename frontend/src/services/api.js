import axios from 'axios'

const Api = axios.create({
    baseURL: 'https://blog-api-service-ayvy.onrender.com',
})

const register = async (formdata) =>
    await Api.post('/v1/auth/register', formdata)
const login = async (formdata) => await Api.post('/v1/auth/login', formdata)
const profile = async () => await Api.get('/v1/auth/profile')
const update = async (formdatat) => await Api.put(`/v1/auth/update`, formdatat)
const logout = async () => await Api.post('/v1/auth/logout')

export const services = { register, login, profile, logout, update }
