import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

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
      console.log(exception)
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

  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }


  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }


  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }
  
  const blogForm = () => (
    <div>
    <h2>Create new</h2>
    <form onSubmit={addBlog}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={newBlogTitle}
          onChange={handleBlogTitleChange}
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          value={newBlogAuthor}
          onChange={handleBlogAuthorChange}
        />
      </div>
      <div>
        <label>URL:</label>
        <input
          type="text"
          value={newBlogUrl}
          onChange={handleBlogUrlChange}
        />
      </div>
      <button type="submit">Create</button>
    </form>
    </div>
  );

  const addBlog = (event) => {
    event.preventDefault();
  
    if (!newBlogTitle || !newBlogAuthor || !newBlogUrl) {
      setErrorMessage('Please fill in all fields.');
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return;
    }
  
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    };
  
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));
        setNewBlogTitle('');
        setNewBlogAuthor('');
        setNewBlogUrl('');
      })
      .catch(error => {
        setErrorMessage('An error occurred while adding the blog.');
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        console.error('Error adding blog:', error);
      });
  
    setNotification(`A new blog ${newBlogTitle} by ${newBlogAuthor} added`);
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  };
  
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
            <Blog key={blog.id} blog={blog} />
          ))}
        </ul>
        <Footer></Footer>
      </div>
    </div>
  )
}

export default App