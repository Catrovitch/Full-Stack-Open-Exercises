import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'


const Anecdote = ({anecdote, handleClick}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return(
    <div onClick={handleClick}>
      <p>{anecdote.content}</p>
      <p>{anecdote.votes}
      <button onClick={(handleClick)}>vote</button>
      </p>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const anecdotes = useSelector(state => state.anecdotes);

  const filteredAnecdotes = filter === 'ALL'
    ? anecdotes
    : anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div>
      {filteredAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => dispatch(vote(anecdote.id))}
          />
        ))
      }
    </div>
  );
};


export default AnecdoteList