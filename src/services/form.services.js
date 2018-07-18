import { BACKEND_URL } from '../constants/auth.constant';

const getFormById = async (formId) => {
  const result = await fetch(`${BACKEND_URL}/getFormById/${formId}`);
  const formdetails = await result.json();
  if (formdetails.error) {
    throw formdetails.error;
  }
  return formdetails;
};

export const formServices = { getFormById };
