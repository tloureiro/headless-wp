import React, { Component } from 'react';
import Cookies from 'js-cookie';
import './App.css';

class App extends Component {
  static apiBaseURL = 'https://api.headless.localhost';

  state = {
    isAuthorized: '',
  };
  componentWillMount() {
    const data = {
      username: 'admin',
      password: 'admin',
    };

    fetch(`${App.apiBaseURL}/wp-json/jwt-auth/v1/token`, {
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
        Cookies.set('token', json.token);
        // fetch('https://api.headless.localhost/wp-json/wp/v2/settings', {
        //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //   headers: {
        //     Authorization: `Bearer ${json.token}`,
        //     'content-type': 'application/json',
        //   },
        //   method: 'GET', // *GET, PUT, DELETE, etc.
        //   mode: 'cors', // no-cors, *same-origin
        //   redirect: 'follow', // *manual, error
        //   referrer: 'no-referrer', // *client
        // }).then(response => response.json());
      });
  }

  verifyAuth = () => {
    const token = Cookies.get('token');

    if (token) {
      fetch(`${App.apiBaseURL}/wp-json/jwt-auth/v1/token/validate`, {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'POST', // *GET, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *same-origin
        redirect: 'follow', // *manual, error
        referrer: 'no-referrer', // *client
      })
        .then(response => response.json())
        .then((json) => {
          if (json.code === 'jwt_auth_valid_token') {
            this.setState({ isAuthorized: 'yes' });
          } else {
            this.setState({ isAuthorized: 'no' });
          }
        });
    }


  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Headless WP Client</h1>
        </header>
        <div className="App-intro">
          <div>
            <button onClick={this.verifyAuth}>Verify Auth</button>
            <span>&nbsp;{this.state.isAuthorized}</span>
          </div>

          <div>
            <button onClick={this.verifyAuth}>Verify Auth</button>
            <span>&nbsp;{this.state.isAuthorized}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
