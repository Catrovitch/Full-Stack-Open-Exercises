import { useRef } from 'react'
import { useSelector } from 'react-redux';
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    
    const blogFormRef = useRef()
    const blogForm = () => (
      <Togglable id="newBlogButton" buttonLabel="new Blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
    )
    return (
        <div>
            {user && blogForm()} 
            <ul id="BlogList">
            {blogs.map((blog) => (
                <Blog
                key={blog.id}
                blog={blog}
                user={user}
                />
            ))}
            </ul>
        </div>
    )
}

export default BlogList