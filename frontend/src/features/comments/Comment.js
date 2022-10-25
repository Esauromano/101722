import "./Comment.css";
import { React, useState, useEffect } from "react";
import {
  setCommentsDB, newComment, editComment, deleteComment, commentsAsync,
  setCommentsDBError, editCommentError, newCommentError, deleteCommentError
} from '../../app/commentsSlice';
import { v4 as uuidv4 } from "uuid";
import styles from './Comment.css';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../app/store'

const getNewComment = (commentValue, isRootNode = false, parentNodeId) => {
  return {
    id: uuidv4(),
    commentText: commentValue,
    childCommments: [],
    isRootNode,
    parentNodeId,
  };
};

const initialState = {}
export const Comentarios = (props = {}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [dbcomments, setDbcomments] = useState({});
  const [comments, setComments] = useState({});
  const [rootComment, setRootComment] = useState("");


  
  useEffect(() => {
    const commentsCall = dispatch(commentsAsync());
    console.log('commentsCall', commentsCall);
    commentsCall.then((results)=>{
      console.log('results results results ', results)
      setComments(results.payload)
      setDbcomments(results.payload)
      store.dispatch({ type: 'comments/setCommentsDB', payload: results.payload })
      dispatch(setCommentsDB(results.payload))
    })
  }, []);

  const addComment = (parentId, newCommentText) => {
    let newComment = null;
    if (parentId) {
      newComment = getNewComment(newCommentText, false, parentId);
      setComments((comments) => ({
        ...comments,
        [parentId]: {
          ...comments[parentId],
          childCommments: [...comments[parentId].childCommments, newComment.id],
        },
      }));
    } else {
      newComment = getNewComment(newCommentText, true, null);
    }
    setComments((comments) => ({ ...comments, [newComment.id]: newComment }));
  };
  const commentMapper = (comment) => {
    return {
      ...comment,
      childCommments: comment.childCommments
        .map((id) => comments[id])
        .map((comment) => commentMapper(comment)),
    };
  };
  let enhancedComments = Object.values(comments).filter((comment) => {
      return !comment.parentNodeId;
    }).map(commentMapper);
    
  const onAdd = () => {
    addComment(null, rootComment);
    setRootComment("");
  };

  return (
    <div className="Comentarios">
      <header style={{marginBottom : '2rem', fontSize : '2rem'}}>Deja un comentario!</header>
     
      <button
          className={styles.asyncButton}
          onClick={
            () => commentsAsync(dispatch)
          }
        >
          Add Async
        </button>
      <div className="comments-container">
        <input
          type="text"
          value={rootComment}
          onChange={(e) => setRootComment(e.target.value)}
          placeholder="add comment"
          style={{ width: "80%", marginRight: "1rem" }}
        />{" "}
        <button onClick={onAdd}>Add</button>
      </div>
      <div
        style={{
          border: "1px solid blue",
          width: "60%",
          margin: "auto",
          overflowX: "auto",
          padding: "2rem",
        }}
      >
        {enhancedComments.map((comment, key) => {
          return (
            <Comment key={key} comment={comment} addComment={addComment} />
          );
        })}
      </div>
    </div>
  );
}

const Comment = ({ comment, addComment }) => {
  const { commentText, childCommments, id } = comment;
  const [childComment, setChildComment] = useState("");
  const [show, setShow] = useState(true);
  const [showAddComponet, setShowAddComponet] = useState(false);
  const onAdd = () => {
    addComment(id, childComment);
    setChildComment("");
    setShowAddComponet(false);
  };
  return (
    <div className="Comment">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ textAlign: "left" }}>{commentText}</div>
        &nbsp;
        {childCommments.length > 0 && (
          <button onClick={() => setShow((show) => !show)}>
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>
      <div>
        <div>
          {showAddComponet ? (
            <>
              <input
                type="text"
                value={childComment}
                onChange={(e) => setChildComment(e.target.value)}
                placeholder="add comment"
              />{" "}
              <button onClick={onAdd}>Submit</button>
            </>
          ) : (
            <a
              style={{ cursor: "pointer", fontSize: "0.7rem", color: "blue" }}
              onClick={() => setShowAddComponet(true)}
            >
              Add a reply
            </a>
          )}
        </div>
      </div>
      {show &&
        childCommments.map((childCommentEl, key) => {
          return (
            <Comment
              key={key}
              comment={childCommentEl}
              addComment={addComment}
            />
          );
        })}
    </div>
  );
};

