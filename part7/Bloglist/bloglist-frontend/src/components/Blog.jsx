import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { blogLike, blogDelete } from '../reducers/blogReducer';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user) || false;

  const likeBlog = (event) => {
    event.preventDefault();
    dispatch(blogLike(blog.id));
  };

  const deleteThisBlog = (event) => {
    event.preventDefault();
    dispatch(blogDelete(blog.id));
  };

  return (
    <div className="blog">
      <Link to={`/blogs/${blog.id}`}>
        <h3>{blog.title}</h3>
      </Link>
    </div>
  );
};

export default Blog;
