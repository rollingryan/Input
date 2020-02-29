import React from 'react';

const Radio = ({
  label = '',
  name = '',
  isChecked = false,
  noMargin = false,
  onChange = null,
  testSelector,
  required,
  ...inputAttributes
}) => {
  return (
    <div
      className={`form-input ${(noMargin && 'form-input--no-margin') || ''}`}>
      <input
        data-test={testSelector}
        className="form-input--radio"
        type="radio"
        name={name && name}
        onChange={onChange}
        checked={isChecked}
        {...inputAttributes}
      />
      {label && (
        <label className="form-input__label" htmlFor={inputAttributes.id}>
          {label}
          {required && <span className="form-input__label--required"> *</span>}
        </label>
      )}
    </div>
  );
};

export default Radio;
