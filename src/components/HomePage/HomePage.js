import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { routes } from '../../constants';

class HomePage extends React.Component {
  render() {
    const { logout } = this.props;
    return (
      <div>
        <h1>
          Logged In
        </h1>
        <NavLink to={routes.ClientLogin} onClick={logout}>
          Log Out
        </NavLink>
      </div>
    );
  }
}

HomePage.defaultProps = {
  logout: null,
};

HomePage.propTypes = {
  logout: PropTypes.func,
};
export default HomePage;
