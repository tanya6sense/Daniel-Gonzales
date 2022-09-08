import createReducer from 'reducers';

/**
 * Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer(store) {
  return function injectReducer(name, asyncReducer) {
    if (Reflect.has(store.asyncReducers, name)) return;

    /* eslint-disable no-param-reassign */
    store.asyncReducers[name] = asyncReducer;
    /* eslint-enable no-param-reassign */

    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

const injectedSagas = {};

/**
 * Inject an asynchronously loaded saga
 */
export function injectAsyncSagas(store) {
  return function injectSagas(name, sagas) {
    if (injectedSagas[name]) {
      return null;
    }
    injectedSagas[name] = true;
    sagas.map((saga) => store.runSaga(saga));
    return null;
  };
}

/**
 * Helper for creating injectors
 */
export function getAsyncInjectors(store) {
  return {
    injectReducer: injectAsyncReducer(store),
    injectSagas: injectAsyncSagas(store),
  };
}
