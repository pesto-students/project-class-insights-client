import { userConstants } from '../../constants';
import { registration } from '../registration.reducer';

describe('Registration Reducer', () => {
  test('check initiation of state', () => {
    const currentState = undefined;
    const actionObject = {};

    const actual = registration(currentState, actionObject);
    const expected = {};
    expect(actual).toEqual(expected);
  });
  test('check register_request', () => {
    const currentState = {};
    const actionObject = { type: userConstants.REGISTER_REQUEST };

    const actual = registration(currentState, actionObject);
    const expected = { registering: true };

    expect(actual).toEqual(expected);
  });
  test('check register_success', () => {
    const currentState = {};
    const actionObject = { type: userConstants.REGISTER_SUCCESS, user: { email: 'adi@example.com' } };

    const actual = registration(currentState, actionObject);
    const expected = { isRegistered: true, email: 'adi@example.com', registering: false };

    expect(actual).toEqual(expected);
  });
  test('check register_failure', () => {
    const currentState = {};
    const actionObject = { type: userConstants.REGISTER_FAILURE };

    const actual = registration(currentState, actionObject);
    const expected = { isRegistered: false, registering: false };

    expect(actual).toEqual(expected);
  });
});
