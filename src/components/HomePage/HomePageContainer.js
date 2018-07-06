import { connect } from 'react-redux';
import HomePage from './HomePage';
import { userActions } from '../../actions';

const mapDispatchToProps = {
  logout: userActions.logout,
};
export default connect(null, mapDispatchToProps)(HomePage);
