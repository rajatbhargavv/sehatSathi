import React from 'react';

const Card = ({ children }) => {
  return <div 
  style={{
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "6px",
        marginBottom: "1rem",
      }}
  >
  {children}
  </div>;
};

export default Card;
