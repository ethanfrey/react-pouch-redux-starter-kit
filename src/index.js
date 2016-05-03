'use strict';

import { Provider } from 'react-redux';
import Router from './components/router';
import React from 'react';
import { render } from 'react-dom';
import store from './redux/store';
import DevTools from './components/dev-tools';

render(
  <Provider store={store}>
    <div>
      <Router />
      <DevTools />
    </div>
  </Provider>
  , document.getElementById('app')
);
