import React from 'react'
import DeleteButton from './DeleteButton'

const Person = ({ person, setPersons, handleDelete, persons }) => {
  return (
    <li>
      {person.name} {person.number}{' '}
      <DeleteButton
        persons={persons}
        person={person}
        text={'Delete'}
        setPersons={setPersons}
        handleDelete={handleDelete}
      />
    </li>
  )
}

export default Person
