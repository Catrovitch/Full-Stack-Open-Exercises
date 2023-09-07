import { useDispatch, useSelector } from 'react-redux';
import { setNotificationMessage } from '../reducers/notificationReducer';
import { voteAnecdote } from '../reducers/anecdoteReducer';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div onClick={handleClick}>
      <p>{anecdote.content}</p>
      <p>
        {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </p>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const anecdotes = useSelector(state => state.anecdotes);
  const filteredAnecdotes = filter === 'ALL'
    ? anecdotes
    : anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
  
  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes);

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotificationMessage({ notification: `you voted '${anecdote.content}'`, timeout: 5 }));
  };
  
  return (
    <div>
      {sortedAnecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
