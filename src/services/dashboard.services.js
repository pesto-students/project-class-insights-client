import { defaultOptions } from '../helpers/auth-header';
import { BACKEND_URL } from '../constants/auth.constant';

const dashboardData = async () => {
  const reqParams = { headers: { 'Content-Type': 'application/json', ...defaultOptions } };
  const result = await fetch(`${BACKEND_URL}/users/dashboard`, reqParams);
  const rawData = await result.json();

  const remapped = rawData.map((val) => {
    if (val && val !== null && val !== undefined && val.averageRatings) {
      const keysSorted = Object.keys(val.averageRatings).sort((a, b) => {
        return val.averageRatings[a] - val.averageRatings[b];
      });
      const remappedValue = {
        className: val.subject,
        studentFeedbackRatio: val.feedbackCounts,
        highestRatedTopic: keysSorted[keysSorted.length - 1],
        highestRatedTopicApproval: val.averageRatings[keysSorted[keysSorted.length - 1]],
        lowestRatedTopic: keysSorted[0],
        lowestRatedTopicApproval: val.averageRatings[keysSorted[0]],
        revisionRequests: val.revisitCount,
        fullData: val,
      };
      return remappedValue;
    }
    return null;
  });
  return remapped;
};

export const dashboardService = {
  dashboardData,
};
