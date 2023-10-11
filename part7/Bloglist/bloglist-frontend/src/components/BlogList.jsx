import { useSelector } from 'react-redux';
import Blog from './Blog'
import {
  Typography,
  List,
  ListItem,
  Paper
} from '@mui/material'


const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    const containerStyle = {
      padding: '16px',
      background: 'white',
      borderRadius: '10px',
      width: '80%',
      margin: '0 auto',
      border: '5px solid #ccc'
  }

    return (
      <Paper style={containerStyle}>
      <Typography variant="h6" gutterBottom>
        Blogs
      </Typography>
      <List>
        {blogs.map((blog) => (
          <ListItem key={blog.id} style={{ marginBottom: '8px' }}>
            <Blog blog={blog} user={user} />
          </ListItem>
        ))}
      </List>
    </Paper>
    )
}

export default BlogList