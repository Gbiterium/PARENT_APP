import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import {
  required,
  email,
  confirmed,
  alpha_spaces,
  digits,
  // eslint-disable-next-line camelcase
  max_value,
  max
} from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required',
})

extend('email', {
  ...email,
  message: 'This email field is not an email format',
})
extend('confirmed', {
  ...confirmed,
})
extend('alpha_spaces', {
  ...alpha_spaces,
  message: 'must be alphabetic',
})
extend('digits', {
  ...digits,
  message: 'Must be an 11 digit number',
})
extend('max_value', {
  // eslint-disable-next-line camelcase
  ...max_value,
  message: 'Maximum value exceeded',
})

extend('max', {
  ...max,
  message: (fieldName, val) => {
    return `The ${fieldName} must be less than or equal to ${val.length}.`;
  },
})
extend('dot', {
  validate: (value) => {
    return /\./.test(value);
  },
  message: (fieldName) => {
    return `The ${fieldName} field must contain a dot.`;
  },
})
extend("phone", {
  validate: value => {
    const regex = /^\+(?:\d{3,3} ?){3,3}\d{4,4}$/;
    return regex.test(value);
  },
  message: 'Please enter a valid phone number'
})
extend("date", {
  validate: value => {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    return regex.test(value);
  },
  message: 'Please enter a valid date'
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)