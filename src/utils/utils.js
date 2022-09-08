import {
 pickBy, includes, keys, reduce, isEmpty,
} from 'lodash';
import { getFormSyncErrors as gfse } from 'redux-form';
import moment from 'moment';
import { DATE_FORMAT } from './constants';

// This file should be used for global level UTIL funtions that may be reused
// across the application.

function getCookie(name) {
  const pattern = `(?:^|;)\\s?${name}(.*?)(?:;|$)`;
  const match = new RegExp(pattern, 'i').exec(document.cookie);

  if (match === null) {
    return null;
  }

  const value = decodeURIComponent(match[1].substring(1));
  const startWithQuote = /^".*/.test(value);
  const endsWithQuote = /.*"$/.test(value);

  return value.substring(startWithQuote ? 1 : 0, endsWithQuote ? value.length - 1 : value.length);
}

function isUserLoggedIn() {
  return !isEmpty(getCookie('6sisession'));
}

function truncateString(longString, numCharacters) {
  const parsedString = longString || '';
  if (parsedString.length < numCharacters) {
    return parsedString;
  }
  return `${parsedString.slice(0, Math.max(numCharacters - 3, 1))}...`;
}

function numberToDollar(number) {
  const fixedNumber = parseFloat(number.toFixed(2));
  return `$ ${fixedNumber.toLocaleString()}`;
}

const safePercent = (numerator, denominator, sigfig = 0) => {
  const fraction = numerator / denominator;
  if (denominator === 0) return 0;
  return parseFloat((fraction * 100 || 0).toFixed(sigfig));
};

function stringFormat(template, kwargs) {
  return reduce(
    keys(kwargs),
    (acc, key) => {
      const regex = new RegExp(`{${key}}`);
      return acc.replace(regex, kwargs[key]);
    },
    template
  );
}

const getFormSyncErrors = (formName, ...args) => (state) => {
  const syncErrors = gfse(formName)(state);
  if (args) {
    return pickBy(syncErrors, (item) => !includes(args, item));
  }
  return syncErrors;
};
// To Here

function getRandomInt(min, max) {
  const diff = max - min;
  return Math.floor(Math.random() * (diff + 1)) + min;
}

const parseDate = (date) => moment.parseZone(date).format('YYYY-MM-DD');

const displayDate = (dateString) => moment(dateString).format(DATE_FORMAT);

const spanToQueryParams = (span) => span.fixedRange
    ? `span=${span.timeWindow}`
    : `start_date=${parseDate(span.startDate)}&end_date=${parseDate(span.endDate)}`;

const spanToMomentRange = (span, today = moment()) => {
  if (span.fixedRange) {
    const endDate = today;
    let daysBack;
    switch (span.timeWindow) {
      case 'last_7_days':
        daysBack = 6;
        break;
      case 'last_30_days':
        daysBack = 29;
        break;
      case 'last_90_days':
        daysBack = 89;
        break;
      case 'current_week':
        daysBack = endDate.clone().day() - 1;
        break;
      case 'current_month':
        daysBack = endDate.clone().date() - 1;
        break;
      default:
        break;
    }
    return { startDate: endDate.clone().subtract(daysBack, 'days'), endDate };
  }
  return {
    startDate: moment.parseZone(span.startDate),
    endDate: moment.parseZone(span.endDate),
  };
};

const spanToRange = (span, today = moment(), momentFormat = 'll') => {
  const momentRange = spanToMomentRange(span, today);
  return {
    startDate: momentRange.startDate.format(momentFormat),
    endDate: momentRange.endDate.format(momentFormat),
  };
};

const timeWindowToSpan = (timeWindow) => ({
  fixedRange: true,
  timeWindow,
  startDate: null,
  endDate: null,
});

const spanToDisplayRange = (span, today = moment()) => {
  const range = spanToMomentRange(span, today);
  return `${range.startDate.format(DATE_FORMAT)} - ${range.endDate.format(DATE_FORMAT)}`;
};

export const parseDateString = (str) => {
  const obj = moment.parseZone(str);
  return obj.isValid() ? obj.format('ll') : str;
};

export const capitalize = (val) => {
  if (isEmpty(val)) {
    return val;
  }
  return val[0].toUpperCase() + val.slice(1);
};

export const isPrelogin = (route) => {
  const AUTH_ROUTES = ['/login', '/set_password', '/password_reset', '/activate'];

  return AUTH_ROUTES.reduce((memo, path) => memo || route.startsWith(path), false);
};

export {
  stringFormat,
  safePercent,
  truncateString,
  numberToDollar,
  getFormSyncErrors,
  getRandomInt,
  spanToQueryParams,
  spanToRange,
  timeWindowToSpan,
  spanToDisplayRange,
  displayDate,
  getCookie,
  isUserLoggedIn,
};
