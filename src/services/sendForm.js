import { BACKEND_URL } from '../constants/auth.constant';


const getResponse = async (response) => {
  const text = await response.text();
  const data = text && JSON.parse(text);
  return data;
};

const generateParams = ({
  subject, topic, subtopics, date, batchId, ...rest
}) => {
  const arrayOfAllSubtopicsExceptFirst = Object.keys(rest)
    .map(item => ({ subtopicName: rest[item] }));
  arrayOfAllSubtopicsExceptFirst.shift();
  const firstElementinArray = [{ subtopicName: subtopics }];
  const newSubtopics = firstElementinArray.concat(arrayOfAllSubtopicsExceptFirst);

  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
