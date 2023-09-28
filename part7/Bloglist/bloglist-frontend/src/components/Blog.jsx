import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { blogLike, blogDelete, updateBlogs } from '../reducers/blogReducer'


const Blog = (props) => {
  const blog = props.blog
  const dispatch = useDispatch()
  const user = useSelector(state => state.user) || false
  const [visible, setVisible] = useState(false)
  const showExtra = visible ? 'Hide' : 'Show'


  const showAll = () => {
    setVisible(!visible)
  }
  const likeBlog = (event) => {
    event.preventDefault()
    dispatch(blogLike(blog.id))
  }
  const deleteThisBlog = (event) => {
    event.preventDefault()
    dispatch(blogDelete(blog.id))
  }
  const blogStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px 0',
  }

  return (
    <div style={blogStyle}>
      <div>
        <p>
          Title & Author: {blog.title} - {blog.author}
        </p>
        <button id="showButton" onClick={showAll}>
          {showExtra}
        </button>
        {blog.user.id === user.id && (
          <button id="deleteButton" onClick={deleteThisBlog}>
            delete
          </button>
        )}
      </div>
      {visible && (
        <div>
          <p>Url: {blog.url}</p>
          <p id="likes">
            Likes: {blog.likes}
            <button id="likeButton" onClick={likeBlog}>
              {' '}
              like
            </button>
          </p>
          <p>Added by: {blog.user.username}</p>
        </div>
      )}
    </div>
  )
}

export default Blog
