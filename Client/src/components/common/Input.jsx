import React from 'react';

const Input = ({ label, type = 'text', ...rest }) => {
  return (
    <div className="form-field">
      {label && <label>{label}</label>}
      <input type={type} {...rest} />
    </div>
  );
};

export default Input;
