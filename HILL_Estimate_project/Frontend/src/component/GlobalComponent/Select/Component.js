import React from 'react';
import { selectDefaultStyle } from './Style';  // Import the style

const SelectField = ({ name, value, onChange, options, style }) => {
  // Combine default style with any passed styles
  const selectStyle = { ...selectDefaultStyle, ...style };

  return (
    <select name={name} value={value} onChange={onChange} style={selectStyle}>
      <option value="">Select Gender</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
