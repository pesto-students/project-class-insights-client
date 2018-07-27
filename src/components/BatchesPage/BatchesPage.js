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
} from 'reactstrap';
import PropTypes from 'prop-types';

class BatchesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selectedBatch: {
        batchID: '',
        status: null,
        students: null,
        creationDate: '',
      },
    };
    this.manageBatch = this.manageBatch.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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
    const data = [
      {
        batchID: 'Sep-Dec-01',
        status: 1,
        students: 34,
        creationDate: '2018-07-01',
      },
      {
        batchID: 'Jun-Sep-01',
        status: 0,
        students: 14,
        creationDate: '2018-05-11',
      },
      {
        batchID: 'Sep-Dec-02',
        status: 1,
        students: 24,
        creationDate: '2018-06-21',
      },
      {
        batchID: 'Sep-Dec-01',
        status: 0,
        students: 16,
        creationDate: '2018-07-01',
      },
      {
        batchID: 'Jan-Apr-01',
        status: 0,
        students: 36,
        creationDate: '2018-10-23',
      },
    ];

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
        Header: 'Created On',
        accessor: 'creationDate',
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
            {'Batch Name - '}
            {batchDetails.batchID}
          </Col>
        </Row>
        <Row>
          <Col>
            {'status - '}
            {batchDetails.status === 0 ? 'Inactive' : 'Active' }
          </Col>
        </Row>
        <Row>
          <Col>
            {'Students - '}
            {batchDetails.students}
          </Col>
        </Row>
        <Row>
          <Col>
            {'creationDate - '}
            {batchDetails.creationDate}
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggleModalFunction}>
          Save changes
        </Button>
        <Button color="secondary" onClick={toggleModalFunction}>
          Cancel
        </Button>
      </ModalFooter>
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
    creationDate: PropTypes.string,
  }),
};

export default BatchesPage;
