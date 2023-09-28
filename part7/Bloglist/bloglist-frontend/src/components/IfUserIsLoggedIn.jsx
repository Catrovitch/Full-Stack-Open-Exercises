import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import LoginForm from './LoginForm'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setLogin, setLogout } from '../reducers/userReducer'


const IfUserIsLoggedIn = () => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      blogService.setToken(user.token)
    }
  }, [])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)


  const dispatch = useDispatch()

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
      {!user ? (
        loginForm()
      ) : (
        <div>
          {loggedInUser(user)}
          {blogForm()}
        </div>
      )}
    </div>
  )
}

export default IfUserIsLoggedIn
