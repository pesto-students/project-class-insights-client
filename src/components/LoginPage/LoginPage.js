import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { routes } from '../../constants';
import { history } from '../../helpers';
import { SESSION_STORAGE_KEY } from '../../constants/auth.constant';
import { validations } from '../../helpers/validations';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (sessionStorage.getItem(SESSION_STORAGE_KEY)) {
      history.push('/');
    }
  }


  async handleSubmit(formData) {
    const { login } = this.props;
    login(formData);
  }


  render() {
    const { loggingIn } = this.props;
    return (
      <div>
        <h2>
          Login
        </h2>
        <Form
          onSubmit={this.handleSubmit}
          render={({
            handleSubmit, submitting, pristine,
          }) => (
            <form onSubmit={handleSubmit}>
              <div>
                email
                <Field name="email" validate={validations.composeValidators(validations.required, validations.emailFormat)}>
                  {({ input, meta }) => (
                    <div>
                      <input {...input} type="email" placeholder="Enter your email" />
                      {meta.error && meta.touched && (
                      <span>
                        {meta.error}
                      </span>
                      )}
                    </div>
                  )}
                </Field>
              </div>
              <div>
                      Password
                <Field name="password" validate={validations.composeValidators(validations.required, validations.minValue(8))}>
                  {({ input, meta }) => (
                    <div>
                      <input {...input} type="password" placeholder="Enter password" />
                      {meta.error && meta.touched && (
                      <span>
                        {meta.error}
                      </span>
                      )}
                    </div>
                  )}
                </Field>
              </div>
              <button type="submit" disabled={submitting || pristine}>
          Login
              </button>
              { loggingIn && (
              <h2>
            Logging In
              </h2>
              )}
              <NavLink to={routes.ClientSignup}>
          Register
              </NavLink>
            </form>
          )}
        />
      </div>
    );
  }
}

// submitted is used here to do the checks if the input fields are empty or not.


LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool.isRequired,
};

export default LoginPage;
