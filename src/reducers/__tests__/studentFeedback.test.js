import { StudentFeedbackConstants } from '../../constants';
import { feedbackSubmission } from '../studentFeedback.reducer';

describe('Test for Student Feedback Reducer', () => {
  test('Test for form Request', () => {
    const currentState = {};
    const actionObject = { type: StudentFeedbackConstants.FORM_REQUEST };

    const actual = feedbackSubmission(currentState, actionObject);
    const expected = {
      requestingForm: true,
    };
    expect(actual).toEqual(expected);
  });

  test('Test for form Success', () => {
    const requestedForm = {
      subject: 'Test Subject',
      topic: 'test topic',
    };
    const currentState = {};
    const actionObject = { type: StudentFeedbackConstants.FORM_SUCCESS, requestedForm };

    const actual = feedbackSubmission(currentState, actionObject);
    const expected = {
      requestedForm,
    };
    expect(actual).toEqual(expected);
  });

  test('Test for form Failure', () => {
    const currentState = {};
    const actionObject = { type: StudentFeedbackConstants.FORM_FAILURE };

    const actual = feedbackSubmission(currentState, actionObject);
    const expected = {};
    expect(actual).toEqual(expected);
  });
});
