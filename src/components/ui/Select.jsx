import React from 'react';

const Select = ({
  options = [],
  value,
  onChange
}) => {
  return (
    <select
    value={value}
    onChange={onChange}
    style={{
        fontSize: "1.25rem",      
        padding: "1rem",          
        border: "2px solid #ccc", 
        borderRadius: "4px",
        width: "100%",
      }}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
