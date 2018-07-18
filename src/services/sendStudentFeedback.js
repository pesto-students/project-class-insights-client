
const sendStudentFeedback = async (formData, requestedForm) => {
  const myform = JSON.parse(JSON.stringify(requestedForm));
  myform.subtopics.map((subtopic, i) => {
    myform.subtopics[i].rating = formData[`rating${i}`];
    return subtopic;
  });

  myform.comments = formData.comment;
  const reqParams = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...myform,
    }),
  };
  const result = await fetch('https://classinsight-new.herokuapp.com/submitfeedback', reqParams);
  const response = await result.json();
  return response;
};

export const studentFeedbackServices = {
  sendStudentFeedback,
};
