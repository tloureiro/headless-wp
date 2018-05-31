import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Blog extends Component {

  render() {

    const posts =  this.props.posts;
    console.log(posts);

    return(
      <div>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link to={`/blog/post/${post.slug}/`}>{post.title.rendered}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Blog;