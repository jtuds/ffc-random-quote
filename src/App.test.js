import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing again', () => {
  shallow(<App />);
});

it('has a wrapper ID of "quote-box"', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('#quote-box').length).toEqual(1);
});