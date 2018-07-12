const required = value => (value ? undefined : 'Required');
const minValue = min => value => (value.toString().length >= min ? undefined : `Should be greater than ${min}`);
const composeValidators = (...validators) => value => validators
  .reduce((error, validator) => error || validator(value), undefined);

export const validations = {
  required,
  minValue,
  composeValidators,
};
