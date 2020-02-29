import React, { useContext, useEffect, useRef } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

import Icon from 'components/shared/Icon';
import InputWrapper from './InputWrapper';

import { CheckboxContext } from './CheckboxGroup';

const Checkbox = ({
  className,
  defaultChecked,
  disabled,
  id,
  indeterminate,
  isChecked,
  label,
  name,
  noMargin,
  onChange,
  testSelector,
  value,
}) => {
  const checkboxRef = useRef(null);
  const inputId = id ? id.replace(/\s+/g, '') : `${uuid.v4()}-checkbox`;

  // Returns null when context is not used
  const groupContext = useContext(CheckboxContext);

  useEffect(() => {
    // On mount if using CheckboxGroup set children's values inside context
    if (groupContext && id !== groupContext.parentId) {
      groupContext.setCheckboxRefs(checkboxRef);
      // If defaultChecked set it in CheckboxGroup context selected
      if (defaultChecked) {
        groupContext.setDefaultChecked(checkboxRef);
      }
    }
  }, []);

  // Ref is used to set basic indeterminate state on checkbox
  // and control state when wrapped in CheckboxGroup
  const setCheckboxRef = element => {
    checkboxRef.current = element;
    const tempElement = element;

    if (element) {
      if (!groupContext && indeterminate) {
        // Set checkbox indeterminate without CheckboxGroup
        tempElement.indeterminate = indeterminate;
      } else if (groupContext) {
        // With CheckboxGroup set checkbox state through refs
        const { selectedCheckboxes, parentId, checkboxRefs } = groupContext;

        const isSelected = selectedCheckboxes.some(
          selectedData => selectedData === checkboxRef.current,
        );

        if (selectedCheckboxes.length === 0) {
          // Nothing selected (also set parent)
          tempElement.indeterminate = false;
          tempElement.checked = false;
        } else if (parentId === id) {
          // If checkbox is the parent
          if (selectedCheckboxes.length === checkboxRefs.length) {
            // All children are selected
            tempElement.checked = true;
            tempElement.indeterminate = false;
          } else if (
            selectedCheckboxes.length > 0 &&
            selectedCheckboxes.length < checkboxRefs.length
          ) {
            // A few children are selected
            tempElement.indeterminate = true;
            tempElement.checked = false;
          }
        } else if (isSelected) {
          // Mark checked
          tempElement.checked = true;
        } else {
          // Remove check
          tempElement.checked = false;
        }
      }
    }

    return tempElement;
  };

  return (
    <InputWrapper
      inputType="checkbox"
      id={inputId}
      className={className}
      noMargin={noMargin}
      disabled={disabled}>
      <input
        checked={isChecked}
        defaultChecked={defaultChecked}
        className="input__checkbox__input"
        data-test={testSelector}
        disabled={disabled}
        id={inputId}
        name={name || id}
        onChange={data => {
          if (onChange) {
            onChange(data);
          }
          if (groupContext) {
            groupContext.checkboxGroupOnChange(data, checkboxRef);
          }
        }}
        type="checkbox"
        value={value || id}
        ref={element => setCheckboxRef(element)}
      />
      <span className="input__checkbox__custom-checkbox">
        <Icon icon="check_mark" className="input__checkbox__check-mark" />
        <Icon icon="minus" className="input__checkbox__indeterminate" />
      </span>
      {label && <span className="input__checkbox__label">{label}</span>}
    </InputWrapper>
  );
};

Checkbox.propTypes = {
  /** Custom Class Name */
  className: PropTypes.string,
  /** Sets checkbox as checked on mount, ( used for uncontrolled checkbox ) */
  defaultChecked: PropTypes.bool,
  /** Disabled boolean */
  disabled: PropTypes.bool,
  /** Unique id */
  id: PropTypes.string,
  /** Boolean to toggle indeterminate status */
  indeterminate: PropTypes.bool,
  /** Boolean to toggle checked status */
  isChecked: PropTypes.bool,
  /** Optional label for the checkbox */
  label: PropTypes.string,
  /** Unique name for the group of radios */
  name: PropTypes.string,
  /** Boolean to remove margin */
  noMargin: PropTypes.bool,
  /** Function to call when clicked */
  onChange: PropTypes.func,
  /** HTML data attribute for test selecting element  */
  testSelector: PropTypes.string,
  /** Value of Checkbox */
  value: PropTypes.string,
};

Checkbox.defaultProps = {
  className: undefined,
  defaultChecked: false,
  disabled: false,
  id: undefined,
  indeterminate: undefined,
  isChecked: undefined,
  label: undefined,
  name: undefined,
  noMargin: false,
  testSelector: undefined,
  onChange: undefined,
  value: undefined,
};

export default Checkbox;
