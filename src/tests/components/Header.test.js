import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header startLogout={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
  // we need to create a new spy for startLogout
  // this is the thing we want to confirm when the button gets clicked
  // remember - to create a spy we use jest.fn()
  const startLogout = jest.fn();
  // pass our spy into Header
  // we shallow render our component
  const wrapper = shallow(<Header startLogout={startLogout} />);
  // simulate that we click that button
  wrapper.find('button').simulate('click');
  // make our assertion
  // we just want to make sure startLogout was called
  expect(startLogout).toHaveBeenCalled();
});
