import 'whatwg-fetch';
import { isPrelogin } from 'utils/utils';
import { codes } from './constants';

const {
  HTTP_401_UNAUTHORIZED,
  HTTP_200_OK,
  HTTP_403_FORBIDDEN,
  HTTP_500_INTERNAL_SERVER_ERROR,
  HTTP_300_MULTIPLE_CHOICES,
  HTTP_422_UNKNOWN,
} = codes;

const POST_OPTIONS = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'same-origin',
};

const PUT_OPTIONS = {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'same-origin',
};

const PATCH_OPTIONS = {
  method: 'PATCH',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'same-origin',
};

const OPTIONS_OPTIONS = {
  method: 'OPTIONS',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'same-origin',
};

const GET_OPTIONS = {
  method: 'GET',
  credentials: 'same-origin',
};

function checkRequestStatus(response) {
  const { pathname } = window.location;

  if (response.status === HTTP_401_UNAUTHORIZED || response.status === HTTP_403_FORBIDDEN) {
    // include redirect-type logic in here
  }

  if (response.status >= HTTP_500_INTERNAL_SERVER_ERROR) {
    const error = new Error();
    error.errorStatus = response.status;
    error.errorMessage = response.statusText;
    throw error;
  }

  const json = response.json();

  if (response.status >= HTTP_200_OK && response.status < HTTP_300_MULTIPLE_CHOICES) {
    return json;
  }

  return json.then((err) => {
    const error = new Error(response.statusText);
    error.body = err;
    error.errorStatus = response.status;
    error.errorMessage = response.statusText;

    if (
      [HTTP_401_UNAUTHORIZED, HTTP_403_FORBIDDEN, HTTP_422_UNKNOWN].includes(response.status)
      && isPrelogin(pathname)
    ) {
      // console.warn(`API: ${response.status}`, error);
    } else {
      // console.error(`API Error: ${response.status}`, error);
    }

    throw error;
  });
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, method, options, errorHandler) {
  let newErrorHandler = errorHandler;
  if (newErrorHandler === undefined) {
    newErrorHandler = (result) => {
      throw result;
    };
  }
  let bakedOptions;
  const meth = typeof method === 'string' ? method : '';
  switch ((meth || '').toUpperCase()) {
    case 'PUT':
      bakedOptions = PUT_OPTIONS;
      break;
    case 'POST':
      bakedOptions = POST_OPTIONS;
      break;
    case 'PATCH':
      bakedOptions = PATCH_OPTIONS;
      break;
    case 'OPTIONS':
      bakedOptions = OPTIONS_OPTIONS;
      break;
    default:
      bakedOptions = GET_OPTIONS;
  }

  return fetch(`${window.location.origin}/${url}`, { ...bakedOptions, ...options })
    .then(checkRequestStatus)
    .catch(newErrorHandler);
}
