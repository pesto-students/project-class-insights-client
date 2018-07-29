import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from '../constants/routes';
import HomePage from '../components/HomePage';
import DashboardPage from '../components/DashboardPage';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import PrivateRoute from '../components/PrivateRoute';
import FeedBackForm from '../components/FeedBackForm';
import BatchesPage from '../components/BatchesPage';
import BatchesDetailsPage from '../components/BatchesDetailsPage';
import StudentFeedbackForm from '../components/StudentFeedbackForm';
import StudentRegisterPage from '../components/StudentRegisterPage';
import StudentHomePage from '../components/StudentHomePage';
import AddBatchPage from '../components/AddBatchPage';
import AddStudentPage from '../components/AddStudentPage';

const appRoutes = (
  <Switch>
    {/* Protected Routes */}
    <PrivateRoute exact path={routes.Home} component={HomePage} />
    <PrivateRoute path={routes.ClientFeedBackForm} component={FeedBackForm} />
    <PrivateRoute path={routes.Dashboard} component={DashboardPage} />
    <PrivateRoute path={routes.BatchesPage} component={BatchesPage} />
    <PrivateRoute path={routes.BatchesDetailsPage} component={BatchesDetailsPage} />
    <PrivateRoute path={routes.SubmitFeedback} component={StudentFeedbackForm} />
    <PrivateRoute path={routes.StudentHome} component={StudentHomePage} />
    <PrivateRoute path={routes.AddBatch} component={AddBatchPage} />
    <PrivateRoute path={routes.AddStudent} component={AddStudentPage} />

    {/* Open Routes */}
    <Route path={routes.StudentSignup} component={StudentRegisterPage} />
    <Route path={routes.ClientLogin} component={LoginPage} />
    <Route path={routes.ClientSignup} component={RegisterPage} />
    <Route component={LoginPage} />
  </Switch>
);

export default appRoutes;
