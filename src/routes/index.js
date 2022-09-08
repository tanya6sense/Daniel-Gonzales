import { getAsyncInjectors } from '../store/utils';

export default function createRoutes(store) {
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/todos',
      name: 'Todos',
      getComponent(nextState, cb) {
        require.ensure(
          [],
          (require) => {
            const sagas = require('./Todos/sagas');
            const reducer = require('./Todos/modules');
            injectReducer('todos', reducer.default);
            injectSagas('todos', sagas.default);
            const containers = require('./Todos/containers');
            cb(null, containers.TodoView);
          },
          'todos'
        );
      },
    },
    {
      path: '/other',
      name: 'Other',
      getComponent(nextState, cb) {
        require.ensure(
          [],
          (require) => {
            const containers = require('./Other/containers');
            cb(null, containers.Other);
          },
          'other'
        );
      },
    },
  ];
}
