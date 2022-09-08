export default function createRoutes() {
  return {
    path: 'other',
    name: 'Other',
    getComponent(nextState, cb) {
      require.ensure(
        [],
        (require) => {
          const containers = require('./containers');
          cb(null, containers.Other);
        },
        'other'
      );
    },
  };
}
