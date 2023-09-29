import axios from 'axios'
const baseUrl = '/api/users'

const getUsernameById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then((response) => response.data.username)
}

const getUserAndBlogsByUserId = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

const getUsersWithNumberOfBlogs = async () => {
  const request = await axios.get(baseUrl)
  const data = request.data
  return data
  return result
}

export default { getUsernameById, getUserAndBlogsByUserId, getUsersWithNumberOfBlogs }
