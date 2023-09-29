import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { blogLike } from '../reducers/blogReducer'
import blogService from "../services/blogs"


const BlogPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [blogInfo, setBlogInfo] = useState({
        title: '',
        url: '',
        likes: 0,
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

    return (
        <div>
            <h2>{blogInfo.title}</h2>
            <p>{blogInfo.url}</p>
            <p>{blogInfo.likes} likes
            <button id='likeButton' onClick={likeBlog}>like</button></p>
            <p>added by {blogInfo.user.username}</p>
        </div>
    )
}

export default BlogPage