import { isEmpty } from 'validator';
import validText from './valid-text';

export default function validateLoginInput(data) {
  let errors = {};

  data.username = validText(data.username) ? data.username : '';
  data.password = validText(data.password) ? data.password : '';

  if (isEmpty(data.username)) {
    errors.username = 'username field is required';
  }

  if (isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};