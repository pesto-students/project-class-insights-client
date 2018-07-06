import { connect } from 'react-redux';
import _ from 'lodash';

import RegisterPage from './RegisterPage';
import { userActions } from '../../actions';

const mapDispatchToProps = {
  register: userActions.register,
};

const mapStateToProps = state => ({
  registering: _.get(state, state.registration, false),
});


export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
