import React, { Component } from 'react';
import ReactTable from 'react-table';
import {
  Container,
  Row,
  Col,
  NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

import Loader from '../Loader';
import { studentService } from '../../services/student.services';

class StudentHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    };
  }

  async componentWillMount() {
    this.setState(() => ({
      isLoading: true,
    }));
    const mapped = await studentService.getForms();
    this.setState(() => ({
      isLoading: false,
    }));
    this.setState({ data: mapped });
  }

  render() {
    const { data, isLoading } = this.state;
    const columns = [
      {
        Header: 'Batch ID',
        accessor: 'batchId',
      },
      {
        Header: 'Subject',
        accessor: 'subject',
      },
      {
        Header: 'Topic',
        accessor: 'topic',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Give Feedback',
        accessor: 'giveFeedback',
        Cell: row => (
          <Row className="align-items-center">
            <NavLink className="mx-auto btn btn-sm btn-secondary" tag={RRNavLink} to={row.value}>
              Give Feedback
            </NavLink>
          </Row>
        ),
      },
    ];

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
              Feedback List
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
      </Container>
    );
  }
}

export default StudentHomePage;
