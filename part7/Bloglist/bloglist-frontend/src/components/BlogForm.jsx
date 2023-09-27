import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotificationMessage } from '../reducers/notificationReducer'

const BlogForm = () => {

  const dispatch = useDispatch()

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    if ( !newBlogTitle || !newBlogAuthor || !newBlogUrl ) {
      dispatch(setNotificationMessage({ message: 'Please fill in all fields', timeout: 5, isError: true }))
      return
    } else {
      const content = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl,
    }
    dispatch(createBlog(content))
    dispatch(setNotificationMessage({ message: `A new blog ${newBlogTitle} by ${newBlogAuthor} added`, timeout: 5, isError: false }))
    
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
    }
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="titleInput">Title:</label>
          <input
            type="text"
            id="Title"
            value={newBlogTitle}
            onChange={(event) => setNewBlogTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="authorInput">Author:</label>
          <input
            type="text"
            id="Author"
            value={newBlogAuthor}
            onChange={(event) => setNewBlogAuthor(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="urlInput">URL:</label>
          <input
            type="text"
            id="URL"
            value={newBlogUrl}
            onChange={(event) => setNewBlogUrl(event.target.value)}
          />
        </div>
        <button type="submit" id="createButton">
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
