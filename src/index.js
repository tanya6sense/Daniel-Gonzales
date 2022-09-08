import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { useScroll } from 'react-router-scroll';
import createStore from 'store/createStore';
import favicon from 'images/favicon.ico'; //  eslint-disable-line
import createSagas from './sagas';
import { App } from './containers';

const initialState = {};

const store = createStore(initialState, browserHistory);

const MOUNT_NODE = document.getElementById('content');

let render = () => {
  createSagas(store);
  /* eslint-disable global-require */
  const createRoutes = require('routes').default;

  const rootRoute = {
    component: App,
    path: '/',
    childRoutes: createRoutes(store),
  };

  ReactDOM.render(
    <Provider store={store}>
      <Router
        history={browserHistory}
        routes={rootRoute}
        render={
          // Scroll to top when going to a new page, imitating default browser behaviour
        applyRouterMiddleware(useScroll())
}
      />
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  module.hot.accept(['./routes/index'], () => {
    const renderApp = render;

    // Wrap render in try/catch
    render = () => {
      try {
        setImmediate(() => {
          ReactDOM.unmountComponentAtNode(MOUNT_NODE);
          renderApp();
        });
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
      }
    };

    render();
  });
}

render();
