import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'
import updateBlog from "./blogUpdateReducer"
import { setBlogUpdate } from "./blogUpdateReducer"

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        updateBlogLikes: (state, action) => {
            const updatedBlog = action.payload;
            const indexToUpdate = state.findIndex((blog) => blog.id === updatedBlog.id)
            
            if (indexToUpdate !== -1) {
                state[indexToUpdate] = {
                    ...state[indexToUpdate],
                    likes: updatedBlog.likes
                };
            }
        },
        deleteBlogById: (state, action) => {
            const idToDelete = action.payload;

            const newState = state.filter(blog => blog.id !== idToDelete);
            return newState
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        commentOnBlog: (state, action) => {
            const { blogId, comment } = action.payload;
      
            // Find the blog by ID
            const blogToUpdate = state.find((blog) => blog.id === blogId);
      
            if (blogToUpdate) {
              // Add the comment to the blog's comments array
              blogToUpdate.comments.push(comment);
            }
          },
    }
})

export const { appendBlog, setBlogs, updateBlogLikes, deleteBlogById, commentOnBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const updateBlogs = () => {
    return (dispatch) => {
        dispatch(setBlogUpdate())
    }
}

export const createBlog = content => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch(appendBlog(newBlog))
        dispatch(setBlogUpdate())
    }
}

export const blogLike = (id) => {
    return async (dispatch) => {
        const response = await blogService.getAll()
        const blogToUpdate = response.find(blog => blog.id === id);
        blogToUpdate.likes += 1
        
        const updatedBlog = await blogService.update(id, blogToUpdate)
        dispatch(updateBlogLikes(updatedBlog))
        dispatch(setBlogUpdate())
    }
}

export const blogDelete = (id) => {
    return async (dispatch) => {
        const response = await blogService.deleteBlog(id)
        dispatch(deleteBlogById(id))
        dispatch(setBlogUpdate())
    }
}

export const addCommentToBlog = ({ blogId, comment }) => {
    return async (dispatch) => {
      // Assuming blogService.addBlogComment returns the updated list of comments
      const updatedComments = await blogService.addBlogComment(blogId, comment);
  
      // Dispatch the commentOnBlog action with the updated comments
      dispatch(commentOnBlog({ blogId, comments: updatedComments }));
    };
  };
export default blogSlice.reducer