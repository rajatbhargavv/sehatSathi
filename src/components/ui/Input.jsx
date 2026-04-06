import React from 'react';

const Input = ({
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  type = 'text',
  readOnly = false,
  ...rest
}) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      style={{
        fontSize: "1.25rem",      
        padding: "1rem",          
        border: "2px solid #ccc", 
        borderRadius: "4px",
        width: "100%",
        boxSizing: "border-box",
        opacity: disabled ? 0.6 : 1,
      }}
      {...rest}
    />
  );
};

export default Input;
