/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
} from 'reactstrap';

import { BACKEND_URL } from '../../constants/auth.constant';

import { defaultOptions } from '../../helpers/auth-header';
import { validations } from '../../helpers/validations';
import FormError from '../FormError';

class AddBatchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: '',
      failure: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(formData) {
    const reqParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...defaultOptions },
      body: JSON.stringify({
        ...formData,
      }),
    };
    const response = await fetch(`${BACKEND_URL}/users/batches`, reqParams);
    const result = await response.json();
    if (result.success) {
      this.setState({ success: 'batch added successfully' });
    }
  }

  render() {
    const { success, failure } = this.state;
    return (
      <Container>
        <Row className="align-items-center h-100">
          <Col
            sm="6"
            md="8"
            lg="5"
            xl="6"
            className="mx-auto"
          >
            <Card className="mt-5 justify-content-center">
              <CardBody className="mx-0">
                <h2 className="text-center">
                  Batch Creation
                </h2>
                <h4 className="form-text text-success text-center">
                  {success}
                </h4>
                <h4 className="form-text text-danger text-center">
                  {failure}
                </h4>
                <Form
                  onSubmit={this.handleSubmit}
                  render={({
                    handleSubmit,
                    submitting,
                    pristine,
                    invalid,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <FormGroup>
                        <Field name="batchId" validate={validations.required}>
                          {({ input, meta }) => (
                            <div>
                              <Label for="batchId" className="mt-2">
                                Batch ID
                              </Label>
                              <Input
                                {...input}
                                type="text"
                                id="batchId"
                                name="batchId"
                                placeholder="Enter Batch ID"
                                className="form-control"
                              />
                              <FormError meta={meta} />
                            </div>
                          )}
                        </Field>
                      </FormGroup>
                      <FormGroup>
                        <Field name="from" validate={validations.required}>
                          {({ input, meta }) => (
                            <div>
                              <Label for="startDate" className="mt-2">
                                Start Date
                              </Label>
                              <Input
                                {...input}
                                type="date"
                                id="startDate"
                                name="startDate"
                                placeholder="Enter start date"
                                className="form-control"
                              />
                              <FormError meta={meta} />
                            </div>
                          )}
                        </Field>
                      </FormGroup>
                      <FormGroup>
                        <Field name="to" validate={validations.required}>
                          {({ input, meta }) => (
                            <div>
                              <Label for="endDate">
                                End Date:
                              </Label>
                              <Input
                                {...input}
                                type="date"
                                name="endDate"
                                id="endDate"
                                className="form-control"
                              />
                              <FormError meta={meta} />
                            </div>
                          )}
                        </Field>
                      </FormGroup>
                      <FormGroup>
                        <Field name="status" validate={validations.required}>
                          {({ input, meta }) => (
                            <div>
                              <Label for="status">
                                Status:
                              </Label>
                              <select className="form-control" {...input}>
                                <option />
                                <option value="1">
                                  Active
                                </option>
                                <option value="0">
                                  Inactive
                                </option>
                              </select>
                              <FormError meta={meta} />
                            </div>
                          )}
                        </Field>
                      </FormGroup>
                      <Row className="mx-auto">
                        <Button
                          type="submit"
                          disabled={submitting || pristine || invalid}
                          className="mr-3 mx-auto"
                          color="primary"
                          size="lg"
                        >
                          Submit
                        </Button>
                      </Row>
                    </form>
                  )}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AddBatchPage;
