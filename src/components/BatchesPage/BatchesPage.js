/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import ReactTable from 'react-table';

import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { BACKEND_URL } from '../../constants/auth.constant';

import { defaultOptions } from '../../helpers/auth-header';

import BatchesModal from './modalComponent';
import Loader from '../Loader';
import { dataTest } from '../../constants/dataTest.constants';

class BatchesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
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
    this.updateBatchInfo = this.updateBatchInfo.bind(this);
  }

  async componentWillMount() {
    this.setState(() => ({
      isLoading: true,
    }));
    const reqParams = { headers: { 'Content-Type': 'application/json', ...defaultOptions } };
    const response = await fetch(`${BACKEND_URL}/users/batches`, reqParams);
    const batchData = await response.text();
    this.setState(() => ({
      isLoading: false,
    }));
    const rawData = JSON.parse(batchData).Batches;
    const mapped = rawData.map((val) => {
      const remappedValues = {
        batchID: val.batchId,
        status: val.status ? 1 : 0,
        students: val.studentCount,
        startDate: (new Date(val.from)).toISOString().split('T')[0],
        endDate: (new Date(val.to)).toISOString().split('T')[0],
        details: `/batchdetails?batchId=${val._id}&batchName=${val.batchId}`,
      };
      return remappedValues;
    });
    this.setState(() => ({
      data: mapped,
    }));
  }

  toggleModal() {
    this.setState(previousState => ({
      modal: !previousState.modal,
    }));
  }

  updateBatchInfo() {
    this.toggleModal();
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
            <NavLink to={row.value} className=" mx-auto btn btn-secondary btn-sm">
              Batch Details
            </NavLink>
          </Row>
        ),
      },
    ];
    const {
      modal,
      selectedBatch,
      isLoading,
    } = this.state;
    const { className } = this.props;

    if (isLoading) {
      return (
        <Loader />
      );
    }

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
          submitModalFunction={this.updateBatchInfo}
          className={className}
          batchDetails={selectedBatch}
        />
        <Row className="mt-3">
          <Col>
            <NavLink to="/addBatch" className=" mx-auto btn btn-primary btn-block" data-test={dataTest.addBatchButton}>
              Add Batch
            </NavLink>
          </Col>
        </Row>
      </Container>
    );
  }
}

const ActionHeader = () => (
  <span>
    Action
  </span>
);

BatchesPage.defaultProps = {
  className: null,
};

BatchesPage.propTypes = {
  className: PropTypes.string,
};

export default BatchesPage;
