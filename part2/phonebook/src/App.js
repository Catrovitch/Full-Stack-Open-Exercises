import { useState } from 'react'
import Numbers from './components/Numbers'



const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }
    console.log('Name object:', nameObject)
    setPersons(persons.concat(nameObject))
    console.log('Person list:', persons)
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addName}>
      
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}/>
        </div>
      
        <div>
          <button type="submit">add</button>
        </div>
      
      </form>
      
      <h2>Numbers</h2>
      <Numbers persons={persons}></Numbers>
    </div>
  )
}

export default App
