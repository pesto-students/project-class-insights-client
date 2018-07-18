import { connect } from 'react-redux';
// import _ from 'lodash';
import StudentFeedbackForm from './StudentFeedbackForm';
import { SubmitFeedback } from '../../actions';

const mapStateToProps = state => ({
  requestedForm: state.feedbackSubmission.requestedForm,
});

const mapDispatchToProps = {
  getData: SubmitFeedback.getData,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentFeedbackForm);
