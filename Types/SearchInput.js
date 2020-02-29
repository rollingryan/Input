import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

import Icon from 'components/shared/Icon';
import InputWrapper from './InputWrapper';

const SearchInput = ({
  className,
  disabled,
  id,
  name,
  noMargin,
  onChange,
  placeholder,
  testSelector,
  value,
}) => {
  const inputId = id ? id.replace(/\s+/g, '') : `${uuid.v4()}-search`;

  return (
    <InputWrapper
      inputType="search"
      id={inputId}
      className={className}
      noMargin={noMargin}
      disabled={disabled}>
      <Icon icon="search" className="input__search__icon" />
      <input
        type="text"
        className="form-input__input"
        disabled={disabled}
        name={name}
        id={inputId}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        data-test={testSelector}
      />
    </InputWrapper>
  );
};

SearchInput.propTypes = {
  /** Custom Class Name */
  className: PropTypes.string,
  /** Disabled boolean */
  disabled: PropTypes.bool,
  /** Unique id */
  id: PropTypes.string,
  /** Unique name for input */
  name: PropTypes.string,
  /** Boolean to remove margin */
  noMargin: PropTypes.bool,
  /** Function to call when changing the input */
  onChange: PropTypes.func.isRequired,
  /** Placeholder for input */
  placeholder:PropTypes.string,
  /** HTML data attribute for test selecting element  */
  testSelector: PropTypes.string,
  /** Value of input */
  value: PropTypes.string,
};

SearchInput.defaultProps = {
  className: undefined,
  disabled: false,
  id: undefined,
  name: undefined,
  noMargin: false,
  placeholder: "Search...",
  testSelector: undefined,
  value: undefined,
};

export default SearchInput;
