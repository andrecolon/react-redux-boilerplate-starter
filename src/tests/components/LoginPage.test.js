import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('should render LoginPage correctly', () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
  // we need to create a new spy for startLogin
  // this is the thing we want to confirm when the button gets clicked
  // remember - to create a spy we use jest.fn()
  const startLogin = jest.fn();
  // pass our spy into Header
  // we shallow render our component
  const wrapper = shallow(<LoginPage startLogin={startLogin} />);
  // simulate that we click that button
  wrapper.find('button').simulate('click');
  // make our assertion
  // we just want to make sure startLogout was called
  expect(startLogin).toHaveBeenCalled();
});
