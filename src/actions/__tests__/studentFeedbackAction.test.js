import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import localStorage from 'mock-local-storage';

import { SubmitFeedback } from '../index';
import { StudentFeedbackConstants, alertConstants } from '../../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const form = {
  subject: 'some subject',
  topic: 'someTopic',
  subtopic: [],
};

describe('Testing Student Feedback Action', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  test('Testing Get form action', async () => {
    fetchMock.getOnce('*', form);
    const expectedActions = [
      { type: StudentFeedbackConstants.FORM_REQUEST },
      { type: StudentFeedbackConstants.FORM_SUCCESS, requestedForm: form },
      { type: alertConstants.SUCCESS, message: 'Got the form' },
    ];
    const store = mockStore({ form: {}, localStorage });

    return store.dispatch(SubmitFeedback.getData('someid')).then(() => {
      const action = store.getActions();
      expect(action).toEqual(expectedActions);
    });
  });
});
