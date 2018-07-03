import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import App from '../src/App';

describe('<App /> shallow rendering', () => {
  it('h1 contains correct text', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('h1').text()).toBe('hello My world');
  });

  it('matches the snapshot', () => {
    const snaptree = shallow(<App />);
    expect(toJson(snaptree)).toMatchSnapshot();
  });
});
