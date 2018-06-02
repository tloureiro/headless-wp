import React, { Component } from 'react';

import Cookies from 'js-cookie';
import axios from 'axios';

import App from "../App";

class Admin extends Component {

  state = {
    settings: null,
    updateFeedback: ''
  };

  retrieveSettings = () => {
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

  handleChange = (event) => {
    const settings = { ...this.state.settings };
    settings.title = event.target.value;
    this.setState({ settings });
  };

  updateTitle = () => {
    const token = Cookies.get('token');

    const data = { title: this.state.settings.title };

    axios.post(`${App.apiBaseURL}/wp-json/wp/v2/settings`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      this.setState({
        updateFeedback: 'Title updated!'
      });
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
        this.retrieveSettings();
      } else {

        return (
          <div>
            <label>Title</label>:
            <input type="text" value={this.state.settings.title} onChange={this.handleChange}/>
            <button onClick={this.updateTitle}>Update</button>
            <div>{this.state.updateFeedback}</div>
          </div>
        );
      }
    }

    return (
      <div>Loading...</div>
    )
  }
}

export default Admin;