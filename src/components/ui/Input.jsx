import React from 'react';

const Input = ({ children, ...props }) => {
  return <div className="ui-input" {...props}>{children}</div>;
};

export default Input;
