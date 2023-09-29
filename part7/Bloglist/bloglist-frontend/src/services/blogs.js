import axios from 'axios'
import { useSelector } from 'react-redux';

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getBlogById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const addBlogComment = async (id, commentText) => {
  try {
    const response = await axios.post(`${baseUrl}/${id}/comments`, { comment: commentText });
    return response.data;

  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, {
      headers: { Authorization: token },
    })
    return response.data
  } catch (error) {
    console.error('Error deleting blog:', error)
    throw error
  }
}

export default { getAll, getBlogById, addBlogComment, create, update, setToken, deleteBlog }
