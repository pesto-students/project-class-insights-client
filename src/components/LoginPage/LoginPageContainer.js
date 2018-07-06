import { connect } from 'react-redux';
import _ from 'lodash';
import LoginPage from './LoginPage';
import { userActions } from '../../actions';

const mapStateToProps = state => ({
  loggingIn: _.get(state, state.authentication, false),
});

const mapDispatchToProps = {
  login: userActions.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
