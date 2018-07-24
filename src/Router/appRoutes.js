import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { routes } from '../constants/routes';
import HomePage from '../components/HomePage';
import DashboardPage from '../components/DashboardPage';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import PrivateRoute from '../components/PrivateRoute';
import { history } from '../helpers/history';
import FeedBackForm from '../components/FeedBackForm';
import BatchesPage from '../components/BatchesPage';


const appRoutes = (
  <Router history={history}>
    <div>
      <Switch>
        <Route path={routes.ClientLogin} component={LoginPage} />
        <PrivateRoute exact path={routes.Home} component={HomePage} />
        <Route path={routes.ClientSignup} component={RegisterPage} />
        <Route path={routes.ClientFeedBackForm} component={FeedBackForm} />
        <Route path={routes.Dashboard} component={DashboardPage} />
        <Route path={routes.BatchesPage} component={BatchesPage} />
        <Route component={LoginPage} />
      </Switch>
    </div>
  </Router>
);

export default appRoutes;
