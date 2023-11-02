import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registerLoading: (state) => {
            state.loading = true
        },
        registerSuccess: (state, action) => {
            state.loading = false
            state.user = action.payload
        },
        registerFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.token = action.payload
        },
        loginFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        profileStart: (state) => {
            state.loading = false
        },
        profileSuccess: (state, action) => {
            state.loading = false
            state.user = action.payload
        },
        profileFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateProfileStart: (state) => {
            state.loading = true
        },
        updateProfileSuccess: (state, action) => {
            state.loading = false
            state.user = action.payload
        },
        updateProfileFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    },
})
export const {
    registerFailure,
    registerLoading,
    registerSuccess,
    loginStart,
    loginSuccess,
    loginFailure,
    profileFailure,
    profileStart,
    profileSuccess,
    updateProfileFailure,
    updateProfileStart,
    updateProfileSuccess,
} = userSlice.actions
export default userSlice.reducer
