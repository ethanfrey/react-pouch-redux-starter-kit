'use strict';

import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import reducer from './reducer';
import reduxLogger from 'redux-logger';
import thunk from 'redux-thunk';
import DevTools from '../components/dev-tools';

const logger = reduxLogger();

/*
let createStoreWithMiddleware = compose(
  applyMiddleware(thunk, promise, logger)(createStore),
  DevTools.instrument()
  );
*/

const store = createStore(
    reducer,
    {},
    compose(
      applyMiddleware(thunk, promise, logger),
      DevTools.instrument()
    )
  );

export default store;

// export default createStoreWithMiddleware(reducer);
