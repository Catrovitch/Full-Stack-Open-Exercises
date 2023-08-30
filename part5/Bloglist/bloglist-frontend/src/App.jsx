import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import usersService from './services/users'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogUpdate, setBlogUpdate] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        const sortedBlogs = initialBlogs.sort((a, b) => b.likes - a.likes); // Sort in descending order
        setBlogs(sortedBlogs);
      });
  }, [blogUpdate]);
  

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
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setNotification(`${username} logged in`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  
  const loggedInUser = (user) => (
    <div>
      <p>{user.name} logged in</p>
      <button type="submit" onClick={handleLogout}>logout</button>
    </div>
  )
  const handleLogout = async (event) => {
    event.preventDefault();
  
    try {
      window.localStorage.removeItem('loggedBlogappUser');      blogService.setToken(user.token)
      setUser('')
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('An error occured when loggin out');
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  };
  
  const blogFormRef = useRef()
 
  const addBlog = (blogObject) => {  
    if (!blogObject.title || !blogObject.author || !blogObject.url) {
      setErrorMessage('Please fill in all fields.');
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return;
    } 
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));
        setBlogUpdate(!blogUpdate)
        setNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`);
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage('An error occurred while adding the blog.');
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        console.error('Error adding blog:', error);
      });
    

  };

  const likeBlog = (blog_id, blogObject) => {
    blogService.update(blog_id, blogObject)
    setBlogUpdate(!blogUpdate)
  }
  const deleteBlog = async (blog_id) => {
    try {
      const returnValue = await blogService.deleteBlog(blog_id);
      console.log(returnValue);
      setBlogUpdate(!blogUpdate)
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };
  
  const blogForm = () => (
    <Togglable buttonLabel="new Blog" ref={blogFormRef}>
      <BlogForm 
        createBlog={addBlog}
        user={user}
      />
    </Togglable>
  )
  
  return (
    <div>
      <h1>Bloglist</h1>

      <Notification message={errorMessage} error={true} />
      <Notification message={notification} />

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
        <ul>
          {blogs.map(blog => (
            <Blog 
              key={blog.id}
              blog={blog}
              like={likeBlog}
              deleteBlog={deleteBlog}
           />
          ))}
        </ul>
        <Footer></Footer>
      </div>
    </div>
  )
}

export default App