import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material'

const Blog = ({ blog }) => {

  return (
    <div className="blog">
      <Link to={`/blogs/${blog.id}`}>
        <Typography variant="h6" style={{ textDecoration: 'none' }}>
          {blog.title}
        </Typography>
      </Link>
    </div>
  );
};

export default Blog;
