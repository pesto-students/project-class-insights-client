import { BACKEND_URL } from '../constants/auth.constant';
import { defaultOptions } from '../helpers/auth-header';


const getResponse = async (response) => {
  const text = await response.text();
  const data = text && JSON.parse(text);
  return data;
};

const generateParams = ({
  subject, topic, subtopics, date, batchId, subtopicsArray,
}) => {
  let newSubtopics = [];
  if (subtopicsArray) {
    const arrayOfAllSubtopicsExceptFirst = Object.keys(subtopicsArray)
      .map(item => ({ subtopicName: subtopicsArray[item] }));

    const firstElementinArray = [{ subtopicName: subtopics }];
    newSubtopics = firstElementinArray.concat(arrayOfAllSubtopicsExceptFirst);
  } else {
    newSubtopics = [{ subtopicName: subtopics }];
  }
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...defaultOptions },
    body: JSON.stringify({
      subject,
      topic,
      subtopics: newSubtopics,
      date,
      batchId,
    }),
  };
};

const sendForm = async (formData) => {
  const requestParams = generateParams(formData);
  const result = await fetch(`${BACKEND_URL}/submitform`, requestParams);
  await getResponse(result);
};

export const formService = {
  sendForm,
};
