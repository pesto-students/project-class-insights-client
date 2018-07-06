import { userConstants } from '../constants';
import { userService } from '../services';
import { history } from '../helpers/history';
import { alertActions } from './alert.actions';

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
      history.push('/');
      return true;
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
      return false;
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
      history.push('/login');
      dispatch(alertActions.success('Registeration Done'));
    } catch (error) {
      dispatch(failure(error.toString()));
      dispatch(alertActions.error(error.toString()));
    }
  };
};


export const userActions = {
  login,
  logout,
  register,
};
