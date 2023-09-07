import { createSlice } from "@reduxjs/toolkit";


const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      const anecdote = asObject(action.payload)
      state.push(anecdote)
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
export default anecdoteSlice.reducer;