import React from 'react';

// This file should include re-usable strings (errors, zero state messages, etc.)
// and re-usable html strings across the entire application
// We keep these in here to make it easier for design/ux to update things
export const GLOBAL_ERROR_MESSAGE = 'Something happened. Please refresh the page and try again.';

const CARD_ZERO_DATA_GENERIC = (
  <div>
    <p>No data is available.</p>
  </div>
);

const CARD_ERROR = (
  <div>
    <p>
      No data can be loaded.
      <br />
      {' '}
      Please refresh the page and try again.
    </p>
  </div>
);

const PAGE_LEVEL_ERROR = (
  <div>
    <p>
      Something went wrong.
      <br />
      Please refresh the page and try again.
    </p>
  </div>
);

const NOT_FOUND = (
  <div>
    <p>
      This page does not exist.
      <br />
      At least not in big deep data space.
      <br />
      (404 Error)
    </p>
  </div>
);

const TOP_LEVEL_ERROR = (
  <div>
    <p>
      Something went wrong in
      <br />
      deep big data space
    </p>
  </div>
);

const PASSWORD_RULES = (
  <ul>
    <li>Must be at least 8 characters</li>
    <li>Must contain at least 1 alphabetic character</li>
    <li>Must contain at least 1 uppercase character</li>
    <li>Must contain at least 1 number</li>
    <li>Must contain at least 1 special character</li>
  </ul>
);

const PASSWORD_RULES_HEADER = <span>Password Requirements</span>;

// Validation strings
/*  eslint no-template-curly-in-string: 0 */
const MIN_DATE_SPAN = 'Less than allowed minimum flight of {min} {unit}.';
const REQUIRED_FIELD = 'Required Field';
const MAX_DATE_SPAN = 'Exceeds maximum flight of {max} {unit}.';
const MAX_LENGTH = 'Must be {max} characters or less.';
const IS_NUMBER = 'Must be a number';
const IS_CURRENCY = 'Invalid currecny';
const IS_EMAIL = 'Invalid email address';
const MIN_LENGTH = 'Must be {min} characters or more';
const MIN_AMOUNT = 'Amount does not meet minimum: ${min}.00';
const GREATER_THAN = 'Amount entered is smaller than {gtDisplay}.';
const LESS_THAN = 'Amount entered is larger than ${ltDisplay}.';
const ALPHANUMERICAL = 'Syntax is not allowed. Name must be alphanumerical and may contain spaces.';
const CLICK_URL = 'Invalid url';
const NAME_EXISTS = 'Name already exists.';
const FILE_SIZE = 'Selected image size {value} does not match actual image size {actual_size}';
const FILE_TYPE = 'File type {type} not allowed';
const FILE_LARGE = 'Attached file of {size} KB larger than maximum supported file size of 150 KB';
const MAX_VALUE_TEXT_CONTD = ' You may want to verify this is the intended amount.';
const MAX_VALUE = 'We noticed you entered in a campaign budget over ${max}.' + MAX_VALUE_TEXT_CONTD; // eslint-disable-line
const PASSWORD_INCONSISTENT = 'Passwords do not match.';
const EMAIL_REQUIRED = 'Please enter a valid email';
const PASSWORD_REQUIRED = 'Please enter your password';

// Alert strings
const CREATE_CANCEL_CONTENT = 'Are you sure you want to cancel? You will lose all unsaved changes.';
const CREATE_CANCEL_OK = 'Yes, Leave Page';
const ERROR_500 = 'Something went wrong. Please try again.';
const AUTH_TIMED_OUT = 'Your session has timed out';

// Todo List strings
const ZERO_INCOMPLETE_TODOS = 'No Completed Todo Items';
const ZERO_COMPLETE_TODOS = 'Add a Todo to get started';
const TODO_ADD_ERROR = 'Uh oh, we could not add that item. Refresh the page and try again';

const HTTP_200_OK = 200;
const HTTP_300_MULTIPLE_CHOICES = 300;
const HTTP_400_BAD_REQUEST = 400;
const HTTP_401_UNAUTHORIZED = 401;
const HTTP_401_MOD_UNAUTHORIZED = 40101;
const HTTP_403_FORBIDDEN = 403;
const HTTP_404_NOT_FOUND = 404;
const HTTP_404_MOD_NOT_FOUND = 40401;
const HTTP_422_UNKNOWN = 422;
const HTTP_500_INTERNAL_SERVER_ERROR = 500;
const HTTP_503_SERVICE_UNAVAILABLE = 503;

export const codes = {
  HTTP_404_NOT_FOUND,
  HTTP_404_MOD_NOT_FOUND,
  HTTP_503_SERVICE_UNAVAILABLE,
  HTTP_401_MOD_UNAUTHORIZED,
  HTTP_401_UNAUTHORIZED,
  HTTP_403_FORBIDDEN,
  HTTP_300_MULTIPLE_CHOICES,
  HTTP_200_OK,
  HTTP_500_INTERNAL_SERVER_ERROR,
  HTTP_400_BAD_REQUEST,
  HTTP_422_UNKNOWN,
};

export const strings = {
  GLOBAL_ERROR_MESSAGE,
  MIN_DATE_SPAN,
  REQUIRED_FIELD,
  MAX_DATE_SPAN,
  MAX_LENGTH,
  IS_NUMBER,
  IS_CURRENCY,
  IS_EMAIL,
  MIN_LENGTH,
  MIN_AMOUNT,
  GREATER_THAN,
  LESS_THAN,
  ALPHANUMERICAL,
  CLICK_URL,
  NAME_EXISTS,
  FILE_SIZE,
  FILE_TYPE,
  FILE_LARGE,
  MAX_VALUE_TEXT_CONTD,
  MAX_VALUE,
  PASSWORD_INCONSISTENT,
  EMAIL_REQUIRED,
  PASSWORD_REQUIRED,
  CREATE_CANCEL_OK,
  CREATE_CANCEL_CONTENT,
  ERROR_500,
  AUTH_TIMED_OUT,
  ZERO_COMPLETE_TODOS,
  ZERO_INCOMPLETE_TODOS,
  TODO_ADD_ERROR,
};

export const htmlStrings = {
  CARD_ZERO_DATA_GENERIC,
  CARD_ERROR,
  PAGE_LEVEL_ERROR,
  NOT_FOUND,
  TOP_LEVEL_ERROR,
  PASSWORD_RULES,
  PASSWORD_RULES_HEADER,
};

export const DATE_FORMAT = 'MM Do, YYYY';

export const sanitizedFieldNames = ['password', 'confirmPassword'];
