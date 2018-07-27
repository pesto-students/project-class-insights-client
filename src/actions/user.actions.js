import { userConstants } from '../constants';
import { userService } from '../services';
import { history } from '../helpers/history';
import { alertActions } from './alert.actions';
import { decodeAuthToken } from '../helpers/decodeAuthToken';
import { SESSION_STORAGE_KEY } from '../constants/auth.constant';

const login = (username, password) => {
  const request = (user) => {
    return {
      type: userConstants.LOGIN_REQUEST,
      user,
    };
  };

  const success = (user) => {
    return {
      type: userConstants.LOGIN_SUCCESS,
      user,
    };
  };

  const failure = (error) => {
    return {
      type: userConstants.LOGIN_FAILURE,
      error,
    };
  };
  return async (dispatch) => {
    dispatch(request({
      username,
    }));

    try {
      const user = await userService.login(username, password);
      dispatch(success(user));
      const { token } = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY));
      const userData = decodeAuthToken(token);
      if (userData.isInstructor === true) {
        history.push('/dashboard');
      } else {
        history.push('/submitFeedback');
      }
      return true;
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
      return error.toString();
    }
  };
};

const logout = () => {
  userService.logout();
  return {
    type: userConstants.LOGOUT,
  };
};


const register = (email, password) => {
  const request = (user) => {
    return {
      type: userConstants.REGISTER_REQUEST,
      user,
    };
  };

  const success = (user) => {
    return {
      type: userConstants.REGISTER_SUCCESS,
      user,
    };
  };

  const failure = (error) => {
    return {
      type: userConstants.REGISTER_FAILURE,
      error,
    };
  };
  return async (dispatch) => {
    dispatch(request(email));
    try {
      const user = await userService.register(email, password);
      dispatch(success(user));
      dispatch(alertActions.success('Registration Done'));
      return true;
    } catch (error) {
      dispatch(failure(error.toString()));
      dispatch(alertActions.error(error.toString()));
      return error.toString();
    }
  };
};


export const userActions = {
  login,
  logout,
  register,
};
