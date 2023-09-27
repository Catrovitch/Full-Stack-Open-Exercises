import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [blogUpdate, setBlogUpdate] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      const sortedBlogs = initialBlogs.sort((a, b) => b.likes - a.likes) 
      setBlogs(sortedBlogs)
    })
  }, [blogUpdate])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setNotification(`${username} logged in`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    )
  }

  const loggedInUser = (user) => (
    <div>
      <p>{user.name} logged in</p>
      <button id="LogoutButton" type="submit" onClick={handleLogout}>
        logout
      </button>
    </div>
  )
  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(user.token)
      setUser('')
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('An error occured when loggin out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setBlogUpdate(!blogUpdate)
      })
      .catch((error) => {
        setErrorMessage('An error occurred while adding the blog.')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        console.error('Error adding blog:', error)
      })
  }

  const likeBlog = (blog_id, blogObject) => {
    blogService.update(blog_id, blogObject)
    setBlogUpdate(!blogUpdate)
  }
  const deleteBlog = async (blog_id) => {
    try {
      const returnValue = await blogService.deleteBlog(blog_id)
      console.log(returnValue)
      setBlogUpdate(!blogUpdate)
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }

  const blogForm = () => (
    <Togglable id="newBlogButton" buttonLabel="new Blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} user={user} />
    </Togglable>
  )

  return (
    <div>
      <h1>Bloglist</h1>

      <Notification/>

      {!user ? (
        loginForm()
      ) : (
        <div>
          {loggedInUser(user)}
          {blogForm()}
        </div>
      )}
      <div>
        <h2>blogs</h2>
        <ul id="BlogList">
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              like={likeBlog}
              deleteBlog={deleteBlog}
              user={user}
            />
          ))}
        </ul>
        <Footer></Footer>
      </div>
    </div>
  )
}

export default App
