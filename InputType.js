import React from 'react';

import {
  Checkbox,
  EmailInput,
  FileInput,
  NumberInput,
  NumericCodeInput,
  PasswordInput,
  Radio,
  SearchInput,
  TelephoneInput,
  Textarea,
  TextInput,
} from './Types';

// This is temporary,
// allows import <Input type="file" /> to work in current code
// use import { FileInput } from 'components/shared/Input'

const InputType = props => {
  const { type } = props;
  switch (type) {
    case 'checkbox':
      return <Checkbox {...props} />;
    case 'email':
      return <EmailInput {...props} />;
    case 'file':
      return <FileInput {...props} />;
    case 'number':
      return <NumberInput {...props} />;
    case 'numcode':
      return <NumericCodeInput {...props} />;
    case 'password':
      return <PasswordInput {...props} />;
    case 'radio':
      return <Radio {...props} />;
    case 'tel':
      return <TelephoneInput {...props} />;
    case 'textarea':
      return <Textarea {...props} />;
    case 'search':
      return <SearchInput {...props} />;
    default:
      return <TextInput {...props} />;
  }
};

export default InputType;
