import { createSlice } from "@reduxjs/toolkit"

const blogUpdateSlice = createSlice({
    name: 'blogUpdate',
    initialState: true,
    reducers: {
        setBlogUpdate(state) {
            return !state
        }
    }
})

export const { setBlogUpdate } = blogUpdateSlice.actions

export const updateBlog = () => {
    return dispatch => {
        dispatch(setBlogUpdate())
    }
}

export default blogUpdateSlice.reducer