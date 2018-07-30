/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import ReactTable from 'react-table';
import {
  Container,
  Row,
  Col,
  NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

import { BACKEND_URL } from '../../constants/auth.constant';
import { defaultOptions } from '../../helpers/auth-header';
import Loader from '../Loader';

class StudentHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    };
  }

  async componentWillMount() {
    const reqParams = { headers: { 'Content-Type': 'application/json', ...defaultOptions } };
    this.setState(() => ({
      isLoading: true,
    }));
    const response = await fetch(`${BACKEND_URL}/users/getForm`, reqParams);
    const formData = await response.json();
    this.setState(() => ({
      isLoading: false,
    }));
    const mapped = formData.map((val) => {
      const remappedValues = {
        batchId: val.batchId.batchId,
        subject: val.subject,
        topic: val.topic,
        date: (new Date(val.creationDate)).toISOString().split('T')[0],
        giveFeedback: `/submitFeedback?formID=${val._id}`,
      };
      return remappedValues;
    });
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
