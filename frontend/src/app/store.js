import { configureStore } from '@reduxjs/toolkit';
import {comments} from './commentsSlice';

export default configureStore({
  reducer: {
    comments: comments.reducer,
  },
});
