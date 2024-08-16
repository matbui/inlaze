import React from 'react';

const RadioButton = ({ label, value, name, checked, onChange }) => {
    return (
        <label className="radio-container">
            {label}
            <input 
                type="radio" 
                name={name} 
                value={value} 
                checked={checked} 
                onChange={onChange} 
            />
            <span className="checkmark"></span>
        </label>
    );
};

export default RadioButton;