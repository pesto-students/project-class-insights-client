import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { routes } from '../constants/routes';
import HomePage from '../components/HomePage';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import PrivateRoute from '../components/PrivateRoute';
import { history } from '../helpers/history';

const appRoutes = (
  <Router history={history}>
    <div>
      <Switch>
        <Route path={routes.ClientLogin} component={LoginPage} />
        <PrivateRoute exact path="/" component={HomePage} />
        <Route path={routes.ClientSignup} component={RegisterPage} />
        <Route component={LoginPage} />
      </Switch>
    </div>
  </Router>
);

export default appRoutes;
