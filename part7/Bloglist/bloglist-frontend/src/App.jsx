import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Notification from './components/Notification'
import Footer from './components/Footer'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import IfUserIsLoggedIn from './components/IfUserIsLoggedIn'
import UsersBlogs from './components/UsersBlogs'
import UserPage from './components/UserPage'
import BlogPage from './components/BlogPage'
import Menu from './components/Menu'
import { 
  Container,
  Typography } from '@mui/material'

import {
  BrowserRouter as Router,
  Routes, Route, useNavigate
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  const blogIsUpdated = useSelector(state => state.blogUpdate)
  const user = useSelector(state => state.user)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [blogIsUpdated])

  const containerStyle = {
    background: '#f0f0f0',
    padding: '16px', // Add padding for spacing
  };

  return (
    <Container style={containerStyle}>
      <Router>
        <Typography variant="h1">Blogs</Typography>
        <Menu />
        <Notification/>
        <IfUserIsLoggedIn></IfUserIsLoggedIn>
        <Routes>
          <Route path="/" element={<BlogList></BlogList>} />
          <Route path="/users" element={<UsersBlogs></UsersBlogs>} />
          <Route path="/users/:id" element={<UserPage></UserPage>} />
          <Route path="/blogs/:id" element={<BlogPage></BlogPage>} />
        </Routes>
        <Footer></Footer>
      </Router>
    </Container>
  )
}

export default App
