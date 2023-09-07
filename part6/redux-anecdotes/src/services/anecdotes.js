/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getAnecdoteById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {

    console.error("Error fetching anecdote by ID:", error);
    return null;
  }
};

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateAnecdote = async (id) => {

  const response = await axios.get(`${baseUrl}/${id}`)
  const anecdoteToUpdate = response.data

  anecdoteToUpdate.votes += 1

  const updatedResponse = await axios.put(`${baseUrl}/${id}`, anecdoteToUpdate)
  
  return updatedResponse.data
}

export default { getAll, getAnecdoteById, createNew, updateAnecdote }