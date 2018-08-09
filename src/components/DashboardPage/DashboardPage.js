import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, Row, Col,
} from 'reactstrap';

import ClassSummaryCard from '../ClassSummaryCard';
import { dataTest } from '../../constants/dataTest.constants';
import Loader from '../Loader';
import { dashboardService } from '../../services/dashboard.services';

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

    const remapped = await dashboardService.dashboardData();

    this.setState(() => ({
      isLoading: false,
    }));


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
