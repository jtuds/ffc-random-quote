import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

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
  global.fetch = jest.fn().mockImplementation(() => {
      const fetchApiResult = new Promise((resolve, reject) => {
        resolve({
          ok: true, 
          Id: '123', 
          json: function() { 
            return {
              'author': 'John',
              'id': 1,
              'permalink': 'https://google.com',
              'quote': 'Hello',
            }
          }
        });
      });

      return fetchApiResult;
  });

  const wrapper = shallow(<App />);
  const getRandomQuote = wrapper.instance().getRandomQuote();
  return getRandomQuote.then(result => expect(result).toEqual({
    'author': expect.any(String),
    'id': expect.any(Number),
    'permalink': expect.any(String),
    'quote': expect.any(String),
  }));
})

// it('handles a promise rejection', () => {
//   global.fetch = jest.fn().mockImplementation(() => {
//     const fetchApiResult = new Promise((resolve, reject) => {
//         if (true === false) {
//           resolve('Congrats');
//         } else {
//           reject('Sorry, this promise was rejected');
//         }
//       });

//     return fetchApiResult;
//   });

//   const wrapper = shallow(<App />);
//   const getRandomQuote = wrapper.instance().getRandomQuote();
//   return getRandomQuote.then(e => expect(e).toMatch('Sorry, this promise was rejected'));
// });

it('shows default quote data if there is an API error', () => {
    global.fetch = jest.fn().mockImplementation(() => {
    const fetchApiResult = new Promise((resolve, reject) => {
        if (true === false) {
          resolve('Congrats');
        } else {
          reject('Sorry, this promise was rejected');
        }
      });

    return fetchApiResult;
  });

  const wrapper = shallow(<App />);
  const getRandomQuote = wrapper.instance().getRandomQuote();
  return getRandomQuote.then(result => expect(result).toEqual({
    'author': expect.any(String),
    'id': expect.any(Number),
    'permalink': expect.any(String),
    'quote': expect.any(String),
  }));
});