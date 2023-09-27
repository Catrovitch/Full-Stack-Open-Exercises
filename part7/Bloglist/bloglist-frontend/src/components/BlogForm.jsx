import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setNotificationMessage } from '../reducers/notificationReducer'

const BlogForm = ({ createBlog, user }) => {

  const dispatch = useDispatch()

  const [newBlogTitle, setNewBlogTitle] = useState(null)
  const [newBlogAuthor, setNewBlogAuthor] = useState(null)
  const [newBlogUrl, setNewBlogUrl] = useState(null)

  const addBlog = (event) => {
    event.preventDefault()
    if ( !newBlogTitle || !newBlogAuthor || !newBlogUrl ) {
      dispatch(setNotificationMessage({ message: 'Please fill in all fields', timeout: 5, isError: true }))
      return
    } else {
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })
    
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
