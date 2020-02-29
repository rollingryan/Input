import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

import InputWrapper from './InputWrapper';

const Textarea = ({
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
  const inputId = id ? id.replace(/\s+/g, '') : `${uuid.v4()}-textarea`;

  return (
    <InputWrapper
      inputType="textarea"
      id={inputId}
      className={className}
      noMargin={noMargin}
      disabled={disabled}>
      <textarea
        className="input__textarea__input"
        data-test={testSelector}
        disabled={disabled}
        id={inputId}
        name={name}
        onChange={onChange}
        placeholder=" "
        value={value}
      />
      <span className="input__textarea__label">
        {label}
        {required && (
          <span className="input__textarea__label--required"> *</span>
        )}
      </span>
    </InputWrapper>
  );
};

Textarea.propTypes = {
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
  value: PropTypes.string,
};

Textarea.defaultProps = {
  className: undefined,
  disabled: false,
  id: undefined,
  name: undefined,
  noMargin: false,
  required: false,
  testSelector: undefined,
  value: undefined,
};

export default Textarea;
