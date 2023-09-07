import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote: (state, action) => {
      const updatedAnecdote = action.payload;
      const indexToUpdate = state.findIndex((anecdote) => anecdote.id === updatedAnecdote.id);

      if (indexToUpdate !== -1) {
        state[indexToUpdate].votes = updatedAnecdote.votes;
      }
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const voteAnecdote = (id) => {
  return async (dispatch) => {

    const response = await anecdoteService.getAnecdoteById(id);
    const anecdoteToUpdate = response;

    anecdoteToUpdate.votes += 1;

    const updatedAnecdote = await anecdoteService.updateAnecdote(id, anecdoteToUpdate);

    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;