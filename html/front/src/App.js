import React, { Component } from 'react';
import Cookies from 'js-cookie';
import './App.css';

class App extends Component {
  static apiBaseURL = 'https://api.headless.localhost';

  state = {
    verifyLoginMessage: '',
    loginMessage: '',
    logoutMessage: '',
    checkSettingsMessage: '',
  };

  verifyLogin = () => {
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
            this.setState({ verifyLoginMessage: 'Logged in' });
          } else {
            this.setState({ verifyLoginMessage: 'Not logged in' });
          }
        });
    } else {
      this.setState({ verifyLoginMessage: 'Not logged in' });
    }
  };

  login = () => {
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
        if (json.token) {
          console.log(json);
          Cookies.set('token', json.token);
          this.setState({
            verifyLoginMessage: 'Logged in',
            loginMessage: 'Success',
          });
        } else {
          this.setState({
            loginMessage: 'Failed',
          });
        }
      });
  };

  logout = () => {
    const token = Cookies.get('token');
    Cookies.remove('token');

    if (token) {
      this.setState({
        logoutMessage: 'Logged out',

      });
    } else {
      this.setState({ logoutMessage: 'You are already logged out' });
    }
  };

  checkSettings = () => {
    const token = Cookies.get('token');

    fetch('https://api.headless.localhost/wp-json/wp/v2/settings', {
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      method: 'GET', // *GET, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *same-origin
      redirect: 'follow', // *manual, error
      referrer: 'no-referrer', // *client
    }).then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    }).then((json) => {
      console.log(json);
    }).catch(error => error.json())
      .then((jsonError) => { console.log(jsonError); });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Headless WP Client</h1>
        </header>
        <div className="App-intro">
          <div>
            <button onClick={this.verifyLogin}>Verify Login</button>
            <span>&nbsp;{this.state.verifyLoginMessage}</span>
          </div>

          <div>
            <button onClick={this.login}>Login</button>
            <span>&nbsp;{this.state.loginMessage}</span>
          </div>

          <div>
            <button onClick={this.logout}>Logout</button>
            <span>&nbsp;{this.state.logoutMessage}</span>
          </div>

          <div>
            <button onClick={this.checkSettings}>Check Settings</button>
            <span>&nbsp;{this.state.checkSettingsMessage}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
