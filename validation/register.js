import { isLength, isEmpty, equals } from 'validator';
import validText from './valid-text';

export default function validateRegisterInput(data) {
  let errors = {};

  data.username = validText(data.username) ? data.username : '';
  data.password = validText(data.password) ? data.password : '';
  // data.password2 = validText(data.password2) ? data.password2 : '';

  if (!isLength(data.username, { min: 2, max: 30 })) {
    errors.username = 'username must be between 2 and 30 characters';
  }

  if (isEmpty(data.username)) {
    errors.username = 'username field is required';
  }

  if (isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!isLength(data.password, { min: 4, max: 30 })) {
    errors.password = 'Password must be at least 4 characters';
  }

  // if (isEmpty(data.password2)) {
  //   errors.password2 = 'Confirm Password field is required';
  // }

  // if (!equals(data.password, data.password2)) {
  //   errors.password2 = 'Passwords must match';
  // }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};