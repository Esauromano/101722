import {
    setCommentsDB, newComment, editComment, deleteComment,
    setCommentsDBError, editCommentError, newCommentError, deleteCommentError
} from '../app/commentsSlice';
import axios from 'axios';

const axiosInstance = axios.create({    
    baseURL: `http://localhost:8081/api/comments`,
})


export const GetComments = async () => {
    console.log('GetComments GetComments GetComments');
    try {
        // api call
        const result = await axiosInstance.get();
        console.log('result', result);
        console.log('result.data', result.data);
        console.log('result.data.data', result.data.data);
        let coments = {}
        result.data.data.forEach(comment => {
            const childCommments = comment.childCommments.split(',').filter(element => element !== '');
            var isRootNode = (comment.isRootNode === 'true');
            let comentario = {...comment, childCommments, isRootNode}
            //console.log('comentario', comentario)
            coments[comment.id] = comentario
        });
        console.log('coments coments coments', coments);
        setCommentsDB(coments)
        return coments
    } catch {
        console.log('errrrrroooooorrrrrr');
        setCommentsDBError();
    }
}

export const NewComment = async (dispatch, comment) => {
    try {
        // api call
        const { data } = await axiosInstance.post('', comment);
        dispatch(newComment(data));
    } catch {
        dispatch(newCommentError());
    }
}

export const EditComment = async (dispatch, comment) => {
    try {
        // api call
        await axiosInstance.put('', comment);
        dispatch(editComment(comment));
    } catch {
        dispatch(editCommentError());
    }
}

export const DeleteComment = async (dispatch, comment) => {
    try {
        // api call
        await axiosInstance.delete('', { data: { ...comment } });
        dispatch(deleteComment(comment));
    } catch {
        dispatch(deleteCommentError());
    }
}