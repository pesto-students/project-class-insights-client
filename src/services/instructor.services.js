import { BACKEND_URL } from '../constants/auth.constant';
import { routes } from '../constants/routes';
import { defaultOptions } from '../helpers/auth-header';

const generateParams = data => ({
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json', ...defaultOptions },
  body: JSON.stringify({
    ...data,
  }),
});

const getResponse = async (response) => {
  const text = await response.text();
  let data;
  if (text) {
    data = JSON.parse(text);
    return data;
  }
  return false;
};

const editBatch = async (batchData) => {
  const requestParams = generateParams(batchData);
  const result = await fetch(`${BACKEND_URL}${routes.Authentication}${routes.BackEndEditBatches}`, requestParams);
  const data = await getResponse(result);
  if (data.error) {
    console.log('error at edit');
  }
  return data;
};

const deleteBatch = async (batchId) => {
  const requestBody = {
    batchId,
  };

  const requestParams = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...defaultOptions },
    body: JSON.stringify({
      ...requestBody,
    }),
  };

  const result = await fetch(`${BACKEND_URL}${routes.Authentication}${routes.BatchesPage}`, requestParams);
  const data = await getResponse(result);
  if (data.error) {
    console.log('error deleting batch');
  }
  return data;
};

export const instructorService = {
  editBatch,
  deleteBatch,
};
