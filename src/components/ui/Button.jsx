import React from 'react';

const Button = ({ 
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  fullWidth = false
 }) => {
  return(
    <button 
    onClick={onClick}
    disabled={disabled}
    style={{
        fontSize: '1.25rem',
        padding: '1rem 2rem',
        border: 'none',
        backgroundColor: variant === 'primary' ? '#0053ba' : '#e0e0e0',
        color: variant === 'primary' ? '#ffffff' : '#333333',
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}>
        {children}
    </button>

  );
};

export default Button;
