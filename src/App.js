import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quoteText: 'placeholder quote',
      quoteAuthor: 'placeholder author',
    }

    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.updateQuote = this.updateQuote.bind(this);
  }

  componentDidMount() {
    this.updateQuote()
  }

  updateQuote() {
    this.getRandomQuote()
    .then(quoteObject => {
      this.setState(() => ({
        quoteText: quoteObject.quote,
        quoteAuthor: quoteObject.author
      }))
    })
  }

  getRandomQuote() {
    return fetch('http://quotes.stormconsultancy.co.uk/random.json') // returns a promise
    .then(response => response.json())
    .then(responseJson => responseJson)
  }

  render() {
    return (
      <div id="quote-box" className="App">
        <header className="App-header">
          <h1 id="text">{this.state.quoteText}</h1>
          <p id="author">{this.state.quoteAuthor}</p>
          <button id="new-quote" onClick={this.updateQuote}>new quote</button>
          <button id="tweet-quote">tweet quote</button>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
