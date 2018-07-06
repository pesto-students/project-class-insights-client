import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { routes } from '../../constants';
import { history } from '../../helpers';
import { SESSION_STORAGE_KEY } from '../../constants/auth.constant';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem(SESSION_STORAGE_KEY)) {
      history.push('/');
    }
  }

  handleSubmit(formData) {
    const { register } = this.props;
    register(formData);
  }

  render() {
    const { registering } = this.props;
    return (
      <div>
        <h2>
            Register
        </h2>
        <Form
          onSubmit={this.handleSubmit}
          render={({
            handleSubmit, submitting, pristine,
          }) => (

            <form name="form" onSubmit={handleSubmit}>
              <div>
                name
                <Field name="name">
                  {({ input, meta }) => (
                    <div>
                      <input {...input} type="text" placeholder="Enter your name" />
                      {meta.error && meta.touched && (
                      <span>
                        {meta.error}
                      </span>
                      )}
                    </div>
                  )}
                </Field>
              </div>
            Email
              <div>
                email
                <Field name="email">
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

            Password
              <div>
                email
                <Field name="password">
                  {({ input, meta }) => (
                    <div>
                      <input {...input} type="password" placeholder="Enter your Password" />
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
            Register
              </button>
              {registering && (
              <h2>
            Loading
              </h2>
              ) }
              <NavLink to={routes.ClientLogin}>
           Cancel
              </NavLink>
            </form>
          )}
        />
      </div>
    );
  }
}


RegisterPage.propTypes = {
  register: PropTypes.func.isRequired,
  registering: PropTypes.bool.isRequired,
};

export default RegisterPage;
