import { connect } from 'react-redux';
import DashboardPage from './DashboardPage';
import { userActions } from '../../actions';

const mapDispatchToProps = {
  logout: userActions.logout,
};
export default connect(null, mapDispatchToProps)(DashboardPage);
