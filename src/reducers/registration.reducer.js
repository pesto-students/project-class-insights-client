import { userConstants } from '../constants';

export const registration = (state = {}, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return { registering: false, isRegistered: true, email: action.user.email };
    case userConstants.REGISTER_FAILURE:
      return { registering: false, isRegistered: false };
    default:
      return state;
  }
};
