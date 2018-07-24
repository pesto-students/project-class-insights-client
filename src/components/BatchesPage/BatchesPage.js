import React, { Component } from 'react';
import ReactTable from 'react-table';
import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';

class BatchesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.manageBatch = this.manageBatch.bind(this);
  }

  manageBatch(batchID) {
    this.setState(() => ({
      selectedBatchId: batchID,
    }));
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
          <ActionHeader />
        ),
        accessor: 'batchID',
        Cell: row => (
          <Row className="align-items-center">
            <Button
              type="button"
              onClick={e => this.manageBatch(row.value, e)}
              size="sm"
              className="mx-auto"
            >
              Manage
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
              Batches
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

const ActionHeader = () => (
  <span>
    Action
  </span>
);

export default BatchesPage;
