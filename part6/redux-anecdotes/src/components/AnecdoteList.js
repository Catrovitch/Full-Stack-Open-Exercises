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
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return(
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes) // Sort anecdotes in descending order of votes
        .map(anecdote => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => dispatch(vote(anecdote.id))}
          />
        ))
      }
    </div>
  )
}

export default AnecdoteList