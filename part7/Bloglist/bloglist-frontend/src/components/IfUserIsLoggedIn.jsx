import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import LoginForm from './LoginForm'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setLogin, setLogout } from '../reducers/userReducer'
import { Button } from '@mui/material'

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
      <Button id="LogoutButton" type="submit" onClick={handleLogout} variant="contained" color="primary">
        logout
      </Button>
    </div>
  )



  return (
    <div>
      {!user ? (
        loginForm()
      ) : (
        <div>
          {loggedInUser(user)}
        </div>
      )}
    </div>
  )
}

export default IfUserIsLoggedIn
