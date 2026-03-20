import React from 'react';

const EmptyState = ({ children, ...props }) => {
  return <div className="ui-emptystate" {...props}>{children}</div>;
};

export default EmptyState;
