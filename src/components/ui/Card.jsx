import React from 'react';

const Card = ({ children, className = '', style = {} }) => {
  return (
    <div
      className={className}
      style={{
        padding: '1rem',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        background: 'white',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Card;
