import { StudentFeedbackConstants, TEMP_FORM_ID } from '../constants';
import { formServices } from '../services';
import { alertActions } from './alert.actions';


const getData = () => {
  const request = () => {
    return {
      type: StudentFeedbackConstants.FORM_REQUEST,
    };
  };

  const success = (requestedForm) => {
    return {
      type: StudentFeedbackConstants.FORM_SUCCESS,
      requestedForm,
    };
  };

  const failure = (error) => {
    return {
      type: StudentFeedbackConstants.FORM_FAILURE,
      error,
    };
  };
  return async (dispatch) => {
    dispatch(request());
    try {
      const requestedForm = await formServices.getFormById(TEMP_FORM_ID);
      dispatch(success(requestedForm));
      dispatch(alertActions.success('Got the form'));
    } catch (error) {
      dispatch(failure(error.toString()));
    }
  };
};

export const SubmitFeedback = {
  getData,
};
