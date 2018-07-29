import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import 'babel-polyfill';

import 'bootstrap/dist/css/bootstrap.css';

import App from './App';
import { history } from './helpers/history';
import { store } from './helpers/store';


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
