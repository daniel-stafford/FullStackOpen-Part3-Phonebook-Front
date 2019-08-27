import React from 'react';

const DeleteButton = ({ text, person, handleDelete, persons }) => {
  return (
    <>
      <button onClick={() => handleDelete(person)}>{text}</button>
    </>
  );
};

export default DeleteButton;
