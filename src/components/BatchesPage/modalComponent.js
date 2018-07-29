import React, { Component } from 'react';

import {
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';

class BatchesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBatchIDChange = this.handleBatchIDChange.bind(this);
    this.handleBatchStatusChange = this.handleBatchStatusChange.bind(this);
    this.handleBatchStudentsChange = this.handleBatchStudentsChange.bind(this);
    this.handleBatchStartDateChange = this.handleBatchStartDateChange.bind(this);
    this.handleBatchEndDateChange = this.handleBatchEndDateChange.bind(this);
  }

  handleBatchIDChange(event) {
    event.persist();
    this.setState(() => ({
      batchID: event.target.value,
    }));
  }

  handleBatchStatusChange(event) {
    event.persist();
    this.setState(() => ({
      batchStatus: event.target.value,
    }));
  }

  handleBatchStudentsChange(event) {
    event.persist();
    this.setState(() => ({
      batchStudents: event.target.value,
    }));
  }

  handleBatchStartDateChange(event) {
    event.persist();
    this.setState(() => ({
      batchStartDate: event.target.value,
    }));
  }

  handleBatchEndDateChange(event) {
    event.persist();
    this.setState(() => ({
      batchEndDate: event.target.value,
    }));
  }

  async handleSubmit(event) {
    event.preventDefault();

    try {
      this.setState({ response: 'Submitted successfully' });
    } catch (error) {
      this.setState({ response: 'Submission failed' });
    }
  }

  render() {
    const {
      response,
    } = this.state;
    const {
      isOpen,
      toggleModalFunction,
      className,
      batchDetails,
    } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        toggle={toggleModalFunction}
        className={className}
      >
        <form onSubmit={this.handleSubmit}>
          <ModalHeader toggle={toggleModalFunction}>
            <Row>
              <Col>
                Batch Information
              </Col>
            </Row>
            <Row>
              <Col>
                <h4 className="form-text text-success text-center">
                  {response}
                </h4>
              </Col>
            </Row>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                Batch Name
              </Col>
              <Col>
                <Input
                  type="text"
                  name="batchID"
                  id="batchID"
                  // value={batchID}
                  onChange={this.handleBatchIDChange}
                  defaultValue={batchDetails.batchID}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {'Status'}
              </Col>
              <Col>
                <Input
                  type="text"
                  name="batchStatus"
                  onChange={this.handleBatchStatusChange}
                  defaultValue={batchDetails.status}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {'Students'}
              </Col>
              <Col>
                <Input
                  type="text"
                  name="batchStudents"
                  onChange={this.handleBatchStudentsChange}
                  defaultValue={batchDetails.students}
                  disabled
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {'Start Date'}
              </Col>
              <Col>
                <Input
                  type="date"
                  name="batchStartDate"
                  onChange={this.handleBatchStartDateChange}
                  defaultValue={batchDetails.startDate}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {'End Date'}
              </Col>
              <Col>
                <Input
                  type="date"
                  name="batchEndDate"
                  onChange={this.handleBatchEndDateChange}
                  defaultValue={batchDetails.endDate}
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Save changes
            </Button>
            <Button color="secondary" onClick={toggleModalFunction}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}


BatchesModal.defaultProps = {
  isOpen: false,
  toggleModalFunction: null,
  className: '',
  batchDetails: {},
};

BatchesModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModalFunction: PropTypes.func,
  className: PropTypes.string,
  batchDetails: PropTypes.shape({
    batchID: PropTypes.string,
    status: PropTypes.number,
    students: PropTypes.number,
    startDate: PropTypes.string,
  }),
};

export default BatchesModal;
