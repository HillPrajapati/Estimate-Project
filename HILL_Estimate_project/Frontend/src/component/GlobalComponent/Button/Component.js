import React from 'react';
import { buttonDefaultStyle } from './Style';  // Import the style

const Button = ({ type, onClick, children, style }) => {
  // Combine default style with any passed styles
  const buttonStyle = { ...buttonDefaultStyle, ...style };

  // Default to an empty function if onClick is not provided
  const handleClick = onClick || (() => {});

  return (
    <button type={type} onClick={handleClick} style={buttonStyle}>
      {children}
    </button>
  );
};

export default Button;
