
import { BACKEND_URL, SESSION_STORAGE_KEY, SESSION_USER_ROLE } from '../constants/auth.constant';

import { routes } from '../constants/routes';

const logout = () => {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
  window.location.reload();
};


const getResponse = async (response) => {
  const text = await response.text();
  const data = text && JSON.parse(text);
  return data;
};

const generateParams = user => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ...user,
  }),
});


const login = async (users) => {
  const requestParams = generateParams(users);
  const data = await fetch(`${BACKEND_URL}${routes.BackEndLogin}`, requestParams);
  const user = await getResponse(data);
  if (!user.success) {
    const error = (user && user.message);
    throw error;
  }
  if (user.token) {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    window.location.reload();
  }
  return user;
};

const register = async (users) => {
  const requestParams = generateParams(users);
  const result = await fetch(`${BACKEND_URL}${routes.BackEndSignUp}`, requestParams);
  const user = await getResponse(result);
  if (user.error) {
    throw user.error;
  }
  return user;
};

const isLoggedIn = () => {
  if (sessionStorage.getItem(SESSION_STORAGE_KEY)) {
    return true;
  }
  return false;
};

const isStudent = () => {
  const userRole = parseInt(sessionStorage.getItem(SESSION_USER_ROLE), 10);
  if (userRole === 0) {
    return true;
  }
  return false;
};

export const userService = {
  login,
  logout,
  register,
  isLoggedIn,
  isStudent,
};
