import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const childCheckboxesReducer = (state, data) => {
  state.push(data.current);
  return state;
};

const selectedCheckboxesReducer = (state, action) => {
  let tempState = [...state];
  const {type, data, callback} = action;
  switch (type) {
    case 'SELECT_SINGLE':
      tempState.push(data);
      callback(tempState);
      return tempState;
    case 'DESELECT_SINGLE':
      tempState = _.remove(tempState, cb => cb !== data);
      callback(tempState);
      return tempState;
    case 'SELECT_ALL':
      tempState = data;
      callback(tempState);
      return tempState;
    case 'DESELECT_ALL':
      tempState = data;
      callback(tempState);
      return tempState;

    default:
      return state;
  }
};

export const CheckboxContext = createContext(null);

const CheckboxGroup = ({ children, onChange, parentId }) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useReducer(
    selectedCheckboxesReducer,
    [],
  );
  const [checkboxRefs, setCheckboxRefs] = useReducer(
    childCheckboxesReducer,
    [],
  );

  const handleGroupOnChange = (data, ref) => {
    const tempRef = ref.current;

    // Child is clicked
    if (data.target.id !== parentId) {
      if (data.target.checked) {
        setSelectedCheckboxes({
          type: 'SELECT_SINGLE',
          data: tempRef,
          callback: onChange,
        });
      } else {
        setSelectedCheckboxes({
          type: 'DESELECT_SINGLE',
          data: tempRef,
          callback: onChange,
        });
      }
      // Parent is clicked
    } else if (data.target.id === parentId) {
      if (data.target.checked) {
        setSelectedCheckboxes({
          type: 'SELECT_ALL',
          data: checkboxRefs,
          callback: onChange,
        });
      } else {
        setSelectedCheckboxes({
          type: 'DESELECT_ALL',
          data: [],
          callback: onChange,
        });
      }
    }
  };

  const setDefaultChecked = ref => {
    setSelectedCheckboxes({
      type: 'SELECT_SINGLE',
      data: ref.current,
      callback: () => {},
    });
  };

  return (
    <CheckboxContext.Provider
      value={{
        checkboxGroupOnChange: handleGroupOnChange,
        parentId,
        selectedCheckboxes,
        checkboxRefs,
        setCheckboxRefs,
        setDefaultChecked
      }}>
      {children}
    </CheckboxContext.Provider>
  );
};

/** 
 * Checkbox Group is setup to be used with uncontrolled checkboxes  
 * Checkbox props:
 * defaultChecked - to give it an initial checked state
 * onChange - both Checkbox and CheckboxGroup can be given an onChange
*/

CheckboxGroup.propTypes = {
  /** React children */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  /** Function to call when clicked (returns all the checkbox refs that have been checked) */
  onChange: PropTypes.func,
  /** Must match a checkbox id that will be the parent checkbox */
  parentId: PropTypes.string.isRequired,
};

CheckboxGroup.defaultProps = {
  onChange: ()=>{},
};

export default CheckboxGroup;
