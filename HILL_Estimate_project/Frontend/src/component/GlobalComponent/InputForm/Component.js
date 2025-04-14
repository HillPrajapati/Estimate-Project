import React, { useState } from 'react';
import { inputDefaultStyle } from './Style';  // Import the style

const InputField = ({ 
  type, 
  placeholder, 
  name, 
  value, 
  onChange, 
  style, 
  required = true // Default to true
}) => {
  // State to store the error message
  const [error, setError] = useState("");

  // Combine default style with any passed styles
  const inputStyle = { ...inputDefaultStyle, ...style };

  // Handle validation for required fields on change
  const handleValidation = (e) => {
    if (required && e.target.value.trim() === "") {
      setError(`${placeholder} is required`); // Set error if empty and required
    } else {
      setError(""); // Clear error if there's input
    }
    onChange(e); // Call the onChange prop to update the state in parent
  };

  // Handle validation when the field is blurred (touched)
  const handleBlur = () => {
    if (required && value.trim() === "") {
      setError(`${placeholder} is required`); // Set error if empty and required
    }
  };

  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleValidation} // Use handleValidation for onChange
        onBlur={handleBlur} // Trigger validation onBlur (when field is touched and left empty)
        style={inputStyle}
        required={required} // Set the required attribute based on the prop
      />
      {/* Conditionally render error message if there's an error */}
      {error && <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>}
    </div>
  );
};

export default InputField;
