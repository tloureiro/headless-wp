import React, { Component } from 'react';

import App from "../App";

import Cookies from 'js-cookie';
import axios from 'axios';

class Login extends Component {

  state = {
    username: '',
    password: '',
    loginMessage: ''
  };

  login = () => {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    axios.post(`${App.apiBaseURL}/wp-json/jwt-auth/v1/token`, data).then((response) => {

      if (response.data && response.data.token) {
        Cookies.set('token', response.data.token);
        this.props.setUserLoggedIn(true);
      }
    }).catch((error) => {
      this.setState({ loginMessage: 'Login Failed' });
    });
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {

    const form = (
      <div>
        <label htmlFor="username">User:</label><input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
        <label htmlFor="password">Password:</label><input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
        <button onClick={this.login}>Login</button>
        <span>{this.state.loginMessage}</span>
      </div>
    );

    const loggedIn = (
      <div>
        User Logged In
      </div>
    );

    if ( this.props.isUserLoggedIn ) {
      return loggedIn;
    } else {
      return form;
    }

    return form;
  }
}

export default Login;