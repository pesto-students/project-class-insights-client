import { authentication } from '../authentication.reducer';
import { userConstants } from '../../constants';


describe('authentication tester', () => {
  test('check unhandled', () => {
    const currentState = undefined;
    const actionObject = {};

    const actual = authentication(currentState, actionObject);
    const expected = {};

    expect(actual).toEqual(expected);
  });

  test('check login_request to return the right updated state', () => {
    const currentState = {};
    const actionObject = { type: userConstants.LOGIN_REQUEST, user: 'adi' };

    const actual = authentication(currentState, actionObject);
    const expected = { loggingIn: true, user: 'adi' };

    expect(actual).toEqual(expected);
  });

  test('check login_success to return the right updated state', () => {
    const currentState = {};
    const actionObject = { type: userConstants.LOGIN_SUCCESS, user: 'adi' };

    const actual = authentication(currentState, actionObject);
    const expected = { loggedIn: true, user: 'adi' };

    expect(actual).toEqual(expected);
  });

  test('check login_failure to return the right updated state', () => {
    const currentState = {};
    const actionObject = { type: userConstants.LOGIN_FAILURE, user: 'adi' };

    const actual = authentication(currentState, actionObject);
    const expected = {};
    expect(actual).toEqual(expected);
  });

  test('check login_logout to return the right updated state', () => {
    const currentState = {};
    const actionObject = { type: userConstants.LOGOUT, user: 'adi' };

    const actual = authentication(currentState, actionObject);
    const expected = { loggedIn: false };

    expect(actual).toEqual(expected);
  });
});
