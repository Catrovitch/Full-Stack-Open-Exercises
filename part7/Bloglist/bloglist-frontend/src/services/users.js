import axios from 'axios'
const baseUrl = '/api/users'

const getUsernameById = (id) => {
  console.log('id at getUsernameById: ', id)
  const request = axios.get(`${ baseUrl }/${id}`)
  return request.then(response => response.data.username)

}

export default { getUsernameById }