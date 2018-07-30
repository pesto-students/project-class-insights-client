/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import queryString from 'query-string';
import PropTypes from 'prop-types';
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
import Loader from '../Loader';

class AddStudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: '',
      failure: '',
      isLoading: false,
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
    this.setState(() => ({
      isLoading: true,
    }));
    const response = await fetch(`${BACKEND_URL}/users/students`, reqParams);
    const result = await response.json();
    this.setState(() => ({
      isLoading: false,
    }));
    if (result.success) {
      this.setState({ success: 'batch added successfully' });
    } else {
      this.setState({ failure: 'Failed to add student' });
    }
  }

  render() {
    const { success, failure, isLoading } = this.state;
    const { location } = this.props;
    const { search } = location;
    const { batchID } = queryString.parse(search);
    const data = { batchId: batchID };

    if (isLoading) {
      return (
        <Loader />
      );
    }
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
                  initialValues={data}
                  render={({
                    handleSubmit,
                    submitting,
                    pristine,
                    invalid,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <FormGroup>
                        <Field name="email" validate={validations.composeValidators(validations.required, validations.emailFormat)}>
                          {({ input, meta }) => (
                            <div>
                              <Label for="email" className="mt-2">
                                Student Email
                              </Label>
                              <Input
                                {...input}
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Enter Student Email"
                                className="form-control"
                              />
                              <FormError meta={meta} />
                            </div>
                          )}
                        </Field>
                      </FormGroup>
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
                                placeholder="Enter Student Email"
                                className="form-control"
                                disabled
                              />
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

AddStudentPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default AddStudentPage;
