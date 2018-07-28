import { BACKEND_URL } from '../constants/auth.constant';
import { defaultOptions } from '../helpers/auth-header';

const sendStudentFeedback = async (formData, requestedForm) => {
  const myform = JSON.parse(JSON.stringify(requestedForm));
  myform.subtopics.map((subtopic, i) => {
    myform.subtopics[i].rating = formData[`rating${i}`];
    return subtopic;
  });

  myform.comments = formData.comment;
  const reqParams = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...defaultOptions },
    body: JSON.stringify({
      ...myform,
    }),
  };
  const result = await fetch(`${BACKEND_URL}/users/submitfeedback`, reqParams);
  const response = await result.json();
  return response;
};

export const studentFeedbackServices = {
  sendStudentFeedback,
};
