
import React, { Component } from 'react'
import { Switch, Route } from 'react-static'

import Post from './Post'

class Blog extends Component {

  static apiBaseURL = 'https://api.headless.localhost';

  render() {
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