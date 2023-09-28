import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Notification from './components/Notification'
import Footer from './components/Footer'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import IfUserIsLoggedIn from './components/IfUserIsLoggedIn'

import {
  BrowserRouter as Router,
  Routes, Route, Link
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


  return (
    <div>
      <h1>Bloglist</h1>
      <Notification/>
      <IfUserIsLoggedIn></IfUserIsLoggedIn>
      <BlogList></BlogList>
      <Footer></Footer>
    </div>
  )
}

export default App
