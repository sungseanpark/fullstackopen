/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ( {person} ) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

const Persons = ( {persons} ) => {
  return (
    <div>
      {persons.map(person => 
      <Person key={person.id} person={person} />
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
  /*
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567',
      id: 1
    }
  ]) */
  const [persons, setPersons]  = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])
  
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    let duplicate = false

    persons.forEach((person) => {
      if(person.name === newName)
        {
          duplicate = true
        }
      }
    )

    if(duplicate){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      console.log(personObject)
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
      <Persons persons = {persons} />
    </div>
  )
}

export default App