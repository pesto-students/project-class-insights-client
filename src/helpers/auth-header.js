import { SESSION_STORAGE_KEY } from '../constants/auth.constant';

function authHeader() {
  const user = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
}

export const defaultOptions = authHeader();
