import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { routes } from '../../constants';
import { SESSION_USER_ROLE } from '../../constants/auth.constant';
import { history } from '../../helpers';

class HomePage extends React.Component {
  render() {
    const { logout } = this.props;
    const userRole = parseInt(sessionStorage.getItem(SESSION_USER_ROLE), 10);
    if (userRole === 0) {
      history.push(routes.StudentHome);
    } else if (userRole === 1) {
      history.push(routes.Dashboard);
    } else {
      history.push(routes.logout);
    }
    return (
      <div>
        <h1>
          Logged In
        </h1>
        <NavLink to={routes.ClientLogin} onClick={logout}>
          Log Out
        </NavLink>
        <br />
        <NavLink to={routes.ClientFeedBackForm}>
          Feed Back
        </NavLink>
        <NavLink to={routes.SubmitFeedback}>
          Submit Feedback
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
