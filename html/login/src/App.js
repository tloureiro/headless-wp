import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Cookies from 'js-cookie';
import axios from 'axios';

import Home from "./components/Home";
import Blog from "./components/Blog";
import Post from "./components/Post";
import Login from "./components/Login";
import Admin from "./components/Admin";


class App extends Component {

  static apiBaseURL = 'https://api.headless.localhost';

  state = {
    posts: [],
    isUserLoggedIn: false
  };

  componentDidMount(){
    this.retrievePosts();
    this.verifyLogin();
  }

  verifyLogin = () => {
    const token = Cookies.get('token');

    if (token) {
      axios.post(`${App.apiBaseURL}/wp-json/jwt-auth/v1/token/validate`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log(response);
        if (response.data && response.data.code && response.data.code === 'jwt_auth_valid_token') {
          this.setState({ isUserLoggedIn: true });
        }
      }).catch((error) => {
        console.error(error);
      });
    } else {
      console.error('Not logged in');
    }
  };

  retrievePosts = async () => {
    let posts = [];

    const firstPage = await axios.get(`${App.apiBaseURL}/wp-json/wp/v2/posts/?per_page=100&page=1`);

    const totalPages = parseInt(firstPage.headers['x-wp-totalpages']);

    posts = posts.concat(firstPage.data);

    if ( totalPages > 1 ) {
      for (let i=2; i<=totalPages; i++){
        const page = await axios.get(`https://${App.apiBaseURL}/wp-json/wp/v2/posts/?per_page=100&page=${i}`);
        posts = posts.concat(page.data);
      }
    }

    this.setState({ posts });
  };

  setUserLoggedIn = ( isLoggedIn ) => {
    this.setState({ isUserLoggedIn: isLoggedIn });
  };

  render() {
    return(
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
          {this.state.isUserLoggedIn}
          <Login isUserLoggedIn={this.state.isUserLoggedIn} setUserLoggedIn={this.setUserLoggedIn}/>
          <hr />

          <Route exact path="/" component={Home}/>
          <Route exact path="/blog" render={() => <Blog posts={this.state.posts}/>} />
          <Route path="/blog/post/:postSlug" render={(routeProps) => <Post posts={this.state.posts} routeProps={routeProps}/>} />
          <Route path="/admin" render={() => <Admin isUserLoggedIn={this.state.isUserLoggedIn}/>} />
        </div>
      </Router>
    );
  }
}

export default App;