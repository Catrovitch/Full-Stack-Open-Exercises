import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommentToBlog } from '../reducers/blogReducer';

const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    dispatch(addCommentToBlog({ blogId, comment }));

    setComment('');
  };

  return (
    <form onSubmit={handleSubmitComment}>
      <div>
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={handleCommentChange}
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default CommentForm;
