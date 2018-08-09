/* eslint no-underscore-dangle: 0 */
import { BACKEND_URL } from '../constants/auth.constant';
import { defaultOptions } from '../helpers/auth-header';


const getStudents = async (batchId) => {
  const reqParams = { headers: { 'Content-Type': 'application/json', ...defaultOptions } };
  const studentResponse = await fetch(`${BACKEND_URL}/users/students/${batchId}`, reqParams);
  const rawStudentData = await studentResponse.json();
  const remappedStudents = rawStudentData.map((val, index) => {
    const remap = {
      _id: index,
      name: val.name ? val.name : 'Student yet to register',
      email: val.email,
    };
    return remap;
  });
  return remappedStudents;
};

const getForms = async () => {
  const reqParams = { headers: { 'Content-Type': 'application/json', ...defaultOptions } };
  const response = await fetch(`${BACKEND_URL}/users/getForm`, reqParams);
  const formData = await response.json();
  const mapped = formData.map((val) => {
    if (val.batchId !== null) {
      const remappedValues = {
        batchId: val.batchId.batchId,
        subject: val.subject,
        topic: val.topic,
        date: (new Date(val.creationDate)).toISOString().split('T')[0],
        giveFeedback: `/submitFeedback?formID=${val._id}`,
      };
      return remappedValues;
    }
    return null;
  });
  const filtered = mapped.filter(val => val !== null);
  return filtered;
};

const addStudent = async (formData) => {
  const reqParams = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...defaultOptions },
    body: JSON.stringify({
      ...formData,
    }),
  };
  const response = await fetch(`${BACKEND_URL}/users/students`, reqParams);
  const result = await response.json();
  return result;
};

export const studentService = {
  getStudents,
  getForms,
  addStudent,
};
