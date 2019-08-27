import React from 'react';
const Filter = props => {
  const handleFilterChange = e => {
    console.log(e.target.value);
    props.setNewFilter(e.target.value);
  };
  return (
    <div>
      Filter shown with:
      <input value={props.newFilter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
