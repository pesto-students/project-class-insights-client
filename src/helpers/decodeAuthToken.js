
import jwtDecode from 'jwt-decode';

export const decodeAuthToken = (token) => {
  if (token === '' || token === undefined) {
    return '';
  }
  return jwtDecode(token);
};
