import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import phoneService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')
	const [newToDisplay, setToDisplay] = useState(persons)
	const [message, setMessage] = useState(null)
	const [messageType, setMessageType] = useState('success')

	useEffect(() => {
		phoneService
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
			})
			.catch(error => {
				setMessageType('error')
				setMessage(`Unable to get names from the server`)
				setTimeout(() => {
					setMessage(null)
				}, 2000)
			})
	}, [])

	let personsToShow = persons

	const handleDelete = deletePerson => {
		const confirmation = window.confirm(`Delete ${deletePerson.name}?`)
		if (confirmation) {
			phoneService
				.remove(deletePerson.id)
				.then(
					setPersons(persons.filter(person => person.id !== deletePerson.id))
				)
				.then(setMessageType('success'))
				.then(setMessage(`${deletePerson.name} deleted`))
				.then(
					setTimeout(() => {
						setMessage(null)
					}, 2000)
				)
				.catch(error => {
					setMessageType('error')
					setMessage(`${deletePerson.name} wasn't deleted`)
					setTimeout(() => {
						setMessage(null)
					}, 2000)
				})
		}
	}

	personsToShow =
		newFilter === ''
			? (personsToShow = persons)
			: (personsToShow = persons.filter(person =>
					person.name.toLowerCase().includes(newFilter.toLowerCase())
			  ))

	return (
		<div>
			<h2>Phonebook</h2>
			<h3>
				<Notification message={message} messageType={messageType} />
			</h3>
			<form>
				<div>
					<Filter
						newFilter={newFilter}
						setNewFilter={setNewFilter}
						newToDisplay={newToDisplay}
						setToDisplay={setToDisplay}
					/>
				</div>
			</form>
			<h2>To Add</h2>
			<PersonForm
				newName={newName}
				setNewName={setNewName}
				newNumber={newNumber}
				setNewNumber={setNewNumber}
				persons={persons}
				setPersons={setPersons}
				setMessage={setMessage}
				setMessageType={setMessageType}
				message={message}
			/>
			<h2>Numbers</h2>
			<Persons
				personsToShow={personsToShow}
				setPerson={setPersons}
				handleDelete={handleDelete}
				persons={persons}
			/>
		</div>
	)
}

export default App
