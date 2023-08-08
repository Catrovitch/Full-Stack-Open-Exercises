import { useState, useEffect } from 'react'
import axios from 'axios'
import Numbers from './components/Numbers'
import AddNewPeopleForm from './components/AddNewPeopleForm'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [matchingNames, setMatchingNames] = useState(persons)

  const hook = () => {
    axios
        .get('http://localhost:3001/persons')
        .then(response => {
          console.log('promise fulfilled')
          console.log('Data', response.data)
          setPersons(response.data)
          setMatchingNames(response.data)
        })
  }

  useEffect(hook, [])

  console.log('render', persons.length, 'persons')


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
      <AddNewPeopleForm onSubmit={addPerson} formList={[
        { text: 'name', formValue: newName, formOnChange: handleNameChange },
        { text: 'number', formValue: newNumber, formOnChange: handleNumberChange }
        ]} buttonText='add' />      
      <h2>Numbers</h2>
      <Numbers persons={matchingNames}></Numbers>
    </div>
  )
}

export default App
