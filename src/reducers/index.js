import { combineReducers } from 'redux';

import { feedbackSubmission } from './studentFeedback.reducer';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  feedbackSubmission,
});

export default rootReducer;
