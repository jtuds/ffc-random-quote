import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { doesNotReject } from 'assert';

/**
 * Using Jest for the test suite https://jestjs.io/docs/en/setup-teardown
 * And Enzyme for DOM stuff and rendering React elements "https://github.com/airbnb/enzyme"
 */

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

it('has a text element with an ID of "text', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('#text').length).toEqual(1);
})

it('has an element with an ID of "author"', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('#author').length).toEqual(1);
})

it('has an element with an ID of "new-quote"', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('#new-quote').length).toEqual(1);
})

it('has a button element with an ID "new-quote"', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('#new-quote').type()).toEqual('button');
})

it('has an element with an ID of "tweet-quote"', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('#tweet-quote').length).toEqual(1);
})

it('has a button element with an ID "tweet-quote"', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('#tweet-quote').type()).toEqual('button');
})

it('calls getRandomQuote on load', () => {
  const spy = jest.spyOn(App.prototype, 'updateQuote');
  shallow(<App />);
  expect(spy).toHaveBeenCalled();
})

it('returns a quote object', () => {
  const wrapper = shallow(<App />);
  const getRandomQuote = wrapper.instance().getRandomQuote();
  return getRandomQuote.then(result => expect(result).toEqual({
    'author': expect.any(String),
    'id': expect.any(Number),
    'permalink': expect.any(String),
    'quote': expect.any(String),
  }));
})

// it('calls the quote API and updates the quote', () => {
//   const wrapper = shallow(<App />);
//   // expect(wrapper.instance().updateQuote()).objectContaining({
//   //   'quote': expect.any(String),
//   //   'author': expect.any(String),
//   // })
//   // https://github.com/mpj/unit-testing-series/tree/c876ef875cf05deecd65b59600118d474f45c521
//   // here is where I test getRandomQuote similar to have MPJ tested orderTotal
//   // I want to call it here and then assert what it returns
//   // If i call it with mocked out params, perhaps the URL and fetch, does it return what I expect
//   // the expected return is that it calls updateQuote with the correct shape of data
//   // after that I can test updateQuote itself

//   // getRandomQuote(url, fetch).expect(returnedvalue).toBe(a call to updateQuote)

//   //maybe getRandomQuote should return an object and updateQuote should call getRandomQuote otherwise getRandomQuote has some side effects
// })