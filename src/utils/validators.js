import { includes, get } from 'lodash';
import moment from 'moment';
import { stringFormat } from 'utils/utils';
import { strings } from 'utils/constants';
// Error Types
const REQUIRED_FIELD = 'Required Field';

// This file is used for field level validators across the application
// for inputs, etc.

// Decorators
const stringInputDecorator = (wrappedFun) => (wrappedFunArgs) => (value, allValues) => {
  const trimmed = value ? value.replace(/^\s+|\s+$/g, '') : value;
  if (wrappedFunArgs) {
    return wrappedFun(wrappedFunArgs)(trimmed, allValues);
  }
  return wrappedFun(trimmed, allValues);
};

const forceError = (validationFun) => (value, allValues) => {
  const errors = validationFun(value, allValues);
  // Put in these checks if we want to chain these decorators one day
  if (errors === undefined) {
    return undefined;
  }
  if (typeof errors === 'string') {
    return { forceShowError: true, value: errors };
  }
  // This is where other types of errors would go
  return undefined;
};
// Errors
const isRequired = (value) => (value ? undefined : REQUIRED_FIELD);
const dateRequired = (value) => ((value[0] !== '' && value[1] !== '')
  ? undefined
  : 'Required Field');
const minDateSpan = (min, unit) => (value) => {
  const displayUnit = min === 1 ? unit.replace(/s$/, '') : unit;
  return moment(value[1]).diff(moment(value[0]), unit) >= min
  ? undefined
  : stringFormat(strings.MIN_DATE_SPAN, { min, unit: displayUnit });
};
const maxDateSpan = (max, unit) => (value) => moment(value[1]).diff(moment(value[0]), unit) <= max
  ? undefined
  : stringFormat(strings.MAX_DATE_SPAN, { max, unit });
const maxLength = (max) => (value) => value && value.length > max
    ? stringFormat(strings.MAX_LENGTH, { max })
    : undefined;
const isNumber = (value) => value && Number.isNaN(Number(value))
    ? strings.IS_NUMBER
    : undefined;
const isCurrency = (value) => value && !/^\d+(?:\.\d{0,2})*$/.test(value)
    ? strings.IS_CURRENCY
    : undefined;
const isEmail = (value) => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? strings.IS_EMAIL
    : undefined;
const minLength = (min) => (value) => value && value.length < min
    ? stringFormat(strings.MIN_LENGTH, { min })
    : undefined;
const minAmount = (min) => (value) => value && value >= min
    ? undefined
    : stringFormat(strings.MIN_AMOUNT, { min: min.toLocaleString() });
const greaterThan = (gtkey, gtDisplay) => (value, allValues) => {
  const msg = stringFormat(strings.GREATER_THAN, { gtDisplay });
  return (value >= (parseInt(allValues[gtkey], 10) || 0)) ? undefined : msg;
};

const lessThan = (ltkey, ltDisplay) => (value, allValues) => {
  const msg = stringFormat(strings.LESS_THAN, { ltDisplay });
  return (value <= (parseInt(allValues[ltkey], 10) || Infinity)) ? undefined : msg;
};

const passwordInconsistent = (value, allValues) => {
  const { password = '' } = allValues;
  return value !== password ? strings.PASSWORD_INCONSISTENT : undefined;
};

const isFieldRequired = (msg) => (value) => (value ? undefined : msg);

const alphanumerical = (value) => {
  // all validation for name
  if (!/^(\w|\s)+$/.test(value)) {
    return strings.ALPHANUMERICAL;
  }
  return undefined;
};

const validWebsite = (value) => {
  // eslint-disable-next-line max-len
  const regex = RegExp(/[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi);
  if (!regex.test(value)) {
    return strings.CLICK_URL;
  }
  return undefined;
};

const notIn = (collection) => (value) => includes(collection, value)
  ? strings.NAME_EXISTS
  : undefined;

// Upload Checks
const fileSizeCheck = (value, allValues) => {
  // Apply this on the radio group. so value is the select size value
  const actualSize = get(allValues, 'creative[0].size');
  if (actualSize === undefined) {
    return undefined;
  }
  if (actualSize !== value) {
    return stringFormat(strings.FILE_SIZE, { value, actual_size: allValues.actual_size });
  }
  return undefined;
};

const fileListCheck = (fileList) => fileList instanceof Array && fileList.length > 0
  ? undefined
  : 'Atleast one creative is required';

const fileTypeCheck = (type) => typeof type === 'string'
? stringFormat(strings.FILE_TYPE, { type })
: undefined;

// This is hacky. all of this will leave once we get a nice attacheable component
const fileLargenessCheck = (size) => typeof size === 'number'
? stringFormat(strings.FILE_LARGE, { size: size.toString() })
: undefined;

// Warn
const maxValue = (max) => (value) => value && value > max
  ? stringFormat(strings.MAX_VALUE, { max: max.toLocaleString() })
  : undefined;

export const errors = {
  isRequired,
  isNumber,
  isCurrency,
  isEmail,
  minDateSpan,
  maxDateSpan,
  minLength: stringInputDecorator(minLength),
  maxLength: stringInputDecorator(maxLength),
  alphanumerical: stringInputDecorator(alphanumerical)(),
  validWebsite: stringInputDecorator(validWebsite)(),
  fileTypeCheck,
  minAmount,
  dateRequired,
  greaterThan,
  lessThan,
  fileSizeCheck,
  notIn,
  passwordInconsistent,
  isFieldRequired,
  fileListCheck,
  fileLargenessCheck,
  // This is a reused one so create a list that can be used everywhere
  validNameList: [stringInputDecorator(maxLength)(30),
    stringInputDecorator(alphanumerical)()],
};

export const decorators = {
  forceError,
};

export const warnings = {
  maxValue,
};

export const errorTypes = {
  REQUIRED_FIELD,
};
