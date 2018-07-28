/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import ReactTable from 'react-table';
import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';
// import PropTypes from 'prop-types';
import { FRONTEND_URL, BACKEND_URL } from '../../constants/auth.constant';
import { defaultOptions } from '../../helpers/auth-header';

class StudentHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async componentWillMount() {
    const reqParams = { headers: { 'Content-Type': 'application/json', ...defaultOptions } };
    const response = await fetch(`${BACKEND_URL}/users/getForm`, reqParams);
    const formData = await response.json();
    const mapped = formData.map((val) => {
      const remappedValues = {
        batchId: val.batchId.batchId,
        subject: val.subject,
        topic: val.topic,
        date: (new Date(val.creationDate)).toISOString().split('T')[0],
        giveFeedback: `${FRONTEND_URL}/submitFeedback?formID=${val._id}`,
      };
      return remappedValues;
    });
    this.setState({ data: mapped });
  }

  render() {
    const { data } = this.state;
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
            <Button
              type="button"
              href={row.value}
              size="sm"
              className="mx-auto"
            >
                Give Feedback
            </Button>
          </Row>
        ),
      },
    ];
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
