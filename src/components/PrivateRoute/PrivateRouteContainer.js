import { connect } from 'react-redux';
import _ from 'lodash';

import PrivateRoute from './PrivateRoute';

const mapStateToProps = state => ({
  loggedIn: _.get(state, state.authentication.loggedIn, false),
});

export default connect(mapStateToProps)(PrivateRoute);
