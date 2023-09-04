/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ( {person, deletePerson} ) => {
  return (
    <div>{person.name} {person.number} <button onClick = {deletePerson}>{'delete'}</button></div>
  )
}

const Persons = ( {persons, deletePerson} ) => {
  return (
    <div>
      {persons.map(person => 
      <Person key={person.id} person={person} deletePerson = {() => deletePerson(person.id)} />
    )}
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit = {props.onSubmitFunc}>
        <div>
          name: <input value = {props.valueName}
          onChange = {props.onChangeName}
          />
        </div>
        <div>
          number: <input value = {props.valueNumber}
          onChange = {props.onChangeNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )

}


const App = () => {

  const [persons, setPersons]  = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    let duplicate = false
    let duplicateId

    persons.forEach((person) => {
      if(person.name === newName)
        {
          duplicate = true
          duplicateId = person.id
        }
      }
    )

    if(duplicate){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
          .update(duplicateId, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== duplicateId ? person : returnedPerson))
          })
      }
    }
    else{
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })

    }

  }

  const deletePersonOf = id => {

    const person = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${person.name}?`)){
      personService
      .deleteFromServer(id)
      .then(response => {
        console.log(response)
        personService
          .getAll()
          .then(updatedPersons => {
            setPersons(updatedPersons)
          })
      })
      .catch(error => {
        console.log('there was an error while deleting')
      })
    }

  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add a new</h3>
      <PersonForm onSubmitFunc = {addPerson} valueName = {newName} onChangeName = {handleNameChange} valueNumber = {newNumber} onChangeNumber = {handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons = {persons} deletePerson = {deletePersonOf}  />
    </div>
  )
}

export default App