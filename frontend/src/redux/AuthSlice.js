import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authUser: null,
    loading: false,
    error: null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.loading = false
            state.authUser = action.payload
            state.error = null
        },
        signInFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        ProfileStart: (state) => {
            state.loading = true
        },
        profileSuccess: (state, action) => {
            state.loading = false
            state.authUser = action.payload
            state.error = null
        },
        profileFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateUserStart: (state) => {
            state.loading = true
        },
        updateUserSuccess: (state, action) => {
            state.loading = false
            state.authUser = action.payload
        },
        updateUserFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        logout: (state) => {
            state.loading = false
            state.authUser = null
            state.error = null
        },
        logoutError: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    },
})
export const {
    signInStart,
    signInSuccess,
    signInFailure,
    profileFailure,
    profileSuccess,
    ProfileStart,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
    logout,
    logoutError,
} = authSlice.actions
export default authSlice.reducer
