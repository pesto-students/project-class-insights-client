/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import ReactTable from 'react-table';
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';

import { FRONTEND_URL, BACKEND_URL } from '../../constants/auth.constant';

import { defaultOptions } from '../../helpers/auth-header';

class BatchesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selectedBatch: {
        batchID: '',
        status: null,
        students: null,
        startDate: '',
      },
      data: [],
    };
    this.manageBatch = this.manageBatch.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  async componentWillMount() {
    const reqParams = { headers: { 'Content-Type': 'application/json', ...defaultOptions } };
    const response = await fetch(`${BACKEND_URL}/users/batches`, reqParams);
    const batchData = await response.text();
    const rawData = JSON.parse(batchData).Batches;
    const mapped = rawData.map((val) => {
      const remappedValues = {
        batchID: val.batchId,
        status: val.status ? 1 : 0,
        students: val.studentCount,
        startDate: (new Date(val.from)).toISOString().split('T')[0],
        endDate: (new Date(val.to)).toISOString().split('T')[0],
        details: `${FRONTEND_URL}/batchdetails?batchId=${val._id}&batchName=${val.batchId}`,
      };
      return remappedValues;
    });
    this.setState({ data: mapped });
  }

  toggleModal() {
    this.setState(previousState => ({
      modal: !previousState.modal,
    }));
  }

  manageBatch(batch) {
    this.setState(() => ({
      selectedBatch: batch,
    }));
    this.toggleModal();
  }

  render() {
    const { data } = this.state;
    const columns = [
      {
        Header: 'Batch ID',
        accessor: 'batchID',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: row => (
          <span>
            <span style={{
              color: row.value === 0 ? '#ff2e00' : '#57d500',
              transition: 'all .3s ease',
            }}
            >
              &#x25cf;
            </span>
            {
              row.value === 0 ? ' Inactive' : ' Active'
            }
          </span>
        ),
      },
      {
        Header: 'Students',
        accessor: 'students',
      },
      {
        Header: 'Start Date',
        accessor: 'startDate',
      },
      {
        Header: 'End Date',
        accessor: 'endDate',
      },
      {
        Header: () => (
          <ActionHeader onClick={this.toggleModal} />
        ),
        accessor: 'batchID',
        Cell: row => (
          <Row className="align-items-center">
            <Button
              type="button"
              onClick={() => this.manageBatch(row.original)}
              size="sm"
              className="mx-auto"
            >
              Manage
            </Button>
          </Row>
        ),
      },
      {
        Header: 'Details',
        accessor: 'details',
        Cell: row => (
          <Row className="align-items-center">
            <Button
              type="button"
              href={row.value}
              size="sm"
              className="mx-auto"
            >
                Batch Details
            </Button>
          </Row>
        ),
      },
    ];
    const {
      modal,
      selectedBatch,
    } = this.state;
    const { className } = this.props;
    return (
      <Container>
        <Row className="align-items-center h-100">
          <Col className="mx-auto">
            <h2 className="text-center">
              Batches List
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <ReactTable
              data={data}
              columns={columns}
              defaultPageSize={5}
              className="-striped -highlight"
            />
          </Col>
        </Row>
        <BatchesModal
          isOpen={modal}
          toggleModalFunction={this.toggleModal}
          className={className}
          batchDetails={selectedBatch}
        />
        <br />
        <Button
          type="button"
          className="btn btn-primary btn-block"
          href="/add"
        >
          Add Batch
        </Button>
      </Container>
    );
  }
}

const ActionHeader = () => (
  <span>
    Action
  </span>
);

const BatchesModal = (props) => {
  const {
    isOpen,
    toggleModalFunction,
    className,
    batchDetails,
  } = props;
  return (
    <Modal isOpen={isOpen} toggle={toggleModalFunction} className={className}>
      <Form>
        <ModalHeader toggle={toggleModalFunction}>
          <Row>
            <Col>
              Batch Information
            </Col>
          </Row>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              {'Batch Name'}
            </Col>
            <Col>
              <Input type="text" defaultValue={batchDetails.batchID} />
            </Col>
          </Row>
          <Row>
            <Col>
              {'Status'}
            </Col>
            <Col>
              <Input type="text" defaultValue={batchDetails.status} />
            </Col>
          </Row>
          <Row>
            <Col>
              {'Students'}
            </Col>
            <Col>
              <Input type="text" defaultValue={batchDetails.students} disabled />
            </Col>
          </Row>
          <Row>
            <Col>
              {'Start Date'}
            </Col>
            <Col>
              <Input type="date" defaultValue={batchDetails.startDate} />
            </Col>
          </Row>
          <Row>
            <Col>
              {'End Date'}
            </Col>
            <Col>
              <Input type="date" defaultValue={batchDetails.endDate} />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="Submit" onClick={toggleModalFunction}>
            Save changes
          </Button>
          <Button color="secondary" onClick={toggleModalFunction}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

BatchesPage.defaultProps = {
  className: null,
};

BatchesPage.propTypes = {
  className: PropTypes.string,
};

BatchesModal.defaultProps = {
  isOpen: false,
  toggleModalFunction: null,
  UpdateBatchFunction: null,
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

export default BatchesPage;
