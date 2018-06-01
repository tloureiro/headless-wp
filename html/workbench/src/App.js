import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
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
      axios.post(`${App.apiBaseURL}/wp-json/jwt-auth/v1/token/validate`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.data && response.data.code && response.data.code === 'jwt_auth_valid_token') {
          this.setState({ verifyLoginMessage: 'Logged in' });
        } else {
          this.setState({ verifyLoginMessage: 'Not logged in' });
        }
      }).catch((error) => {
        console.log(error);
        this.setState({ verifyLoginMessage: 'Not able to check' });
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

    axios.post(`${App.apiBaseURL}/wp-json/jwt-auth/v1/token`, data).then((response) => {
      if (response.data && response.data.token) {
        Cookies.set('token', response.data.token);
        this.setState({
          verifyLoginMessage: 'Logged in',
          loginMessage: 'Success',
        });
      }
    }).catch(() => {
      this.setState({
        loginMessage: 'Failed',
      });
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

    axios.get(`${App.apiBaseURL}/wp-json/wp/v2/settings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.data) {
        this.setState({ checkSettingsMessage: JSON.stringify(response.data) });
      }
    }).catch((error) => {
      if (error.response) {
        this.setState({ checkSettingsMessage: `Error: ${error.response.data.code} - ${error.response.data.message}` });
      } else {
        this.setState({ checkSettingsMessage: "Error: Couldn't contact API" });
      }
    });
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
            <span>{this.state.checkSettingsMessage}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
