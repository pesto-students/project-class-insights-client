const required = value => (value ? undefined : 'Required');

const minValue = min => value => (value.toString().length >= min ? undefined : `Should be greater than ${min}`);

const emailFormat = value => (!value.match(/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/) ? 'Enter Valid email' : undefined);

const composeValidators = (...validators) => value => validators
  .reduce((error, validator) => error || validator(value), undefined);

export const validations = {
  required,
  minValue,
  emailFormat,
  composeValidators,
};
