import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentWillMount() {
    fetch('https://api.headless.dev/wp-json/wp/v2/posts')
      .then(response => {
        if (response.ok) {
          return Promise.resolve(response);
        }
        else {
          return Promise.reject(new Error('Failed to load'));
        }
      })
      .then(response => response.json()) // parse response as JSON
      .then(data => {
        console.log(data);
      })
      .catch(function(error) {
        console.log(`Error: ${error.message}`);
      });
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;



