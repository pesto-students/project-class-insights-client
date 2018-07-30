import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Row, Col, Card, CardBody, Collapse, Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

class ClassSummaryCard extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      modal: false,
    };
    this.classData = props.classData;
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggle() {
    this.setState(previousState => ({
      collapse: !previousState.collapse,
    }));
  }

  toggleModal() {
    this.setState(previousState => ({
      modal: !previousState.modal,
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
    const { classData, toggleModal } = this;
    const { collapse, modal } = this.state;
    const { className } = this.props;
    let Comments;
    if (classData && classData.fullData && classData.fullData.comments) {
      Comments = classData.fullData.comments.map(comment => (
        <Row>
          <Col>
            {' - '}
            { comment }
          </Col>
        </Row>
      ));
    } else {
      return null;
    }

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
                {/* <DashboardChart /> */}
              </Col>
            </Row>
          </CardBody>
          <Row>
            <Col className="text-center">
              <Button color="primary" onClick={this.toggleModal} lectureDetails={classData}>
                Click here to see detailed insights
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Modal
                isOpen={modal}
                toggle={toggleModal}
                className={className}
              >
                <ModalHeader toggle={this.toggleModal}>
                  Detailed Insights
                </ModalHeader>
                <ModalBody>
                  {/* {JSON.stringify(classData.fullData)} */}

                  <Row>
                    <Col
                      sm="8"
                      md="8"
                      lg="8"
                      xl="8"
                    >
                      Lecture Name:
                    </Col>
                    <Col
                      sm="4"
                      md="4"
                      lg="4"
                      xl="4"
                    >
                      {classData.className}
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      sm="8"
                      md="8"
                      lg="8"
                      xl="8"
                    >
                      Received Feedbacks:
                    </Col>
                    <Col
                      sm="4"
                      md="4"
                      lg="4"
                      xl="4"
                    >
                      {classData.studentFeedbackRatio}
                    </Col>
                  </Row>

                  <Row>
                    <Col
                      sm="8"
                      md="8"
                      lg="8"
                      xl="8"
                    >
                      Highest Rated Topic:
                    </Col>
                    <Col
                      sm="4"
                      md="4"
                      lg="4"
                      xl="4"
                    >
                      {classData.highestRatedTopic}
                    </Col>
                  </Row>

                  <Row>
                    <Col
                      sm="8"
                      md="8"
                      lg="8"
                      xl="8"
                    >
                      Highest Rated Topic Approval:
                    </Col>
                    <Col
                      sm="4"
                      md="4"
                      lg="4"
                      xl="4"
                    >
                      {classData.highestRatedTopicApproval}
                    </Col>
                  </Row>

                  <Row>
                    <Col
                      sm="8"
                      md="8"
                      lg="8"
                      xl="8"
                    >
                      Lowest Rated Topic:
                    </Col>
                    <Col>
                      {classData.lowestRatedTopic}
                    </Col>
                  </Row>

                  <Row>
                    <Col
                      sm="8"
                      md="8"
                      lg="8"
                      xl="8"
                    >
                      Lowest Rated Topic Approval:
                    </Col>
                    <Col>
                      {classData.lowestRatedTopicApproval}
                    </Col>
                  </Row>

                  <Row>
                    <Col
                      sm="8"
                      md="8"
                      lg="8"
                      xl="8"
                    >
                      Revision Requests:
                    </Col>
                    <Col
                      sm="4"
                      md="4"
                      lg="4"
                      xl="4"
                    >
                      {classData.revisionRequests}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <h5>
                        Comments
                      </h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {Comments}
                    </Col>
                  </Row>


                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggleModal}>
                    OK
                  </Button>
                  {' '}
                  <Button color="secondary" onClick={toggleModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </Col>
          </Row>
        </Collapse>
      </Card>
    );
  }
}

ClassSummaryCard.defaultProps = {
  className: null,
  classData: {
    className: null,
    studentFeedbackRatio: null,
    highestRatedTopic: null,
    highestRatedTopicApproval: null,
    lowestRatedTopic: null,
    lowestRatedTopicApproval: null,
    revisionRequests: null,
  },
};

ClassSummaryCard.propTypes = {
  className: PropTypes.string,
  classData: PropTypes.exact({
    className: PropTypes.string,
    studentFeedbackRatio: PropTypes.string,
    highestRatedTopic: PropTypes.string,
    highestRatedTopicApproval: PropTypes.string,
    lowestRatedTopic: PropTypes.string,
    lowestRatedTopicApproval: PropTypes.string,
    revisionRequests: PropTypes.number,
  }),
};

export default ClassSummaryCard;
