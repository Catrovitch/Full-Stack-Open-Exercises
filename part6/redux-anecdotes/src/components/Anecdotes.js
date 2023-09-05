import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'


const Anecdote = ({anecdote, handleClick}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return(
    <p onClick={handleClick}>
      <p>{anecdote.content}</p>
      <p>{anecdote.votes}
      <button onClick={(handleClick)}>vote</button>
      </p>
    </p>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return(
    <p>
      {anecdotes.map(anecdote =>
        <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() =>
          dispatch(vote(anecdote.id))}
        />
      )}
    </p>
  )
}

export default Anecdotes