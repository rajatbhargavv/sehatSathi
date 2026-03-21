import React from 'react';

const Input = (
  value,
  onChange,
  placeholder,
  disabled = false,
  type = 'text'
) => {
  return (
    <input 
    type={type}
    value = {value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    style={{
        fontSize: "1.25rem",      
        padding: "1rem",          
        border: "2px solid #ccc", 
        borderRadius: "4px",
        width: "100%",
        boxSizing: "border-box",
        opacity: disabled ? 0.6 : 1,
      }}
    />
  );
};

export default Input;
