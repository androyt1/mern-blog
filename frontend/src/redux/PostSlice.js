import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    post: {},
    posts: [],
    error: null,
    loading: false,
}
const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        createPostStart: (state) => {
            state.loading = true
        },
        createPostSuccess: (state, action) => {
            state.loading = false
            state.post = action.payload
        },
        createPostError: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        loadingPostsStart: (state) => {
            state.loading = true
        },
        loadingPostsSuccess: (state, action) => {
            state.loading = false
            state.posts = action.payload
        },
        loadingPostsError: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        postDetailsStart: (state) => {
            state.loading = false
        },
        postDetailsSuccess: (state, action) => {
            state.loading = false
            state.post = action.payload
        },
        postDetailsFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updatePostStart: (state) => {
            state.loading = true
        },
        updatePostSuccess: (state, action) => {
            state.loading = false
            state.post = action.payload
        },
        updatePostFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        likePostStart: (state) => {
            state.loading = true
        },
        likePostSuccess: (state, action) => {
            state.loading = false
            state.posts = action.payload
        },
        likePostFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        likeSinglePostStart: (state) => {
            state.loading = true
        },
        likeSinglePostSuccess: (state, action) => {
            state.loading = false
            state.post = action.payload
        },
        likeSinglePostFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        addCommentStart: (state) => {
            state.loading = false
        },
        addCommentSuccess: (state, action) => {
            state.loading = false
            state.posts = action.payload
        },
        addCommentFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    },
})
export const {
    createPostStart,
    createPostError,
    createPostSuccess,
    loadingPostsStart,
    loadingPostsSuccess,
    loadingPostsError,
    postDetailsFailure,
    postDetailsStart,
    postDetailsSuccess,
    updatePostFailure,
    updatePostStart,
    updatePostSuccess,
    likePostFailure,
    likePostStart,
    likePostSuccess,
    likeSinglePostFailure,
    likeSinglePostStart,
    likeSinglePostSuccess,
    addCommentFailure,
    addCommentStart,
    addCommentSuccess,
} = postSlice.actions
export default postSlice.reducer
