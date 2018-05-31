import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import Home from "./components/Home";
import Blog from "./components/Blog";
import Post from "./components/Post";
import Login from "./components/Login";


class App extends Component {

  static apiBaseURL = 'https://api.headless.localhost';

  state = {
    posts: [],
    isUserLoggedIn: false
  };

  componentDidMount(){
    this.retrievePosts();
  }

  retrievePosts = async () => {
    let posts = [];

    const firstPage = await axios.get('https://api.headless.localhost/wp-json/wp/v2/posts/?per_page=100&page=1');

    const totalPages = parseInt(firstPage.headers['x-wp-totalpages']);

    posts = posts.concat(firstPage.data);

    if ( totalPages > 1 ) {
      for (let i=2; i<=totalPages; i++){
        const page = await axios.get(`https://api.headless.localhost/wp-json/wp/v2/posts/?per_page=100&page=${i}`);
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
          </ul>
          {this.state.isUserLoggedIn}
          <Login isUserLoggedIn={this.state.isUserLoggedIn} setUserLoggedIn={this.setUserLoggedIn}/>
          <hr />

          <Route exact path="/" component={Home}/>
          <Route exact path="/blog" render={() => <Blog posts={this.state.posts}/>} />
          <Route path="/blog/post/:postSlug" render={(routeProps) => <Post posts={this.state.posts} routeProps={routeProps}/>} />
        </div>
      </Router>
    );
  }
}

export default App;