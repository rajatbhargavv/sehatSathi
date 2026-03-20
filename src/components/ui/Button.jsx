import React from 'react';

const Button = ({ children, ...props }) => {
  return <div className="ui-button" {...props}>{children}</div>;
};

export default Button;
