import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { routes } from '../../constants';
import { history } from '../../helpers';

class HomePage extends React.Component {
  componentWillMount() {
    // const userRole = sessionStorage.getItem(SESSION_STORAGE_KEY);
    const userRole = 1;
    if (userRole === 0) {
      history.push(routes.SubmitFeedback);
    } else if (userRole === 1) {
      history.push(routes.Dashboard);
    } else {
      history.push(routes.logout);
    }
  }

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
