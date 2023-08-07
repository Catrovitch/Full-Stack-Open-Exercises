import { useState } from 'react'
import Numbers from './components/Numbers'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [matchingNames, setMatchingNames] = useState(persons)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setMatchingNames(searchPersons(persons, event.target.value))
    setSearchName(event.target.value)
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
      const updatedPersons = persons.concat(nameObject)
      setPersons(updatedPersons);
      console.log(updatedPersons)
      const updatedMatchingNames = searchPersons(updatedPersons, searchName)
      setMatchingNames(updatedMatchingNames)
      setNewName('');
      setNewNumber('');
    }
  };
  
  const searchPersons = (updatedPersons, searchName) => {
    console.log('List: ', updatedPersons)
    console.log('Search name: ', searchName)
    const filteredList = updatedPersons.filter((updatedPerson) =>
      updatedPerson.name.toLowerCase().includes(searchName.toLowerCase())
    );
    return filteredList;
  };
  

  const checkNames = (name) => {
    return persons.some(person => person.name === name);
  };

  const noSubmit = () => {}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={noSubmit}>
        <div>
          search: <input
          value={searchName}
          onChange={handleSearchChange}/>
        </div>
      </form>

      <h2>add a new</h2>
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
      <Numbers persons={matchingNames}></Numbers>
    </div>
  )
}

export default App
