import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import { NotificationContextProvider, useNotificationDispatch } from './NotificationContext'
import { useReducer } from 'react'



const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })
  const handleVote = (anecdote) => {
    const content = anecdote.content
    dispatch({ type: 'VOTE', payload: content })
    setTimeout(() => {
      dispatch({ type: 'RESET'});
    }, 5000);
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
  }
  const addAnecdote = (content) => {
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }


  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      refetchOnWindowFocus: false
    }
  )

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server...</div>
  }

  const anecdotes = result.data
  
  return (
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm addAnecdote={addAnecdote} />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
  )
}

export default App
