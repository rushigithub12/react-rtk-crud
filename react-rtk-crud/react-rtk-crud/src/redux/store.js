import { configureStore } from '@reduxjs/toolkit';
import PostSlice from './features/PostSlice';

const store = configureStore({
    reducer: {
        post: PostSlice,
    }
})

export default store;