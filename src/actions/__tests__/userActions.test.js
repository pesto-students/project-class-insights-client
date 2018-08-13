import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import localStorage from 'mock-local-storage';

import { userActions } from '../index';
import { userConstants, alertConstants } from '../../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const user = {
  email: 'random@example.com ',
  password: 'password',
};

const newUser = {
  email: 'random@example.com ',
  password: 'password',
  name: 'random',
};

const response = {
  success: 'login success',
  token: '',
};
const error = 'Cannot read property \'token\' of null';

describe('Testing User Action', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  test('Testing login action action', async () => {
    fetchMock.postOnce('*', response);
    const expectedActions = [
      { type: userConstants.LOGIN_REQUEST, user: { username: user } },
      { type: userConstants.LOGIN_SUCCESS, user: response },
      { type: userConstants.LOGIN_FAILURE, error },
      { type: alertConstants.ERROR, message: 'Cannot read property \'token\' of null' },
    ];
    const store = mockStore({ form: {}, localStorage });

    return store.dispatch(userActions.login(user)).then(() => {
      const action = store.getActions();
      expect(action).toEqual(expectedActions);
    });
  });

  test('Testing register action', async () => {
    fetchMock.postOnce('*', response);
    const expectedActions = [
      { type: userConstants.REGISTER_REQUEST, user: newUser },
      { type: userConstants.REGISTER_SUCCESS, user: response },
      { type: alertConstants.SUCCESS, message: 'Registration Done' },
    ];
    const store = mockStore({ form: {}, localStorage });

    return store.dispatch(userActions.register(newUser)).then(() => {
      const action = store.getActions();
      expect(action).toEqual(expectedActions);
    });
  });
});
