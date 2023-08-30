import React, { useState } from 'react';


const Blog = ((props) => {
  const blog = props.blog
  const like =props.like
  const [visible, setVisible] = useState(false);
  const showExtra = visible ? 'Hide' : 'Show';
  const showAll = () => {
    setVisible(!visible);
  };

  const likeBlog = (event) => {
    event.preventDefault()
    const newBlogObject = {
      url: blog.url,
      title: blog.title,
      author: blog.author,
      user: blog.user.id,
      likes: blog.likes+1
    }
    like(
      blog.id,
      newBlogObject)
  }

  const blogStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px 0',
  };

  return (
    <div style={blogStyle}>
      <div>
        Title & Author: {blog.title} - {blog.author}
        <button onClick={showAll}>{showExtra}</button>
      </div>
      {visible && (
        <div>
          <p>Url: {blog.url}</p>
          <p>Likes: {blog.likes}
          <button onClick={likeBlog}> like</button></p>
          <p>Added by: {blog.user.username}</p>
        </div>
      )}
    </div>
  );
});

export default Blog;

