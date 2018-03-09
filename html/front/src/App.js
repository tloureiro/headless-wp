import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentWillMount() {
    const data = {
      username: 'admin',
      password: 'admin',
    };

    const resp = fetch('https://api.headless.localhost/wp-json/jwt-auth/v1/token', {
      body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST', // *GET, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *same-origin
      redirect: 'follow', // *manual, error
      referrer: 'no-referrer', // *client
    }).then(response => response.json())
      .then((json) => {
        fetch('https://api.headless.localhost/wp-json/wp/v2/settings', {
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            Authorization: `Bearer ${json.token}`,
            'content-type': 'application/json',
          },
          method: 'GET', // *GET, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *same-origin
          redirect: 'follow', // *manual, error
          referrer: 'no-referrer', // *client
        }).then(response => response.json());
      });

    console.log(resp);
  }

  render() {
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
