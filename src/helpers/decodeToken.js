
import jwtDecode from 'jwt-decode';

export const decodeToken = (token) => {
  if (token === '' || token === undefined) {
    return '';
  }
  return jwtDecode(token);
};
