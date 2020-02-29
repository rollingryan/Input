import React, { createContext } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

import InputWrapper from './InputWrapper';

export const RadioContext = createContext({});

const Radio = ({
  className,
  defaultChecked,
  disabled,
  id,
  isChecked,
  label,
  name,
  noMargin,
  onChange,
  testSelector,
  value,
}) => {
  const inputId = id ? id.replace(/\s+/g, '') : `${uuid.v4()}-radio`;

  return (
    <RadioContext.Consumer>
      {({ radioGroupName, radioGroupOnChange }) => (
        <InputWrapper
          inputType="radio"
          id={inputId}
          className={className}
          noMargin={noMargin}
          disabled={disabled}>
          <input
            checked={isChecked}
            className="input__radio__input"
            data-test={testSelector}
            defaultChecked={defaultChecked}
            disabled={disabled}
            id={inputId}
            name={name || radioGroupName}
            onChange={onChange || radioGroupOnChange}
            type="radio"
            value={value}
          />
          <span className="input__radio__custom-radio">
            <span className="input__radio__custom-radio__circle" />
          </span>
          {label && <span className="input__radio__label">{label}</span>}
        </InputWrapper>
      )}
    </RadioContext.Consumer>
  );
};

Radio.propTypes = {
  /** Custom Class Name */
  className: PropTypes.string,
  /** Boolean to set the default radio */
  defaultChecked: PropTypes.bool,
  /** Disabled boolean */
  disabled: PropTypes.bool,
  /** Unique id */
  id: PropTypes.string,
  /** Boolean to toggle checked status */
  isChecked: PropTypes.bool,
  /** Optional label for the radio */
  label: PropTypes.string,
  /** Unique name for the group of radios */
  name: PropTypes.string,
  /** Boolean to remove margin */
  noMargin: PropTypes.bool,
  /** Function to call when clicked (don't use if using <RadioGroup />) */
  onChange: PropTypes.func,
  /** HTML data attribute for test selecting element  */
  testSelector: PropTypes.string,
  /** Value of Radio */
  value: PropTypes.string,
};

Radio.defaultProps = {
  className: undefined,
  defaultChecked: undefined,
  disabled: false,
  id: undefined,
  isChecked: undefined,
  label: undefined,
  name: undefined,
  noMargin: false,
  onChange: undefined,
  testSelector: undefined,
  value: undefined,
};

export default Radio;
