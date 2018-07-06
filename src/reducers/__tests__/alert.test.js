import { alert } from '../alert.reducer';
import { alertConstants } from '../../constants';

describe('handling alerts', () => {
  test('handling undefined in the state', () => {
    const currentState = undefined;
    const actionObject = {};

    const actual = alert(currentState, actionObject);
    const expected = {};
    expect(actual).toEqual(expected);
  });
  test('alert about success', () => {
    const currentState = {};
    const actionObject = { type: alertConstants.SUCCESS, message: 'Passed the message' };

    const actual = alert(currentState, actionObject);
    const expected = { type: 'alert-success', message: 'Passed the message' };

    expect(actual).toEqual(expected);
  });

  test('alert for the error', () => {
    const currentState = {};
    const actionObject = { type: alertConstants.ERROR, message: 'message for the error comes here' };

    const actual = alert(currentState, actionObject);
    const expected = { type: 'alert-danger', message: 'message for the error comes here' };

    expect(actual).toEqual(expected);
  });
  test('passing state as it is in case of unmatched actions', () => {
    const currentState = { id: 1, name: 'error' };
    const actionObject = {};

    const actual = alert(currentState, actionObject);
    const expected = { id: 1, name: 'error' };
    expect(actual).toEqual(expected);
  });
  test('alert for the clear', () => {
    const currentState = {};
    const actionObject = { type: alertConstants.CLEAR, message: 'clear has been called' };

    const actual = alert(currentState, actionObject);
    const expected = {};
    expect(actual).toEqual(expected);
  });
});
