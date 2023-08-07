import { useState } from 'react'
import Numbers from './components/Numbers'



const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: 456546}]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault();
    if (checkNames(newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else if (newName === '') {
      alert('Name field cannot be empty');
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(nameObject));
      setNewName('');
      setNewNumber('');
    }
  };
  

  const checkNames = (name) => {
    return persons.some(person => person.name === name);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
      
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}/>
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
