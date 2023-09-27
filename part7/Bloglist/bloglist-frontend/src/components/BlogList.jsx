import { useSelector } from 'react-redux';
import Blog from './Blog'

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    return (
        <div>
            <h2>blogs</h2>
            
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