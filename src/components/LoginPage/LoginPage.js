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

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loginFailure: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (sessionStorage.getItem(SESSION_STORAGE_KEY)) {
      history.push('/');
    }
  }

  async handleSubmit(formData) {
    const { login } = this.props;
    const loginResponse = await login(formData);
    if (loginResponse !== true) {
      this.setState({ loginFailure: loginResponse });
    }
  }

  render() {
    const { loginFailure } = this.state;
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
                  Login
                </h2>
                <small className="form-text text-danger">
                  {loginFailure}
                </small>
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
                          <Button type="submit" disabled={submitting || pristine || invalid} className="mr-3 mx-auto" color="primary" size="lg">
                            Login
                          </Button>
                        </Row>
                        <Row>
                          <Col className="text-center mt-3">
                            Do not have an account?
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-center mt-3">
                            <NavLink to={routes.ClientSignup}>
                              Click here to Register
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

// submitted is used here to do the checks if the input fields are empty or not.

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool.isRequired,
};

export default LoginPage;
