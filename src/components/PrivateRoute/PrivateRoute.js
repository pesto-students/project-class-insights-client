import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { routes } from '../../constants';
import { SESSION_STORAGE_KEY } from '../../constants/auth.constant';

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        sessionStorage.getItem(SESSION_STORAGE_KEY)
          ? <Component {...props} />
          : <Redirect to={routes.ClientLogin} />
      )}
    />
  );
};

PrivateRoute.defaultProps = {
  component: null,
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  loggedIn: PropTypes.bool.isRequired,
};


export default PrivateRoute;
