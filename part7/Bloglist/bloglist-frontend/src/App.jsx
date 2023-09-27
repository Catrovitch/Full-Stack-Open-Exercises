import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { initializeBlogs, updateBlogs } from './reducers/blogReducer'
import { setLogin, setLogout } from './reducers/userReducer'


const App = () => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      blogService.setToken(user.token)
    }
  }, [])

  const blogIsUpdated = useSelector(state => state.blogUpdate)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [blogIsUpdated])

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(setLogin({ username, password }));
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUsername('')
    setPassword('')
    dispatch(setLogout())

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

  const blogFormRef = useRef()


  const blogForm = () => (
    <Togglable id="newBlogButton" buttonLabel="new Blog" ref={blogFormRef}>
      <BlogForm />
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
      <BlogList></BlogList>
      <div>
        <Footer></Footer>
      </div>
    </div>
  )
}

export default App
