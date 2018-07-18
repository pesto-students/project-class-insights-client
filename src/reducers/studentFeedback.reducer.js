import { StudentFeedbackConstants } from '../constants';

export const feedbackSubmission = (state = {}, action) => {
  switch (action.type) {
    case StudentFeedbackConstants.FORM_REQUEST:
      return {
        requestingForm: true,
      };
    case StudentFeedbackConstants.FORM_SUCCESS:
      return {
        requestedForm: action.requestedForm,
      };
    case StudentFeedbackConstants.FORM_FAILURE:
      return {};
    default:
      return state;
  }
};
