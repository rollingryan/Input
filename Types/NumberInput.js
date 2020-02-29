import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

import InputWrapper from './InputWrapper';

const NumberInput = ({
  className,
  disabled,
  id,
  label,
  name,
  noMargin,
  onChange,
  required,
  testSelector,
  value,
}) => {
  const inputId = id ? id.replace(/\s+/g, '') : `${uuid.v4()}-number`;

  return (
    <InputWrapper
      inputType="number"
      id={inputId}
      className={className}
      noMargin={noMargin}
      disabled={disabled}>
      <input
        type="number"
        className="input__text__input"
        disabled={disabled}
        name={name}
        id={inputId}
        placeholder=" "
        value={value}
        onChange={onChange}
        data-test={testSelector}
      />
      <span className="input__text__label">
        {label}
        {required && <span className="input__text__label--required"> *</span>}
      </span>
    </InputWrapper>
  );
};

NumberInput.propTypes = {
  /** Custom Class Name */
  className: PropTypes.string,
  /** Disabled boolean */
  disabled: PropTypes.bool,
  /** Unique id */
  id: PropTypes.string,
  /** Label for input */
  label: PropTypes.string.isRequired,
  /** Unique name for input */
  name: PropTypes.string,
  /** Boolean to remove margin */
  noMargin: PropTypes.bool,
  /** Function to call when changing the input */
  onChange: PropTypes.func.isRequired,
  /** Boolean to make input required and add * to label */
  required: PropTypes.bool,
  /** HTML data attribute for test selecting element  */
  testSelector: PropTypes.string,
  /** Value of input */
  value: PropTypes.number,
};

NumberInput.defaultProps = {
  className: undefined,
  disabled: false,
  id: undefined,
  name: undefined,
  noMargin: false,
  required: false,
  testSelector: undefined,
  value: null,
};

export default NumberInput;
