import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';
import ReactTable from 'react-table';

import PropTypes from 'prop-types';

class BatchesDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const students = [
      {
        _id: 1,
        name: 'John 1',
        email: 'john1@email.com',
      },
      {
        _id: 2,
        name: 'John 2',
        email: 'john2@email.com',
      },
      {
        _id: 3,
        name: 'John 3',
        email: 'john3@email.com',
      },
      {
        _id: 4,
        name: 'John 4',
        email: 'john4@email.com',
      },
      {
        _id: 5,
        name: 'John 5',
        email: 'john5@email.com',
      },
      {
        _id: 6,
        name: 'John 6',
        email: 'john6@email.com',
      },
      {
        _id: 7,
        name: 'John 7',
        email: 'john7@email.com',
      },
    ];
    const batchDetails = {
      batchId: 'Batch 101',
      batchStartDate: '2018-01-01',
      batchStatus: 1,
      totalStudents: 23,
    };
    const {
      batchId,
      batchStartDate,
      batchStatus,
      totalStudents,
    } = batchDetails;


    const columns = [
      {
        Header: 'Student Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
    ];

    return (
      <Container>
        <Row className="align-items-center h-100">
          <Col className="mx-auto">
            <h2 className="text-center">
              Batches Info
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <BatchInfoCard
              batchId={batchId}
              batchStartDate={batchStartDate}
              batchStatus={batchStatus}
              totalStudents={totalStudents}
            />
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h2>
              Added Students
            </h2>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <ReactTable
              data={students}
              columns={columns}
              defaultPageSize={5}
              className="-striped -highlight"
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const BatchInfoCard = (props) => {
  const {
    batchId,
    batchStartDate,
    batchStatus,
    totalStudents,
  } = props;
  return (
    <Card className="mt-5 justify-content-center">
      <CardBody className="mx-0">
        <Row>
          <Col className="">
            Batch Name:
          </Col>
          <Col>
            {batchId}
          </Col>
        </Row>
        <Row>
          <Col className="">
            Batch Start Date:
          </Col>
          <Col>
            {batchStartDate}
          </Col>
        </Row>
        <Row>
          <Col className="">
            Batch Status:
          </Col>
          <Col>
            {batchStatus}
          </Col>
        </Row>
        <Row>
          <Col className="">
            Total Students:
          </Col>
          <Col>
            {totalStudents}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

BatchInfoCard.defaultProps = {
  batchId: null,
  batchStartDate: null,
  batchStatus: null,
  totalStudents: null,
};

BatchInfoCard.propTypes = {
  batchId: PropTypes.string,
  batchStartDate: PropTypes.string,
  batchStatus: PropTypes.string,
  totalStudents: PropTypes.number,
};


export default BatchesDetailsPage;
