import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, Row, Col,
} from 'reactstrap';

import ClassSummaryCard from '../ClassSummaryCard';

const allLastClassesSummary = [
  {
    className: 'ES6',
    studentFeedbackRatio: '18/23',
    highestRatedTopic: 'let vs const',
    highestRatedTopicApproval: '96%',
    lowestRatedTopic: 'Generators',
    lowestRatedTopicApproval: '66%',
    revisionRequests: 5,
  },
  {
    className: 'Browsers',
    studentFeedbackRatio: '18/23',
    highestRatedTopic: 'DOM Tree',
    highestRatedTopicApproval: '88%',
    lowestRatedTopic: 'HTML Parser',
    lowestRatedTopicApproval: '53%',
    revisionRequests: 2,
  },
  {
    className: 'React',
    studentFeedbackRatio: '18/23',
    highestRatedTopic: 'State',
    highestRatedTopicApproval: '76%',
    lowestRatedTopic: 'React Life Cycle',
    lowestRatedTopicApproval: '73%',
    revisionRequests: 0,
  },
];

const classSummaryList = allLastClassesSummary.map((lastClass) => {
  return <ClassSummaryCard classData={lastClass} />;
});

class DashboardPage extends React.Component {
  render() {
    const dashBoardStatusMessage = 'Hey, your classes have 78% positive feedback';
    return (
      <Container>
        <Row>
          <Col
            sm="12"
            md="12"
            lg="12"
            xl="12"
            className="mx-auto text-center"
          >
            <DashboardStatusMessage message={dashBoardStatusMessage} />
          </Col>
        </Row>
        <Row>
          <Col
            xs="12"
            sm="12"
            md="8"
            lg="8"
            xl="8"
            className="mx-auto"
          >
            {classSummaryList}
          </Col>
        </Row>
      </Container>
    );
  }
}

const DashboardStatusMessage = (props) => {
  const { message } = props;
  return (
    <h4>
      {message}
      <span>
        - Pretty Amazing!
      </span>
      <span role="img" aria-label="Thumbs Up!">
        👍🏻
      </span>
    </h4>
  );
};

DashboardStatusMessage.defaultProps = {
  message: null,
};

DashboardStatusMessage.propTypes = {
  message: PropTypes.string,
};

export default DashboardPage;
