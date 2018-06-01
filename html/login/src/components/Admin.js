import React, { Component } from 'react';

import Cookies from 'js-cookie';
import axios from 'axios';

import App from "../App";

class Admin extends Component {

  state = {
    settings: null
  };

  componentDidMount() {

  }

  checkSettings = () => {
    const token = Cookies.get('token');

    axios.get(`${App.apiBaseURL}/wp-json/wp/v2/settings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {

      if (response.data) {
        this.setState({ settings: response.data });
      }
    }).catch((error) => {
      if (error.response) {
        console.error(`Error: ${error.response.data.code} - ${error.response.data.message}`);
      } else {
        console.error("Error: Couldn't contact API");
      }
    });
  };

  render() {

    if ( ! this.props.isUserLoggedIn ) {
      return (
        <div>You are not logged in</div>
      )
    } else {

      if ( ! this.state.settings ) {
        this.checkSettings();
      }

      console.log(this.state.settings);
      return (
        <div>You are logged in. Retrieving your configurations</div>
      );
    }
  }
}

export default Admin;