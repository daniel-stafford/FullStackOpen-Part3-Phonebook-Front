import React from 'react';
import Person from './Person';

const Persons = ({ personsToShow, handleDelete }) => {
  const rows = () =>
    personsToShow.map(person => (
      <Person person={person} key={person.name} handleDelete={handleDelete} />
    ));

  return (
    <div>
      <ul>{rows()}</ul>
    </div>
  );
};

export default Persons;
