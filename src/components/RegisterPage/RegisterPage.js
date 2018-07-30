import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
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


import { routes } from '../../constants';
import { history } from '../../helpers';
import { SESSION_STORAGE_KEY } from '../../constants/auth.constant';
import { validations } from '../../helpers/validations';

import FormError from '../FormError';
import Loader from '../Loader';


class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerFailure: '',
      registerSuccess: '',
      isLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem(SESSION_STORAGE_KEY)) {
      history.push(routes.Home);
    }
  }

  async handleSubmit(formData) {
    const { register } = this.props;

    this.setState(() => ({
      isLoading: true,
    }));
    const response = await register(formData);
    if (!response.success) {
      this.setState(() => ({
        isLoading: false,
        registerFailure: response,
        registerSuccess: '',
      }));
    } else {
      this.setState(() => ({
        isLoading: false,
        registerSuccess: 'Registration Successful, Please check your email for confirmation Link',
        registerFailure: '',
      }));
    }
  }

  render() {
    const data = { isInstructor: true };
    const { registerFailure, registerSuccess, isLoading } = this.state;

    if (isLoading) {
      return (
        <Loader />
      );
    }
    return (
      <Container className="h-100">
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
                  Register
                </h2>
                <small className="form-text text-danger">
                  {registerFailure}
                </small>
                <small className="form-text text-success">
                  {registerSuccess}
                </small>
                <Form
                  initialValues={data}
                  onSubmit={this.handleSubmit}
                  render={({
                    handleSubmit,
                    submitting,
                    pristine,
                    invalid,
                  }) => (
                    <form name="form" onSubmit={handleSubmit}>

                      <FormGroup>
                        <Field name="name" validate={validations.composeValidators(validations.required)}>
                          {({ input, meta }) => (
                            <div>
                              <Label for="name">
                                Name
                              </Label>
                              <Input
                                {...input}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter your name"
                                className="form-control mt-2"
                              />
                              <FormError meta={meta} />
                            </div>
                          )}
                        </Field>
                      </FormGroup>

                      <FormGroup>
                        <Field name="email" validate={validations.composeValidators(validations.required, validations.emailFormat)}>
                          {({ input, meta }) => (
                            <div>
                              <Label for="email">
                                Email
                              </Label>
                              <Input
                                {...input}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                className="form-control mt-2"
                              />
                              <FormError meta={meta} />
                            </div>
                          )}
                        </Field>
                      </FormGroup>

                      <FormGroup>
                        <Field name="password" validate={validations.composeValidators(validations.required, validations.minValue(8))}>
                          {({ input, meta }) => (
                            <div>
                              <Label for="password">
                                Password
                              </Label>
                              <Input
                                {...input}
                                type="password"
                                id="password"
                                placeholder="Enter password"
                                className="form-control mt-2 mb-2"
                              />
                              <FormError meta={meta} />
                            </div>
                          )}
                        </Field>
                        <Row className="mx-auto">
                          <Col
                            className="mt-3 mx-auto"
                            sm="12"
                            lg="8"
                            xl="7"
                            md="6"
                          >
                            <Button type="submit" disabled={submitting || pristine || invalid} color="primary" size="lg" block>
                              Signup
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-center mt-3">
                            Already have an account?
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-center mt-3">
                            <NavLink to={routes.ClientLogin}>
                              Click here to Login
                            </NavLink>
                          </Col>
                        </Row>
                      </FormGroup>
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

RegisterPage.propTypes = {
  register: PropTypes.func.isRequired,
  registering: PropTypes.bool.isRequired,
};

export default RegisterPage;
