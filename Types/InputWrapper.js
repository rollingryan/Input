import React from 'react';
import PropTypes from 'prop-types';

const InputWrapper = ({
  children,
  className,
  disabled,
  id,
  inputType,
  noMargin,
}) => {
  return (
    <div
      className={`input 
        ${(noMargin && 'input--no-margin') || ''}`}>
      <label
        htmlFor={id}
        className={`
              input__${inputType}
              ${className || ''}
              ${disabled ? `input__${inputType}--disabled` : ''}
              `}>
        {children}
      </label>
    </div>
  );
};

InputWrapper.defaultProps = {
  className: undefined,
  disabled: false,
  noMargin: false,
};

InputWrapper.propTypes = {
   /** React children */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  /** Custom Class Name */
  className: PropTypes.string,
  /** Disabled boolean */
  disabled: PropTypes.bool,
  /** Unique id */
  id: PropTypes.string.isRequired,
  /** Input type */
  inputType: PropTypes.string.isRequired,
  /** Boolean to remove margin */
  noMargin: PropTypes.bool,
};

export default InputWrapper;
