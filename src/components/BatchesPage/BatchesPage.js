/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import ReactTable from 'react-table';

import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import BatchesModal from './modalComponent';
import Loader from '../Loader';
import { dataTest } from '../../constants/dataTest.constants';
import { instructorService } from '../../services/instructor.services';
import { batchService } from '../../services/batches.services';

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
    this.fetchAndRenderBatches = this.fetchAndRenderBatches.bind(this);
    this.editBatch = this.editBatch.bind(this);
    this.deleteBatch = this.deleteBatch.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.updateBatchInfo = this.updateBatchInfo.bind(this);
  }

  async componentWillMount() {
    this.fetchAndRenderBatches();
  }

  async fetchAndRenderBatches() {
    this.setState(() => ({
      isLoading: true,
    }));
    const mapped = await batchService.getBatches();
    this.setState(() => ({
      isLoading: false,
    }));

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

  editBatch(batch) {
    this.setState(() => ({
      selectedBatch: batch,
    }));
    this.toggleModal();
  }

  async deleteBatch(batchID) {
    this.setState(() => ({
      isLoading: true,
    }));
    try {
      const response = await instructorService.deleteBatch(batchID);
      this.fetchAndRenderBatches();
      this.setState(() => ({
        response: response.success,
        isLoading: false,
      }));
    } catch (error) {
      this.setState(() => ({
        response: 'Could not delete batch',
        isLoading: false,
      }));
    }
  }

  render() {
    const { data } = this.state;
    const columns = [
      {
        Header: 'Batch ID',
        accessor: 'batchID',
        Cell: row => (
          <span>
            <NavLink to={row.original.details}>
              {row.value}
            </NavLink>
          </span>
        ),
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
          <ButtonGroup className="align-items-center">
            <Button
              type="button"
              onClick={() => this.editBatch(row.original)}
              size="sm"
              className="btn-primary"
            >
              Edit
            </Button>
            <Button
              type="button"
              onClick={() => this.deleteBatch(row.value)}
              size="sm"
              className="btn-danger"
            >
              Delete
            </Button>
            <NavLink to={row.original.details} className=" mx-auto btn btn-success btn-sm">
              Batch Details
            </NavLink>
          </ButtonGroup>
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
        {data.length > 0 ? (
          <div>
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
          </div>
        )
          : (
            <Row className="mt-5">
              <Col>
                <h3 className="text-center">
                  You have not created any batches yet
                </h3>
              </Col>
            </Row>
          )
        }
        <Row className="mt-3">
          <Col>
            <NavLink to="/addBatch" className=" mx-auto btn btn-primary btn-block" data-test={dataTest.addBatchButton}>
              Create a new Batch
            </NavLink>
          </Col>
        </Row>
        <BatchesModal
          isOpen={modal}
          toggleModalFunction={this.toggleModal}
          submitModalFunction={this.updateBatchInfo}
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

BatchesPage.defaultProps = {
  className: null,
};

BatchesPage.propTypes = {
  className: PropTypes.string,
};

export default BatchesPage;
