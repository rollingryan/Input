import React, { useState } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

import InputWrapper from './InputWrapper';

const FileInput = ({
  accept,
  className,
  disabled,
  id,
  label,
  name,
  noMargin,
  onChange,
  required,
  testSelector,
}) => {
  const [fileName, setFileName] = useState('');
  const inputId = id ? id.replace(/\s+/g, '') : `${uuid.v4()}-file`;

  const uploadFile = e => {
    setFileName(e.target.files[0].name);
    onChange(e);
  };

  return (
    <InputWrapper
      inputType="file"
      id={inputId}
      className={className}
      noMargin={noMargin}
      disabled={disabled}>
      <input
        accept={accept}
        type="file"
        className="input__file__input"
        disabled={disabled}
        name={name}
        id={inputId}
        onChange={uploadFile}
        data-test={testSelector}
      />
      <span
        className={`input__file__label ${
          fileName ? 'input__file__label--has-file' : ''
        }`}>
        {label}
        {required && <span className="input__file__label--required"> *</span>}
      </span>
      {fileName ? <span className="input__file__text">{fileName}</span> : null}
      <span className="input__file__button">Choose File</span>
    </InputWrapper>
  );
};

FileInput.propTypes = {
  /** File types that are accepted Example: 'image/*, application/pdf' */
  accept: PropTypes.string,
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
};

FileInput.defaultProps = {
  accept: undefined,
  className: undefined,
  disabled: false,
  id: undefined,
  name: undefined,
  noMargin: false,
  required: false,
  testSelector: undefined,
};

export default FileInput;
