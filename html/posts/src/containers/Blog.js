import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-static'
import axios from 'axios'

import Post from './Post'

class Blog extends Component {

  state = {
    posts: []
  };

  componentDidMount() {
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

    this.setState( { posts } );
  };

  render() {

    const posts = this.state.posts;

    return (
      <div>
        <Switch>
          <Route
            path="/blog"
            exact
            render={() => (
              <div>
                <h1>It's blog time.</h1>
                <br />
                All Posts:
                <ul>
                  {posts.map(post => (
                    <li key={post.id}>
                      <Link to={`/blog/post/${post.id}/`}>{post.title.rendered}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          />
          <Route path={`/blog/post/:postID/`} component={Post} />
        </Switch>
      </div>
    )
  }

}

export default Blog;