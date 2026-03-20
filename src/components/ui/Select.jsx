import React from 'react';

const Select = ({ children, ...props }) => {
  return <div className="ui-select" {...props}>{children}</div>;
};

export default Select;
