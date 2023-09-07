import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      state.push(action.payload)
    },
    vote: (state, action) => {
      const id = action.payload;
      const anecdoteToChange = state.find(n => n.id === id);
      anecdoteToChange.votes += 1;
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})
export const { createAnecdote, vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer;