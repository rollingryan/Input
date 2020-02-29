import React from 'react';
import PropTypes from 'prop-types';

import { RadioContext } from './Radio';

const RadioGroup = ({ children, name, onChange }) => {
  return (
    <RadioContext.Provider
      value={{ radioGroupName: name, radioGroupOnChange: onChange }}>
      {children}
    </RadioContext.Provider>
  );
};

RadioGroup.propTypes = {
  /** React children */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  /** Unique name for the group of radios */
  name: PropTypes.string.isRequired,
  /** Function to call when clicked (don't use if using <RadioGroup />) */
  onChange: PropTypes.func.isRequired,
};

export default RadioGroup;
