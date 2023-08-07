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
    if (checkNames(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const nameObject = {
        name: newName
      }
      setPersons(persons.concat(nameObject))
      setNewName('')

    }
  };


  const checkNames = (name) => {
    return persons.some(person => person.name === name);
  };

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
