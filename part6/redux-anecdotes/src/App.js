/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes()) 
  }, []) 


  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <VisibilityFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App