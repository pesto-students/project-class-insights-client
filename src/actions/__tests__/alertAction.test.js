import { alertActions } from '../alert.actions';
import { alertConstants } from '../../constants';

describe('Testing alert action creators', () => {
  test('Testing success alert action creator', () => {
    const message = 'This is a success message';
    const actual = alertActions.success(message);
    const expected = { type: alertConstants.SUCCESS, message };
    expect(actual).toEqual(expected);
  });

  test('Testing error alert action creator', () => {
    const message = 'This is a failure message';
    const actual = alertActions.error(message);
    const expected = { type: alertConstants.ERROR, message };
    expect(actual).toEqual(expected);
  });
});
