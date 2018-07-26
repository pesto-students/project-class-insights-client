import { connect } from 'react-redux';
import _ from 'lodash';

import StudentRegisterPage from './StudentRegisterPage';
import { userActions } from '../../actions';

const mapDispatchToProps = {
  register: userActions.register,
};

const mapStateToProps = state => ({
  registering: _.get(state, state.registration, false),
});


export default connect(mapStateToProps, mapDispatchToProps)(StudentRegisterPage);
