import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  meta: PropTypes.shape({}),
};

const defaultProps = {
  meta: { error: '' },
};

const showError = meta => meta.error && meta.touched;

const FormError = ({ meta }) => {
  if (showError(meta)) {
    return (
      <small className="form-text text-danger">
        { meta.error }
      </small>
    );
  }
  return null;
};

FormError.propTypes = propTypes;
FormError.defaultProps = defaultProps;

export default FormError;
