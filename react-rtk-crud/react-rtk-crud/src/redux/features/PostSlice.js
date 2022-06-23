import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPost = createAsyncThunk("post/fetchPosts", async ({ id }) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(
    (response) => response.json()
  );
});

const initialState = {
  loading: false,
  post: [],
  error: "",
};

const PostSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: {
    [fetchPost.pending]: (state) => {
      state.loading = true;
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [fetchPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default PostSlice.reducer;
