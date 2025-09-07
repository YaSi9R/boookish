import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  post: null,
  editPost: false,
}

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload
    },
    setEditPost: (state, action) => {
      state.editPost = action.payload
    },
    resetPostState: (state) => {
      state.post = null
      state.editPost = false
    },
  },
})

export const { setPost, setEditPost, resetPostState } = postSlice.actions
export default postSlice.reducer
