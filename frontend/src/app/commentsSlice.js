import {GetComments} from '../services/comments'
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';

export const setCommentsDBError = createAction('setCommentsError');
export const newCommentError = createAction('newCommentError');
export const editCommentError = createAction('editCommentError');
export const deleteCommentError = createAction('deleteCommentError');

export const comments = createSlice({
    name: 'comments',
    initialState: {},
    reducers: {
        setCommentsDB: (state, action) => {
            console.log('setComments state', state);
            console.log('setComments action', action);
            return { ...state, ...action.payload };
        },
        newComment: (state, action) => {
            return { ...state, comments: [action.payload, ...state.comments] }
        },
        editComment: (state, action) => {
            const comments = state.comments.map(comment => {
                if (comment.id === action.payload.id) {
                    comment = action.payload;
                }
                return comment;
            });
            return { ...state, comments: [...comments] };
        },
        deleteComment: (state, action) => {
            const comments = state.comments.filter(comment =>
                comment.id !== action.payload.id);
            return { ...state, comments: [...comments] };
        }
    }
});

export const commentsAsync = createAsyncThunk(
    'comments/fetchCommentData',
    async (state, action) => {
      console.log('action', action)
      console.log('state', action.getState())
      
      const commentData = await GetComments();
    return commentData
    }
  );
export const { setCommentsDB, newComment, editComment, deleteComment } = comments.actions;

export default comments.reducer;
