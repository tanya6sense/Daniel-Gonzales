import { getAsyncInjectors } from 'store/utils';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createSagas(store) {
  const { injectSagas } = getAsyncInjectors(store);
  // inject any other sagas here

  const rootSagas = [];

  injectSagas('root', rootSagas);
}
