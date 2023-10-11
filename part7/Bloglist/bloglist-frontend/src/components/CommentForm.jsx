import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommentToBlog } from '../reducers/blogReducer';
import { 
  TextField,
  Button } from '@mui/material'

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
        <TextField
          variant="outlined"
          label="Add a comment..."
          fullWidth
          value={comment}
          onChange={handleCommentChange}
        />
      </div>
      <div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
