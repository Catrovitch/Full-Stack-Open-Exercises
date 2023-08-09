import { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import AddNewPeopleForm from './components/AddNewPeopleForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [matchingNames, setMatchingNames] = useState(persons)
  const [notification, setNotification] = useState(null)
  const [notificationError, setNotificationError] = useState(false)
  
  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setMatchingNames(initialPersons)
      })
  }
  useEffect(hook, [])

  const deletePerson = id => {
    const personWithId = getPersonWithId(id)
    if (window.confirm(`Delete ${personWithId.name} ?`)) {
      personService
        .deletePerson(id)
      const updatedPersons = persons.filter(person => person.id !== id)
      setPersons(updatedPersons)
      const updatedMatchingNames = searchPersons(updatedPersons, searchName)
      setMatchingNames(updatedMatchingNames) 
    }
  }

  const replaceNumberForExistingPerson = (id, newNumber) => {
    const personWithId = getPersonWithId(id)
    const alteredPerson = {...personWithId, number: newNumber}

    personService
      .update(id, alteredPerson).then(returnedPerson => {
        const updatedPersons = persons.map(person => person.id !== id ? person : returnedPerson)
        setPersons(updatedPersons)
        const updatedMatchingNames = searchPersons(updatedPersons, searchName)
        setMatchingNames(updatedMatchingNames)
        })
      .catch(error => {
        setNotificationError(true)
        console.log('error', notificationError)
        setNotification(`Information of ${personWithId.name} has already been removed from the server`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
        
      })
  }
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
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
        const personId = getPersonWithName(newName).id
        replaceNumberForExistingPerson(personId, newNumber)
      }
    } else if (newName === '') {
      alert('Name field cannot be empty');
    } else {
    const nameObject = {
      name: newName,
      number: newNumber
    };
      personService
        .create(nameObject)
        .then(returnedPerson => {
          const updatedPersons = persons.concat(returnedPerson)
          setPersons(updatedPersons)
          const updatedMatchingNames = searchPersons(updatedPersons, searchName)
          setMatchingNames(updatedMatchingNames)
        })
      setNotificationError(false)
      setNotification(`Added ${newName}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  };

  const searchPersons = (updatedPersons, searchName) => {
    const filteredList = updatedPersons.filter((updatedPerson) =>
      updatedPerson.name.toLowerCase().includes(searchName.toLowerCase())
    );
    return filteredList;
  };

  
  const getPersonWithId = (id) => {
    return persons.find(person => person.id === id)
  }

  const getPersonWithName = (name) => {
    return persons.find(person => person.name === name)
  }

  const checkNames = (name) => {
    return persons.some(person => person.name === name);
  };

  const noSubmit = () => {}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} notificationError={notificationError}/>
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
      <ul>
        {matchingNames.map(person => 
          <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)} />
        )}
      </ul>
    </div>
  )
}

export default App
