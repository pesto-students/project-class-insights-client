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
import { instructorService } from '../../services/instructor.services';

class BatchesModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: '',
      oldBatchId: '',
      form: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBatchIDChange = this.handleBatchIDChange.bind(this);
    this.handleBatchStatusChange = this.handleBatchStatusChange.bind(this);
    this.handleBatchEndDateChange = this.handleBatchEndDateChange.bind(this);
  }

  handleBatchIDChange(event, batchDetails) {
    event.persist();
    this.setState(prevState => ({
      ...prevState,
      oldBatchId: batchDetails.batchID,
      form: {
        ...batchDetails,
        ...prevState.form,
        batchID: event.target.value,
      },
    }));
  }

  handleBatchStatusChange(event, batchDetails) {
    event.persist();
    this.setState(prevState => ({
      ...prevState,
      oldBatchId: batchDetails.batchID,
      form: {
        ...batchDetails,
        ...prevState.form,
        status: Number(event.target.value),
      },
    }));
  }

  handleBatchStartDateChange(event, batchDetails) {
    event.persist();
    this.setState(prevState => ({
      ...prevState,
      oldBatchId: batchDetails.batchID,
      form: {
        ...batchDetails,
        ...prevState.form,
        startDate: event.target.value,
      },
    }));
  }

  handleBatchEndDateChange(event, batchDetails) {
    event.persist();
    this.setState(prevState => ({
      ...prevState,
      oldBatchId: batchDetails.batchID,
      form: {
        ...batchDetails,
        ...prevState.form,
        endDate: event.target.value,
      },
    }));
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { form, oldBatchId } = this.state;
    form.oldBatchId = oldBatchId;
    try {
      const response = await instructorService.editBatch(form);
      this.setState({ response: response.success });
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
                  onChange={event => this.handleBatchIDChange(event, batchDetails)}
                  defaultValue={batchDetails.batchID}
                  required
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
                  onChange={event => this.handleBatchStatusChange(event, batchDetails)}
                  defaultValue={batchDetails.status}
                  required
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
                  onChange={event => this.handleBatchStartDateChange(event, batchDetails)}
                  defaultValue={batchDetails.startDate}
                  required
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
                  onChange={event => this.handleBatchEndDateChange(event, batchDetails)}
                  defaultValue={batchDetails.endDate}
                  required
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" type="submit">
              Save changes
            </Button>
            <Button color="danger" onClick={toggleModalFunction}>
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
