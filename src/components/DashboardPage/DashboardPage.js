import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, Row, Col,
} from 'reactstrap';

import ClassSummaryCard from '../ClassSummaryCard';
import { defaultOptions } from '../../helpers/auth-header';
import { BACKEND_URL } from '../../constants/auth.constant';
import { dataTest } from '../../constants/dataTest.constants';
import Loader from '../Loader';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classSummaryList: null,
      isLoading: false,
    };
  }

  async componentWillMount() {
    this.setState(() => ({
      isLoading: true,
    }));
    const reqParams = { headers: { 'Content-Type': 'application/json', ...defaultOptions } };
    const result = await fetch(`${BACKEND_URL}/users/dashboard`, reqParams);
    const rawData = await result.json();

    this.setState(() => ({
      isLoading: false,
    }));

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

    const allLastClassesSummary = remapped;

    const SummaryList = allLastClassesSummary.map((lastClass) => {
      return <ClassSummaryCard classData={lastClass} />;
    });
    this.setState({
      classSummaryList: SummaryList,
    });
  }

  render() {
    const { classSummaryList, isLoading } = this.state;
    const dashBoardStatusMessage = 'Hey, your classes have mostly positive feedback';
    if (isLoading) {
      return (
        <Loader />
      );
    }
    return (
      <Container data-test={dataTest.dashboard}>
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
