/* eslint no-underscore-dangle: 0 */
import { BACKEND_URL } from '../constants/auth.constant';
import { defaultOptions } from '../helpers/auth-header';

const getBatches = async () => {
  const reqParams = { headers: { 'Content-Type': 'application/json', ...defaultOptions } };
  const response = await fetch(`${BACKEND_URL}/users/batches`, reqParams);
  const batchData = await response.text();
  const rawData = JSON.parse(batchData).Batches;
  const mapped = rawData.map((val) => {
    const remappedValues = {
      batchID: val.batchId,
      status: val.status ? 1 : 0,
      students: val.studentCount,
      startDate: (new Date(val.from)).toISOString().split('T')[0],
      endDate: (new Date(val.to)).toISOString().split('T')[0],
      details: `/batchdetails?batchId=${val._id}&batchName=${val.batchId}`,
    };
    return remappedValues;
  });
  return mapped;
};

const addBatch = async (formData) => {
  const reqParams = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...defaultOptions },
    body: JSON.stringify({
      ...formData,
    }),
  };
  const response = await fetch(`${BACKEND_URL}/users/batches`, reqParams);
  const result = await response.json();
  return result;
};

const batchDetails = async (batchName) => {
  const reqParams = { headers: { 'Content-Type': 'application/json', ...defaultOptions } };
  const batchResponse = await fetch(`${BACKEND_URL}/users/batches?batchId=${batchName}`, reqParams);
  const batchData = await batchResponse.text();
  const rawData = JSON.parse(batchData).Batches[0];
  return rawData;
};

export const batchService = {
  getBatches,
  addBatch,
  batchDetails,
};
