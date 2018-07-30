import { userConstants } from '../constants';
import { userService } from '../services';
import { history } from '../helpers/history';
import { alertActions } from './alert.actions';
import { decodeAuthToken } from '../helpers/decodeAuthToken';
import { SESSION_STORAGE_KEY, SESSION_USER_ROLE } from '../constants/auth.constant';
import { routes } from '../constants/routes';

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
        sessionStorage.setItem(SESSION_USER_ROLE, 1);
        history.push(routes.Dashboard);
      } else {
        sessionStorage.setItem(SESSION_USER_ROLE, 0);
        history.push(routes.StudentHome);
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
      const userResponse = await userService.register(email, password);
      dispatch(success(userResponse));
      dispatch(alertActions.success('Registration Done'));
      return userResponse;
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
