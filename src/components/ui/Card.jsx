import React from 'react';

const Card = ({ children, ...props }) => {
  return <div className="ui-card" {...props}>{children}</div>;
};

export default Card;
