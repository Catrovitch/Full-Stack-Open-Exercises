import React, { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
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
        <button type="submit" id='createButton'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm
