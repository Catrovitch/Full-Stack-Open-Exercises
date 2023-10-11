import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setLogin, setLogout } from '../reducers/userReducer'
import { 
  Button,
  Typography,
  Container
 } from '@mui/material'

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
      <Typography variant="h6" style={{ textDecoration: 'none' }}>
        {user.name} is logged in
      </Typography>
      <Button id="LogoutButton" type="submit" onClick={handleLogout} variant="contained" color="inherit">
        logout
      </Button>
    </div>
  )

  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable id="newBlogButton" buttonLabel="new Blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  const containerStyle = {
    padding: '25px'
  };

  return (
    <Container style={containerStyle}>
      {!user ? (
        loginForm()
      ) : (
        <div>
          {loggedInUser(user)}
          {user && blogForm()} 
        </div>
      )}
    </Container>
  )
}

export default IfUserIsLoggedIn
