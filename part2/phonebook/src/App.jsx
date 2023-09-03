import { useState } from 'react'

const Person = ( {person} ) => {
  return (
    <div>{person.name} {person.phone}</div>
  )
}

const Persons = ( {persons} ) => {
  return (
    <div>
      {persons.map(person => 
      <Person key={person.name} person={person} />
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      phone: '040-1234567'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      phone: newPhone
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
    }

  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add a new</h3>
      <PersonForm onSubmitFunc = {addPerson} valueName = {newName} onChangeName = {handleNameChange} valueNumber = {newPhone} onChangeNumber = {handlePhoneChange} />
      <h2>Numbers</h2>
      <Persons persons = {persons} />
    </div>
  )
}

export default App