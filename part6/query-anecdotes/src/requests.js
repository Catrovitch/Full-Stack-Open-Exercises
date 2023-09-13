import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)


export const createAnecdote = newAnecdote => {
  console.log('newAnecdote and length: ', newAnecdote, newAnecdote.length)
  if (newAnecdote.content.length <= 5) {
    return Promise.reject("Anecdote must be longer than 5 characters");
  }

  return axios.post(baseUrl, newAnecdote)
    .then(res => res.data)
    .catch(error => Promise.reject(error));
}
  

export const updateAnecdote = updatedAnecdote =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)