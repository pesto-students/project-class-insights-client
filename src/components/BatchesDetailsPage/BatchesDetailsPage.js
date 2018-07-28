import React, { Component } from 'react';
import queryString from 'query-string';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
} from 'reactstrap';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';

import { BACKEND_URL } from '../../constants/auth.constant';
import { defaultOptions } from '../../helpers/auth-header';

class BatchesDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batchDetails: {
        batchId: '',
        batchStartDate: '',
        batchStatus: '',
        totalStudents: null,
      },
      students: [],
    };
  }

  async componentWillMount() {
    const { location } = this.props;
    const { search } = location;
    const { batchId, batchName } = queryString.parse(search);
    const reqParams = { headers: { 'Content-Type': 'application/json', ...defaultOptions } };
    const batchResponse = await fetch(`${BACKEND_URL}/users/batches?batchId=${batchName}`, reqParams);
    const batchData = await batchResponse.text();
    const rawData = JSON.parse(batchData).Batches[0];
    this.setState({
      batchDetails: {
        batchId: rawData.batchId,
        batchStartDate: (new Date(rawData.from)).toISOString().split('T')[0],
        batchStatus: rawData.status ? 'Active' : 'Inactive',
        totalStudents: rawData.studentCount,
      },
    });

    const studentResponse = await fetch(`${BACKEND_URL}/students/${batchId}`);
    const rawStudentData = await studentResponse.json();
    const remappedStudents = rawStudentData.map((val, index) => {
      const remap = {
        _id: index,
        name: val.name ? val.name : 'Student yet to register',
        email: val.email,
      };
      return remap;
    });
    this.setState({ students: remappedStudents });
  }

  render() {
    const { students } = this.state;
    const { batchDetails } = this.state;
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
        <br />
        <Button
          type="button"
          className="btn btn-primary btn-block"
          href={`/addStudent?batchID=${batchId}`}
        >
          Add Student
        </Button>
        <br />
        <br />
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
