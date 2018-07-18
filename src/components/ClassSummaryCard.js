import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Row, Col, Card, CardBody, Collapse, Button,
} from 'reactstrap';


import { routes } from '../constants';

import DashboardChart from './Charts/dashboard.chart';

class ClassSummaryCard extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
    this.classData = props.classData;
  }

  toggle() {
    this.setState(previousState => ({
      collapse: !previousState.collapse,
    }));
  }

  /*
   * Following is the structure of classData:
   *
  {
    className,
    studentFeedbackRatio,
    highestRatedTopic,
    highestRatedTopicApproval,
    lowestRatedTopic,
    lowestRatedTopicApproval,
    revisionRequests,
  }
  */

  render() {
    const { classData } = this;
    const { collapse } = this.state;
    return (
      <Card className="mx-auto">
        <Row>
          <Col className="text-center my-2">
            <h5 className="text-info">
              <Button color="primary" className="fake-btn" block type="button" onClick={this.toggle}>
                Lecture Subject -&nbsp;
                {classData.className}
              </Button>
            </h5>
          </Col>
        </Row>
        <Collapse isOpen={collapse}>
          <CardBody>
            <Row>
              <Col
                sm="8"
                md="8"
                lg="8"
                xl="7"
              >
                <Row>
                  <Col className="my-2">
                    Received feedback from:
                  </Col>
                  <Col className="my-2">
                    <strong>
                      {classData.studentFeedbackRatio}
                    </strong>
                    &nbsp;
                    Students
                  </Col>
                </Row>
                <Row>
                  <Col className="my-2">
                    Highest rated topic:
                  </Col>
                  <Col className="my-2">
                    <strong>
                      {classData.highestRatedTopic}
                    </strong>
                    &nbsp;
                    <span className="text-success">
                      (
                      {classData.highestRatedTopicApproval}
                      )
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col className="my-2">
                    Lowest rated topic:
                  </Col>
                  <Col className="my-2">
                    <strong>
                      {classData.lowestRatedTopic}
                    </strong>
                    &nbsp;
                    <span className="text-warning">
                      (
                      {classData.lowestRatedTopicApproval}
                      )
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    Received &nbsp;
                    {classData.revisionRequests}
                    &nbsp;
                    revision requests.
                  </Col>
                </Row>
              </Col>
              <Col
                sm="4"
                md="4"
                lg="4"
                xl="5"
              >
                {/* Using a dummy image fow now, would be replaced with a chart later */}
                <DashboardChart />
              </Col>
            </Row>
          </CardBody>
          <Row>
            <Col className="text-center">
              <NavLink to={routes.ClientFeedBackForm}>
                Click here to see detailed insights.
              </NavLink>
            </Col>
          </Row>
        </Collapse>
      </Card>
    );
  }
}

ClassSummaryCard.defaultProps = {
  classData: {},
};

ClassSummaryCard.propTypes = {
  classData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
};

export default ClassSummaryCard;
