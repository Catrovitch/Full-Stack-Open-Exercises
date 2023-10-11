import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { blogLike } from '../reducers/blogReducer'
import blogService from "../services/blogs"
import blogReducer from "../reducers/blogReducer";
import CommentForm from "./CommentForm";
import { 
    Container,
    Typography,
    Button } from '@mui/material'

const BlogPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [blogInfo, setBlogInfo] = useState({
        title: '',
        url: '',
        likes: 0,
        comments: [],
        user: {
          username: ''
        }
      })

    const blogs = useSelector(state => state.blogs) || false

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogData = await blogService.getBlogById(id)

                if (blogData) {
                    setBlogInfo(blogData)
                } else {
                    console.log('Blog data not found')
                }
            } catch (error) {
                console.error('Error fetching blog data: ', error)
            }
        }

        fetchData()
    }, [blogs])

    const likeBlog = (event) => {
        event.preventDefault()
        dispatch(blogLike(id))
      }

    const containerStyle = {
        padding: '16px',
        background: 'white',
        borderRadius: '10px',
        width: '80%',
        margin: '0 auto',
        border: '5px solid #ccc'
    }

    return (
        <Container style={containerStyle}>
        <div>
          <Typography variant="h4">{blogInfo.title}</Typography>
          <Typography>{blogInfo.url}</Typography>
          <Typography>
            {blogInfo.likes} likes{' '}
            <Button
              id="likeButton"
              onClick={likeBlog}
              variant="contained"
              color="primary"
              size="small"
            >
              Like
            </Button>
          </Typography>
          <Typography>
            Added by {blogInfo.user.username}
          </Typography>
          <Typography variant="h5">Comments</Typography>
          <CommentForm blogId={id} />
          <ul>
            {blogInfo.comments.map((comment, index) => (
              <li key={index}>
                <Typography>{comment}</Typography>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    )
}

export default BlogPage