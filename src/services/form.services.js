import { BACKEND_URL } from '../constants/auth.constant';
import { routes } from '../constants/routes';
import { defaultOptions } from '../helpers/auth-header';


const generateParams = () => ({
  method: 'GET',
  headers: { 'Content-Type': 'application/json', ...defaultOptions },
});

const getFormById = async (formId) => {
  const requestParams = generateParams();
  const result = await fetch(`${BACKEND_URL}${routes.Authentication}${routes.FormById}/${formId}`, requestParams);
  const formdetails = await result.json();
  if (formdetails.error) {
    throw formdetails.error;
  }
  return formdetails;
};

export const formServices = {
  getFormById,
};
